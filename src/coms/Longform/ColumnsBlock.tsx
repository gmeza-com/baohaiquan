import type { ColumnsBlock } from "@/type/longform";
import ParagraphBlock from "./ParagraphBlock";
import HeaderBlock from "./HeaderBlock";
import ImageBlock from "./ImageBlock";
import clsx from "clsx";

interface ColumnsBlockProps extends ColumnsBlock {}

const ColumnsBlock: React.FC<ColumnsBlockProps> = ({ cols }) => {
  const renderBlock = (block: any, index: number, colIndex: number) => {
    switch (block.type) {
      case "paragraph":
        return (
          <ParagraphBlock key={block?.id} {...block.data} className="!py-0" />
        );
      case "header":
        return <HeaderBlock key={block?.id} {...block.data} />;
      case "image":
        return (
          <ImageBlock
            key={block?.id}
            {...block.data}
            stretched={true}
            className={clsx(
              "!py-0 scale-150",
              colIndex === 0 && "origin-top-right",
              colIndex === 1 && "origin-top-left"
            )}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="grid w-full max-w-[568px] mx-auto gap-7 py-4"
      style={{ gridTemplateColumns: `repeat(${cols?.length}, 1fr)` }}
    >
      {cols?.map((col, index) => (
        <div key={`col-${index}`}>
          {col?.blocks?.map((item, itemIndex) =>
            renderBlock(item, itemIndex, index)
          )}
        </div>
      ))}
    </div>
  );
};

export default ColumnsBlock;
