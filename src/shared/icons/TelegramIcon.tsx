import Image from "next/image";

export const TelegramIcon = () => {
  return (
    <Image
      src="/icons/telegram-icon.png"
      alt=""
      width={40}
      height={40}
      className="desktop:size-40 size-20"
    />
  );
};
