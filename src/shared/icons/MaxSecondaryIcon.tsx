import { cn } from "../lib/utils/cn";
import { MaxIcon } from "./MaxIcon";

export const MaxSecondaryIcon = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "desktop:size-56 hover:bg-light-grey flex size-44 cursor-pointer items-center justify-center rounded-full border border-black bg-white transition-all duration-300 ease-in-out hover:opacity-80",
        className
      )}
    >
      <MaxIcon className="desktop:size-26 size-18" />
    </div>
  );
};
