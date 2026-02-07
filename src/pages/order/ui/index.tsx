"use client";

import { Loader2 } from "lucide-react";

import { ReactNode, useEffect, useMemo, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useCartStore } from "@/src/entities/cart/model/cart.store";
import { CartItem } from "@/src/entities/cart/model/cart.types";
import { orderApi } from "@/src/entities/order/api/orderApi";
import { authApi } from "@/src/entities/user/api";
import { cookies } from "@/src/shared/lib/utils/cookies";
import { formatPrice, formatProduct } from "@/src/shared/lib/utils/helpers";
import { Button } from "@/src/shared/ui";
import { Checkbox } from "@/src/shared/ui/Checkbox";

import { AddressBlock } from "../components/AddressBlock";
import { isTimeSlotAvailable } from "../components/AddressBlock/components/AddressGrid/model";
import { CartBlock } from "../components/CartBlock";
import { PostCardBlock } from "../components/PostCardBlock/ui";
import { RecipientBlock } from "../components/RecipientBlock";
import { SenderBlock } from "../components/SenderBlock/ui";
import { TIME_SLOT_TO_API, useOrderStore } from "../model/order.store";

interface OrderErrors {
  cart?: string;
  address?: string;
  date?: string;
  time?: string;
  senderName?: string;
  senderPhone?: string;
  recipientName?: string;
  recipientPhone?: string;
  checkbox?: string;
}

interface OrderBlock {
  key: string;
  name: string;
  visible: boolean;
  render: () => ReactNode;
}

interface UserData {
  name: string;
  phone: string;
}

const useOrderBlocks = (
  items: CartItem[],
  isAuth: boolean,
  errors: OrderErrors,
  // eslint-disable-next-line no-unused-vars
  clearError: (key: keyof OrderErrors) => void,
  userData?: UserData
): OrderBlock[] => {
  return useMemo(
    () => [
      {
        key: "cart",
        name: "Заказ",
        visible: true,
        render: () => <CartBlock items={items} error={errors.cart} />,
      },
      {
        key: "address",
        name: "Доставка",
        visible: true,
        render: () => (
          <AddressBlock
            errors={{
              address: errors.address,
              date: errors.date,
              time: errors.time,
            }}
            onFieldChange={field => clearError(field)}
          />
        ),
      },
      {
        key: "sender",
        name: "Отправитель",
        visible: !isAuth,
        render: () => (
          <SenderBlock
            errors={{
              name: errors.senderName,
              phone: errors.senderPhone,
            }}
            onFieldChange={field =>
              clearError(field === "name" ? "senderName" : "senderPhone")
            }
          />
        ),
      },
      {
        key: "recipient",
        name: "Получатель",
        visible: true,
        render: () => (
          <RecipientBlock
            isAuth={isAuth}
            userData={userData}
            errors={{
              name: errors.recipientName,
              phone: errors.recipientPhone,
            }}
            onFieldChange={field =>
              clearError(field === "name" ? "recipientName" : "recipientPhone")
            }
          />
        ),
      },
      {
        key: "postcard",
        name: "Открытка",
        visible: true,
        render: () => <PostCardBlock />,
      },
    ],
    [items, isAuth, errors, clearError, userData]
  );
};

