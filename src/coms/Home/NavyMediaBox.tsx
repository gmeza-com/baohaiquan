"use client";

import { IGalleryCollection } from "@/type/article";
import clsx from "clsx";
import { HTMLAttributes, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import Image from "next/image";
import { IconPlay2 } from "../Icon/fill";

interface NavyMediaBoxProps {
  className?: string;
  galleries: IGalleryCollection[];
}

const NavyMediaBox: React.FC<NavyMediaBoxProps> = ({
  className,
  galleries,
}) => {
  const [activeGallery, setActiveGallery] = useState<IGalleryCollection>(
    galleries[0]
  );

  return (
    <div className={clsx("@container/navy-media-box", className)}>
      <VideoPlayer
        key={activeGallery?.id}
        url={activeGallery?.content}
        thumbnail={activeGallery?.thumbnail}
        className="w-full aspect-video rounded-[6px] object-cover"
        width={972}
        height={544}
      />
      <div className="grid grid-cols-1 gap-4 @min-[900px]/navy-media-box:gap-6 mt-4 @min-[900px]/navy-media-box:mt-10 @min-[900px]/navy-media-box:grid-cols-3">
        {galleries?.slice(0, 3)?.map((item, index) => (
          <NavyMediaItem
            key={item?.id}
            title={item?.name}
            image={item?.thumbnail}
            active={item?.id === activeGallery?.id}
            onClick={() => setActiveGallery(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default NavyMediaBox;

interface NavyMediaItemProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  image: string;
  active?: boolean;
}

const NavyMediaItem: React.FC<NavyMediaItemProps> = ({
  title,
  image,
  active,
  ...props
}) => {
  return (
    <div
      {...props}
      className={clsx(
        "cursor-pointer relative flex items-start gap-3 ps-4 @min-[900px]/navy-media-box:ps-0 @min-[900px]/navy-media-box:pt-3 @min-[900px]/navy-media-box:border-t-4",
        active ? "border-blue-500" : "border-transparent"
      )}
    >
      {active && (
        <div className="absolute h-full w-[4px] top-0 left-0 bg-blue-500 @min-[900px]/navy-media-box:hidden" />
      )}
      <div className="relative shrink-0">
        <Image
          src={image}
          className="object-cover w-[120px] aspect-video rounded-[6px] mt-1"
          width={120}
          height={68}
          alt={title}
        />

        <div className="z-20 cursor-pointer absolute size-8 rounded-full bg-white/25 backdrop-blur-2xl top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center">
          <IconPlay2 size={12} className="text-white" />
        </div>
      </div>

      <h6
        className={clsx(
          "line-clamp-4 text-xsm font-medium leading-[150%] tracking-[0%]",
          active ? "text-blue-700" : "text-gray-900"
        )}
      >
        {title}
      </h6>
    </div>
  );
};
