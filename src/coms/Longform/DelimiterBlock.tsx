import type { DelimiterBlock } from "@/type/longform";
import clsx from "clsx";

interface DelimiterBlockProps extends DelimiterBlock {}

const DelimiterBlock: React.FC<DelimiterBlockProps> = ({
  style,
  lineWidth = 25,
  lineThickness = 2,
}) => {
  const renderStarDelimiter = () => (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-2">
        <span className="text-blue-700 text-2xl">★</span>
        <span className="text-blue-700 text-xl">★</span>
        <span className="text-blue-700 text-2xl">★</span>
      </div>
    </div>
  );

  const renderDashDelimiter = () => (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className="w-3 h-px bg-gray-400 block"
            style={{ backgroundColor: "var(--color-gray-400)" }}
          />
        ))}
      </div>
    </div>
  );

  const renderLineDelimiter = () => {
    // Convert lineWidth percentage to width class
    const getWidthClass = (width: number) => {
      switch (width) {
        case 8:
          return "w-[8%]";
        case 15:
          return "w-[15%]";
        case 25:
          return "w-1/4";
        case 35:
          return "w-[35%]";
        case 50:
          return "w-1/2";
        case 60:
          return "w-[60%]";
        case 100:
          return "w-full";
        default:
          return "w-1/4";
      }
    };

    // Convert thickness to height class
    const getHeightClass = (thickness: number) => {
      switch (thickness) {
        case 1:
          return "h-px";
        case 2:
          return "h-0.5";
        case 3:
          return "h-0.75";
        case 4:
          return "h-1";
        case 5:
          return "h-1.5";
        case 6:
          return "h-2";
        default:
          return "h-0.5";
      }
    };

    return (
      <div className="flex items-center justify-center w-full">
        <div
          className={clsx(
            "bg-gray-400 rounded-full",
            getWidthClass(lineWidth),
            getHeightClass(lineThickness)
          )}
          style={{ backgroundColor: "var(--color-gray-400)" }}
        />
      </div>
    );
  };

  const renderDelimiter = () => {
    switch (style) {
      case "star":
        return renderStarDelimiter();
      case "dash":
        return renderDashDelimiter();
      case "line":
        return renderLineDelimiter();
      default:
        return renderLineDelimiter();
    }
  };

  return (
    <div className="py-8 w-full max-w-[568px] mx-auto flex items-center justify-center">
      {renderDelimiter()}
    </div>
  );
};

export default DelimiterBlock;
