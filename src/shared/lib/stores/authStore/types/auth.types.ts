export interface AuthStoreProps {
  isAuthenticated: boolean;
  user: {
    name: string;
    phone: string;
    gender: string;
    token?: string;
  } | null;
  // eslint-disable-next-line no-unused-vars
  setAuth: (isAuth: boolean, user?: AuthStoreProps["user"]) => void;
  logout: () => void;
}