export default function OrderPage() {
  const { items, isHydrated } = useCartStore();
  const {
    sender,
    recipient,
    delivery,
    deliveryZone,
    postcard,
    getDeliveryPrice,
  } = useOrderStore();
  const router = useRouter();

  const userId = cookies.get("user_id");
  const isAuth = !!userId;
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState<OrderErrors>({});
  const [userData, setUserData] = useState<UserData>();
  const [isLoading, setIsLoading] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  // Проверка доступа к странице заказа
  useEffect(() => {
    const canAccess = sessionStorage.getItem("canAccessOrder");
    if (!canAccess) {
      router.replace("/cart");
    } else {
      setHasAccess(true);
    }
  }, [router]);

  useEffect(() => {
    if (isAuth && userId) {
      authApi.getProfile(userId).then(profile => {
        setUserData({ name: profile.name, phone: profile.phone });
      });
    }
  }, [isAuth, userId]);

  const clearError = (key: keyof OrderErrors) => {
    setErrors(prev => {
      if (!prev[key]) return prev;
      const { ...rest } = prev;
      return rest;
    });
  };

  const blocks = useOrderBlocks(items, isAuth, errors, clearError, userData);

  const productsPrice = items.reduce(
    (acc, product) => Number(product.price) + acc,
    0
  );
  const deliveryPrice = getDeliveryPrice();

  const validateOrder = (): OrderErrors => {
    const validationErrors: OrderErrors = {};

    // Валидация корзины
    if (items.length === 0) {
      validationErrors.cart = "Корзина пуста";
    }

    // Валидация доставки (обязательно: адрес, дата, время)
    if (!delivery.fullAddress.trim()) {
      validationErrors.address = "Укажите адрес доставки";
    }
    if (!delivery.date) {
      validationErrors.date = "Выберите дату доставки";
    }
    if (!delivery.time) {
      validationErrors.time = "Выберите время доставки";
    } else if (
      delivery.date &&
      !isTimeSlotAvailable(delivery.date, delivery.time)
    ) {
      // Проверка: для сегодняшнего дня слот должен начинаться минимум через 2 часа
      validationErrors.time =
        "Выбранное время недоступно. Минимум 2 часа до доставки";
    }

    // Валидация получателя (обязательно: имя, телефон)
    if (!recipient.name.trim()) {
      validationErrors.recipientName = "Укажите имя получателя";
    }
    const recipientPhone = recipient.phone.replace(/\D/g, "");
    if (recipientPhone.length < 11) {
      validationErrors.recipientPhone = "Укажите корректный телефон получателя";
    }

    // Валидация отправителя (обязательно если не авторизован)
    if (!isAuth) {
      if (!sender.name.trim()) {
        validationErrors.senderName = "Укажите имя отправителя";
      }
      const senderPhone = sender.phone.replace(/\D/g, "");
      if (senderPhone.length < 11) {
        validationErrors.senderPhone = "Укажите корректный телефон отправителя";
      }
    }

    // Валидация согласия
    if (!checked) {
      validationErrors.checkbox = "Подтвердите согласие на обработку данных";
    }

    return validationErrors;
  };

  const handleSubmitOrder = async () => {
    const validationErrors = validateOrder();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    const orderData = {
      sender: {
        name: isAuth && userData ? userData.name : sender.name,
        phoneNumber:
          isAuth && userData
            ? userData.phone.replace(/\D/g, "")
            : sender.phone.replace(/\D/g, ""),
      },
      recipient: {
        name: recipient.name,
        phoneNumber: recipient.phone.replace(/\D/g, ""),
      },
      delivery: {
        fullAddress: delivery.fullAddress,
        apartment: delivery.apartment || "",
        entrance: delivery.entrance || "",
        floor: delivery.floor || "",
        intercom: delivery.intercom || "",
        date: delivery.date
          ? new Intl.DateTimeFormat("ru", {
              day: "numeric",
              month: "long",
            }).format(delivery.date)
          : "",
        time: TIME_SLOT_TO_API[delivery.time] || "",
        district: deliveryZone,
      },
      cartItems: items.map(item => ({
        productId: item.product_id,
        title: item.title,
        size: item.size,
        price: String(item.price),
        image: item.image,
      })),
      deliveryPrice: String(deliveryPrice ?? 0),
      postcard: postcard || "",
      cartPrice: String(productsPrice),
      fullPrice: String(productsPrice + (deliveryPrice ?? 0)),
    };

    try {
      const response = await orderApi.createOrder(userId!, orderData);
      if (response.payment_url) {
        // Очищаем флаг доступа после успешного оформления
        sessionStorage.removeItem("canAccessOrder");
        window.location.href = response.payment_url;
      }
    } catch (error) {
      console.error("Ошибка создания заказа:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Показываем лоадер пока проверяется доступ или загружаются данные
  if (!isHydrated || !hasAccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <Loader2 className="text-brown h-48 w-48 animate-spin" />
      </div>
    );
  }

  return (
    <div className="desktop:gap-60 gap-25 desktop:px-90 desktop:pb-160 pb-86 flex flex-col px-16 pt-40">
      <div className="desktop:gap-20 desktop:mb-47 mb-25 flex flex-row items-center gap-10">
        <Link href="/" className="caption text-grey-for-text">
          Главная
        </Link>
        <p className="caption text-grey-for-text">{">"}</p>
        <Link href="/cart" className="caption text-grey-for-text">
          Корзина
        </Link>
        <p className="caption text-grey-for-text">{">"}</p>
        <p className="caption">Оформление заказа</p>
      </div>
      <div className="desktop:gap-51 flex flex-col gap-20">
        <h1 className="h1">Оформление заказа</h1>
        <div className="desktop:gap-87 desktop:flex-row flex flex-col gap-40">
          <div className="desktop:max-w-1222 desktop:gap-30 flex w-full flex-col gap-40">
            {blocks
              .filter(block => block.visible)
              .map((block, index) => (
                <div
                  key={block.key}
                  className="desktop:gap-30 flex flex-col gap-20"
                >
                  <div className="bg-light-grey py-10.5 max-desktop:-mx-16 desktop:p-16 desktop:rounded-2xl flex flex-row gap-14 px-16">
                    <p className="text_p border-r border-black pr-14">
                      {index + 1}
                    </p>
                    <p className="text_p">{block.name}</p>
                  </div>
                  {block.render()}
                </div>
              ))}
          </div>
          <div className="desktop:max-h-520 max-h-259 desktop:top-200 desktop:py-24 desktop:px-20 p-15 desktop:sticky desktop:max-w-431 bg-light-grey flex flex-col rounded-2xl shadow-[1px_1px_4px_0_rgba(0,0,0,0.1),-1px_-1px_4px_0_rgba(0,0,0,0.1)]">
            <div className="desktop:gap-34 desktop:mb-51 mb-23 flex flex-col gap-14">
              <div className="flex flex-row justify-between">
                <p className="caption text-grey-for-text">
                  {formatProduct(items.length)} на сумму:
                </p>
                <p className="text_p">{formatPrice(productsPrice)} ₽</p>
              </div>
              <div className="flex flex-row justify-between">
                <p className="caption text-grey-for-text">Доставка:</p>
                <p className="text_p">
                  {deliveryPrice !== null
                    ? `${formatPrice(deliveryPrice)} ₽`
                    : "Индивидуально"}
                </p>
              </div>
            </div>
            <div className="desktop:gap-22 desktop:mb-22 mb-15 flex flex-col gap-10">
              <h3 className="h3">Итого:</h3>
              <h3 className="h3">
                {formatPrice(productsPrice + (deliveryPrice ?? 0))} ₽
              </h3>
            </div>
            <div className="desktop:gap-26 flex flex-col gap-16">
              <Button
                className="desktop:w-391 max-desktop:w-full"
                onClick={handleSubmitOrder}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-20 w-20 animate-spin" />
                ) : (
                  "Оформить заказ"
                )}
              </Button>
              <div className="flex flex-col gap-4">
                <div className="desktop:gap-13 flex flex-row gap-11">
                  <Checkbox
                    checked={checked}
                    onChange={() => {
                      setChecked(!checked);
                      clearError("checkbox");
                    }}
                  />
                  <p className="caption text-grey-for-text">
                    Нажимая на кнопку «Оформить заказ», вы соглашаетесь с
                    политикой конфиденциальности и договором оферты
                  </p>
                </div>
                {errors.checkbox && (
                  <p className="caption text-red-500">{errors.checkbox}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
