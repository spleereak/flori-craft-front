const isBrowser = typeof document !== "undefined";

export const cookies = {
  set: (name: string, value: string): void => {
    if (!isBrowser) return;
    const date = new Date();
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * 7);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/;SameSite=None;Secure`;
  },

  get: (name: string): string | null => {
    if (!isBrowser) return null;
    const cookies = document.cookie.split(";");
    const cookie = cookies.find(c => c.trim().startsWith(`${name}=`));
    return cookie ? cookie.split("=")[1] : null;
  },
  remove: (name: string): void => {
    if (!isBrowser) return;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=None;Secure`;
  },

  setUserId: (userId: string): void => {
    cookies.set("user_id", userId);
  },

  removeUserId: (): void => {
    cookies.remove("user_id");
  },
};
