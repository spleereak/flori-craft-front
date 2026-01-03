export interface SmsCodeFormProps {
  userData: {
    name: string;
    phone: string;
    gender: string;
  };
  mode: "register" | "login";
}
