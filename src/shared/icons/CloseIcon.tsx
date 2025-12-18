import Image from "next/image";

export const CloseIcon = () => {
  return (
    <Image
      className="desktop:size-20 size-12"
      src="/icons/close.png"
      alt="Image"
      width={12}
      height={12}
    />
  );
};
