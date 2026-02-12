import Image from "next/image";
import Link from "next/link";

const data = {
  title: "Доставка",
  info: [
    {
      image: "/images/delivery.png",
      subTitle: "Доставка по Москве",
      text: "Москва в пределах МКАД - 1200 р. ЖК ФилиГрад, ЖК Онли, ЖК Береговой - 350 р. Район Фили - 750 р. За МКАД - индивидуально",
    },
    {
      image: "/images/express-delivery.png",
      subTitle: "Доставка по Подмосковье",
      text: "Новая Москва и Подмосковье — рассчитывается индивидуально",
    },
    {
      image: "/images/time-left.png",
      subTitle: "Время доставки",
      text: "Доставка осуществляется ежедневно с 10:00 до 22:00.\nДругое время доставки согласовывается индивидуально.",
    },
    {
      image: "/images/bouquet.png",
      subTitle: "Условия доставки",
      text: "‌Для бережной доставки мы упаковываем букеты в транспортировочную коробку и прикладываем наши рекомендации по уходу.",
    },
  ],
};

export default function DeliveryPage() {
  return (
    <div className="desktop:pb-160 desktop:px-90 pb-100 gap-25 desktop:gap-60 flex w-full flex-col px-16 pt-40">
      <div className="desktop:gap-20 desktop:mb-104 mb-25 flex flex-row items-center gap-10">
        <Link href="/" className="caption text-grey-for-text">
          Главная
        </Link>
        <p className="caption text-grey-for-text">&gt;</p>
        <p className="caption">Доставка</p>
      </div>
      <div className="desktop:gap-71 gap-25 flex w-full flex-col">
        <h1 className="h1">{data.title}</h1>
        <div className="desktop:grid-cols-2 desktop:gap-x-74 desktop:gap-y-78 gap-25 grid grid-cols-1">
          {data.info.map((inf, i) => (
            <div key={i}>
              <div className="desktop:flex gap-45 hidden flex-row">
                <Image
                  src={inf.image}
                  alt=""
                  width={150}
                  height={150}
                  className="size-150 object-cover"
                />
                <div className="gap-30 text-green-main flex flex-col">
                  <h1 className="h1">{inf.subTitle}</h1>
                  <p className="text_p">{inf.text}</p>
                </div>
              </div>
              <div className="desktop:hidden text-green-main flex flex-col gap-11 border-b border-[#80808080] pb-11">
                <h1 className="h1">{inf.subTitle}</h1>
                <div className="flex flex-row gap-20">
                  <Image
                    src={inf.image}
                    alt=""
                    width={70}
                    height={70}
                    className="size-70 object-cover"
                  />
                  <p className="text_p pt-15 whitespace-pre-wrap">{inf.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
