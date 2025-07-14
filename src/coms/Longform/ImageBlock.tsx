import type { ImageBlock } from "@/type/longform";
import clsx from "clsx";
import Image from "next/image";

interface ImageBlockProps extends ImageBlock {}

const ImageBlock: React.FC<ImageBlockProps> = ({
  caption,
  file,
  stretched,
  className,
}) => {
  return (
    <div
      className={clsx(
        stretched ? "w-full md:px-0" : "container mx-auto !py-0",
        className
      )}
    >
      <Image
        src={file.url}
        alt={caption}
        width={1440}
        height={945}
        className="size-full"
      />
      {!!caption && (
        <figcaption className="text-center italic w-full mt-2 max-w-[660px] mx-auto text-blue-700 text-xs md:text-sm lg:text-base font-medium">
          {caption}
        </figcaption>
      )}
    </div>
  );
};

export default ImageBlock;
