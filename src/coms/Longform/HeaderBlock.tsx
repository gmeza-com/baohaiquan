import type { HeaderBlock } from "@/type/longform";
import clsx from "clsx";
import { createElement } from "react";

interface HeaderBlockProps extends HeaderBlock {}

const HeaderBlock: React.FC<HeaderBlockProps> = ({
  text,
  level,
  alignment,
}) => {
  // Define text size and weight based on header level
  const getHeaderStyles = (level: number) => {
    switch (level) {
      case 1:
        return "text-3xl lg:text-4xl font-bold";
      case 2:
        return "text-2xl lg:text-3xl font-bold";
      case 3:
        return "text-xl lg:text-2xl font-bold";
      case 4:
        return "text-lg lg:text-xl font-semibold";
      case 5:
        return "text-base lg:text-lg font-semibold";
      case 6:
        return "text-sm lg:text-base font-medium";
      default:
        return "text-lg font-semibold";
    }
  };

  return createElement(`h${level}`, {
    className: clsx(
      "px-4 md:px-0 leading-[140%] tracking-[0%] py-4 w-full max-w-[568px] mx-auto text-gray-900",
      getHeaderStyles(level),
      alignment === "center" && "text-center",
      alignment === "right" && "text-right",
      alignment === "justify" && "text-justify",
      alignment === "left" && "text-left"
    ),
    dangerouslySetInnerHTML: { __html: text },
  });
};

export default HeaderBlock;
