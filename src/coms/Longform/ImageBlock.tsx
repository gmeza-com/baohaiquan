import type { ImageBlock } from "@/type/longform";
import clsx from "clsx";
import Image from "next/image";

interface ImageBlockProps extends ImageBlock {}

const ImageBlock: React.FC<ImageBlockProps> = ({
  caption,
  file,
  stretched,
  className,
  size,
  link
}) => {
  const imageElement = (
    <img
      src={file.url}
      alt={caption}
      width={1440}
      height={945}
      className={clsx(
        "size-full",
        link && "cursor-pointer hover:opacity-90 transition-opacity"
      )}
    />
  );

  const renderImage = () => {
    if (link) {
      return (
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
          title={caption || "Xem hình ảnh"}
        >
          {imageElement}
        </a>
      );
    }
    return imageElement;
  };

  return (
    <div
      className={clsx(
        className,
        size === "large" && "w-full md:px-0",
        size === "normal" && "container mx-auto !py-0",
        size === "small" && "w-full max-w-[568px] mx-auto px-4 md:px-0"
      )}
    >
      {renderImage()}
      {!!caption && (
        <figcaption className="text-center italic w-full mt-2 max-w-[660px] mx-auto text-blue-700 text-xs md:text-sm lg:text-base font-medium">
          {caption}
        </figcaption>
      )}
    </div>
  );
};

export default ImageBlock;
