export interface FormProps {
  className?: string;
  mode: "register" | "login";
}

export interface FormData {
  name: string;
  gender: string;
  phone: string;
  agreedToPolicy: boolean;
}

export interface FormErrors {
  name?: boolean;
  phone?: boolean;
  agreedToPolicy?: boolean;
}
