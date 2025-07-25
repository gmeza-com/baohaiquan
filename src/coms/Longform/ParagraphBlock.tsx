import type { ParagraphBlock } from "@/type/longform";
import clsx from "clsx";

interface ParagraphBlockProps extends ParagraphBlock {
  className?: string;
}

const ParagraphBlock: React.FC<ParagraphBlockProps> = ({
  text,
  alignment,
  className,
  dropcap,
}) => {
  return (
    <div
      className={clsx(
        "px-4 md:px-0 leading-[160%] tracking-[0%] py-4 w-full max-w-[568px] mx-auto text-base lg:text-lg text-gray-900",
        alignment === "center" && "text-center",
        alignment === "right" && "text-right",
        alignment === "justify" && "text-justify",
        alignment === "left" && "text-left",
        dropcap && "drop-cap",
        className
      )}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};

export default ParagraphBlock;
