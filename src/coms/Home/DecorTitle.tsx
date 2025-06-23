import clsx from "clsx";
import { IconBadge } from "../Icon/fill";

interface DecorTitleProps {
  className?: string;
  title: string;
  textClassName?: string;
}

const DecorTitle: React.FC<DecorTitleProps> = ({
  className,
  title,
  textClassName,
}) => {
  return (
    <div className={clsx("flex items-center gap-4 lg:gap-5", className)}>
      <IconBadge size={26} className="shrink-0" />
      <span
        className={clsx(
          "text-blue-700 whitespace-nowrap leading-[140%] tracking-[0%] font-[900] font-playfair-display text-xl uppercase lg:text-[1.625rem]",
          textClassName
        )}
      >
        {title}
      </span>
    </div>
  );
};

export default DecorTitle;
