import Image from "next/image";

export const WhatsappIcon = () => {
  return (
    <Image
      src="/icons/whatsapp-icon.png"
      alt=""
      width={40}
      height={40}
      className="desktop:size-40 size-20"
    />
  );
};
