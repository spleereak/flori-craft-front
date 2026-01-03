import { cn } from "@/src/shared/lib/utils/cn";

export const AuthTabs = ({
  className,
  activeAuth,
  registerClick,
  loginClick,
}: {
  className?: string;
  activeAuth: "login" | "register";
  registerClick: () => void;
  loginClick: () => void;
}) => {
  return (
    <div className={cn("flex w-full flex-row", className)}>
      <div
        className={cn(
          "w-130 h-25 desktop:w-366 desktop:h-44 desktop:pb-11 flex justify-center border-b border-[#80808080] pb-6 transition-all duration-500 ease-in-out",
          activeAuth === "login" && "border-brown"
        )}
        onClick={loginClick}
      >
        <p className="text_p max-w-max">Вход</p>
      </div>
      <div
        className={cn(
          "w-130 h-25 desktop:w-366 desktop:h-44 desktop:pb-11 flex justify-center border-b border-[#80808080] pb-6 transition-all duration-300 ease-in-out",
          activeAuth === "register" && "border-brown"
        )}
        onClick={registerClick}
      >
        <p className="text_p max-w-max">Регистрация</p>
      </div>
    </div>
  );
};
