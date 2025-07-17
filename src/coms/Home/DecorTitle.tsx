import clsx from "clsx";
import Link from "next/link";
import { IconBadge } from "../Icon/fill";

interface DecorTitleProps {
  className?: string;
  title: string;
  textClassName?: string;
  link?: string;
}

const DecorTitle: React.FC<DecorTitleProps> = ({
  className,
  title,
  textClassName,
  link,
}) => {
  const titleElement = (
    <h4
      className={clsx(
        "text-blue-700 truncate overflow-hidden whitespace-nowrap leading-[140%] tracking-[0%] font-[900] font-playfair-display text-xl uppercase lg:text-[1.625rem]",
        textClassName
      )}
    >
      {title}
    </h4>
  );

  return (
    <div className={clsx("flex items-center gap-4 lg:gap-5", className)}>
      <IconBadge size={26} className="shrink-0" />
      {link ? (
        <Link
          href={link}
          className="hover:opacity-80 transition-opacity focus:underline text-blue-700"
        >
          {titleElement}
        </Link>
      ) : (
        titleElement
      )}
    </div>
  );
};

export default DecorTitle;
