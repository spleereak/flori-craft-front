import { api } from "@/src/shared/api";

const authBase = "custom_auth";

export interface SendSmsRequest {
  phone: string;
}

export interface SendSmsResponse {
  status: string;
}

export interface VerifyRegisterRequest {
  phone: string;
  code: string;
  name: string;
  gender: string;
}

export interface VerifyLoginRequest {
  phone: string;
  code: string;
}

export interface VerifyResponse {
  id: string;
  phone: string;
  name: string;
}

export interface ProfileResponse {
  phone: string;
  name: string;
}

export const authApi = {
  sendSms: (data: SendSmsRequest) =>
    api.post<SendSmsResponse>(`/${authBase}/send_sms/`, data),
  verifyRegister: (data: VerifyRegisterRequest) =>
    api.post<VerifyResponse>(`/${authBase}/verify_register/`, data),
  verifyLogin: (data: VerifyLoginRequest) =>
    api.post<VerifyResponse>(`/${authBase}/verify_login/`, data),
  getProfile: (userId: string) =>
    api.get<ProfileResponse>(`/${authBase}/profile/`, {
      params: { user_id: userId },
    }),
};
