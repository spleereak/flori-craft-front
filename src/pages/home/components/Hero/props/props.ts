import { ButtonAppearance } from "@/src/shared/ui/Button/types/types";

export interface I_Hero {
  className?: string;
  onOrderClick?: () => void;
  activeTemplate: "firstTemplate" | "secondTemplate";
  firstTemplate: {
    buttonText: string;
    title_first: string;
    typeofButton: ButtonAppearance | undefined;
    image_first: {
      url: string;
    };
    image_mobile_first: {
      url: string;
    };
    title_color: string;
    click: "скролл" | "ссылка";
    link?: string;
  };
  secondTemplate: {
    title: string;
    text: string;
    image: {
      url: string;
    };
    mobile_image: {
      url: string;
    };
    color: string;
    text_color: string;
    bg_color: string;
  };
}
