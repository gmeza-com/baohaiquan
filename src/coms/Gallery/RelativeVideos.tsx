"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/shadcn/ui/carousel";
import DecorTitle from "../Home/DecorTitle";
import NavButton from "../Home/NavButton";
import { IGalleryCollection } from "@/type/article";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { rest } from "@/lib/rest";
import Image from "next/image";
import Link from "next/link";
import { IconPlay2 } from "../Icon/fill";
import navigateService from "@/lib/router";

interface RelativeVideosProps {
  slug: string;
}

const RelativeVideos = ({ slug }: RelativeVideosProps) => {
  const [videos, setVideos] = useState<IGalleryCollection[]>([]);
  const [api, setApi] = useState<CarouselApi>();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const slideCount = useMemo(() => {
    if (!videos.length) return 0;

    return Math.ceil(videos.length / 8);
  }, [videos]);

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

  if (isError || !slug) return null;

  return (
    <div className="w-full py-4 lg:py-10 xl:py-15">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <DecorTitle title="Video liên quan" />
          <div className="flex items-center gap-2">
            <NavButton onClick={() => api?.scrollPrev()} />
            <NavButton onClick={() => api?.scrollNext()} isRight />
          </div>
        </div>
        <Carousel className="mt-6 lg:mt-8 xl:mt-10" setApi={setApi}>
          <CarouselContent>
            {isLoading &&
              Array.from({ length: 2 }).map((_, index) => (
                <CarouselItem>
                  <div
                    key={index}
                    className="w-full grid grid-cols-2  md:grid-cols-4 gap-4 xl:gap-6"
                  >
                    {Array.from({ length: 8 }).map((_, index) => (
                      <LoadingItem key={index} />
                    ))}
                  </div>
                </CarouselItem>
              ))}

            {!isLoading &&
              videos.length > 0 &&
              Array.from({ length: slideCount }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="w-full grid grid-cols-2  md:grid-cols-4 gap-4 xl:gap-6">
                    {videos.slice(index * 8, (index + 1) * 8).map((video) => (
                      <VideoItem key={video?.id} video={video} href={navigateService.getGalleryDetails(slug, video?.slug)} />
                    ))}
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default RelativeVideos;

const LoadingItem = () => {
  return (
    <div className="w-full animate-pulse">
      <div className="aspect-video bg-gray-200 rounded-[6px]" />
      <div className="w-full h-6 bg-gray-200 rounded-[6px] mt-2" />
      <div className="w-1/2 h-6 bg-gray-200 rounded-[6px] mt-2" />
    </div>
  );
};

const VideoItem = ({ video, href }: { video: IGalleryCollection; href: string }) => {
  return (
    <Link
      href={href}
      className="w-full pb-2 lg:pb-4 @container/video-card"
    >
      <div className="relative">
        <Image
          src={video.thumbnail}
          alt={video.name}
          width={312}
          height={175}
          className="w-full aspect-video rounded-[6px] object-cover"
        />
        <div className="z-20 cursor-pointer absolute size-10 rounded-full bg-white/25 backdrop-blur-2xl top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center @min-[300px]/video-card:size-12">
          <IconPlay2 size={12} className="text-white" />
        </div>
      </div>

      <h6 className="mt-2.5 text-sm font-semibold text-gray-900 leading-[150%] tracking-[-1%] @min-[300px]/video-card:text-lg">
        {video?.name}
      </h6>
    </Link>
  );
};
