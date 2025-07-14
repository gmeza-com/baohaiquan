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
              "!py-0 scale-100 md:scale-110 lg:scale-150",
              colIndex === 0 && "origin-top-right",
              colIndex === 1 && "origin-top-left"
            )}
          />
        );
      default:
        return null;
    }
  };

  // Determine responsive grid classes based on number of columns
  const getGridClasses = () => {
    const colCount = cols?.length || 1;
    
    if (colCount === 1) return "grid-cols-1";
    if (colCount === 2) return "grid-cols-1 md:grid-cols-2";
    if (colCount >= 3) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    
    return "grid-cols-1";
  };

  return (
    <div
      className={clsx(
        "grid w-full max-w-[568px] mx-auto gap-7 py-4",
        getGridClasses()
      )}
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
