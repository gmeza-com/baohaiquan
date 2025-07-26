import type { QuoteBlock } from "@/type/longform";
import clsx from "clsx";
import { IconQuote } from "../Icon/fill";

interface QuoteBlockProps extends QuoteBlock {
  className?: string;
}

const QuoteBlock: React.FC<QuoteBlockProps> = ({
  text,
  alignment = "left",
  caption,
  className,
}) => {
  return (
    <div
      className={clsx(
        "w-full bg-yellow-100 p-4 xl:pt-7 xl:px-10 xl:pb-12 rounded-3xl",
        className
      )}
    >
      <IconQuote size={52} className="text-[#DCD7CB]" />
      <blockquote
        className={clsx(
          "relative italic text-base lg:text-xl xl:text-[1.375rem] text-gray-700 leading-[160%] tracking-[0%] mt-5",
          alignment === "center" && "text-center border-l-0 pl-0",
          alignment === "left" && "text-left"
        )}
        dangerouslySetInnerHTML={{ __html: text }}
      />
      {caption && (
        <cite
          className={clsx(
            "block mt-2 text-sm text-gray-500 not-italic",
            alignment === "center" && "text-center",
            alignment === "left" && "text-left"
          )}
          dangerouslySetInnerHTML={{ __html: caption }}
        />
      )}
    </div>
  );
};

export default QuoteBlock;
