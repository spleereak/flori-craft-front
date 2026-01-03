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

export interface FormProps {
  mode: "register" | "login";
  // eslint-disable-next-line no-unused-vars
  onSuccess: (data: { name: string; phone: string; gender: string }) => void;
}
