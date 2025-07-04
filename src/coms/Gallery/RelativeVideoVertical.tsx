"use client";

import { IGalleryCollectionWithViewCount } from "@/type/article";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IconPlay2 } from "../Icon/fill";
import Link from "next/link";
import { formatNumberWithSeparator, formatRelativeTime } from "@/lib/utils";

interface RelativeVideoVerticalProps {
  slug: string;
  categorySlug: string;
}

const RelativeVideoVertical: React.FC<RelativeVideoVerticalProps> = ({
  slug,
  categorySlug,
}) => {
  const [videos, setVideos] = useState<IGalleryCollectionWithViewCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!slug) return;

    setIsLoading(true);

    axios
      .get(`/api/relative-videos?slug=${slug}`)
      .then((res) => {
        setVideos(res.data.data);
      })
      .catch((err) => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [slug]);

  if (isError) return null;

  if (isLoading)
    return (
      <ul className="flex flex-col gap-4 divide-y divide-white/25 divide-dashed">
        {Array.from({ length: 4 }).map((_, index) => (
          <li
            key={`loading-${index}`}
            className="last:pb-0 pb-4 @container/video-card animate-pulse"
          >
            <div className="flex @max-[250px]/video-card:flex-col gap-5 group">
              <div className="object-cover w-[128px] aspect-[128/96] @max-[250px]/video-card:w-full @max-[250px]/video-card:aspect-video  relative shrink-0 rounded-[6px] overflow-hidden bg-gray-700"></div>

              <div className="flex-1">
                <div className="w-full h-8 bg-gray-700 rounded-[6px]"></div>
                <div className="w-full h-4 bg-gray-700 rounded-[6px] mt-1.5"></div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );

  return (
    <>
      <ul className="flex flex-col gap-4 divide-y divide-white/25 divide-dashed">
        {videos.map((video) => (
          <li key={video.id} className="last:pb-0 pb-4 @container/video-card">
            <Link
              href={`/gallery/${video.slug}`}
              className="flex @max-[250px]/video-card:flex-col gap-5 group"
            >
              <div className="relative shrink-0 rounded-[6px] overflow-hidden">
                <Image
                  src={video?.thumbnail}
                  alt={video?.name}
                  width={128}
                  height={96}
                  className="size-full object-cover w-[128px] aspect-[128/96] @max-[250px]/video-card:w-full @max-[250px]/video-card:aspect-video "
                />

                <div className="z-20 cursor-pointer absolute size-10 rounded-full bg-white/25 backdrop-blur-2xl top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center @min-[300px]/video-card:size-8">
                  <IconPlay2 size={16} className="text-white" />
                </div>
              </div>

              <div>
                <h6 className="group-hover:underline text-white text-lg font-semibold leading-[150%] tracking-[-1%]">
                  {video?.name}
                </h6>
                <span className="text-gray-600 text-xsm leading-[160%] tracking-[0%] mt-1.5">
                  {formatNumberWithSeparator(video.view_count || 0)} lượt xem •{" "}
                  {formatRelativeTime(video.published_at)}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href={`/gallery/collection/${categorySlug}`}
        className=" text-white text-xsm font-semibold bg-white/10 px-4 h-12 flex items-center justify-center rounded-[10px] mt-6"
      >
        Xem thêm
      </Link>
    </>
  );
};

export default RelativeVideoVertical;
