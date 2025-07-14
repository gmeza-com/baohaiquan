import type { QuoteBlock } from "@/type/longform";
import clsx from "clsx";

interface QuoteBlockProps extends QuoteBlock {
  className?: string;
}

const QuoteBlock: React.FC<QuoteBlockProps> = ({
  text,
  alignment,
  caption,
  className,
}) => {
  return (
    <div
      className={clsx(
        "py-4 w-full max-w-[568px] mx-auto",
        className
      )}
    >
      <blockquote
        className={clsx(
          "relative border-l-4 border-gray-300 pl-6 italic text-xl text-gray-700 leading-[160%] tracking-[0%]",
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
