"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/shadcn/ui/carousel";
import DecorTitle from "../Home/DecorTitle";
import NavButton from "../Home/NavButton";
import { IGalleryCollectionList } from "@/type/article";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import AudioCard from "./AudioCard";

interface RelativePodcastProps {
  slug: string;
}

const RelativePodcast = ({ slug }: RelativePodcastProps) => {
  const [videos, setVideos] = useState<IGalleryCollectionList[]>([]);
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
      .get(`/api/relative-videos`, {
        params: {
          limit: 16,
          slug,
        },
      })
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
          <DecorTitle title="Podcast liên quan" />
          <div className="flex items-center gap-2">
            <NavButton onClick={() => api?.scrollPrev()} />
            <NavButton onClick={() => api?.scrollNext()} isRight />
          </div>
        </div>
        <Carousel className="mt-6 lg:mt-8 xl:mt-10" setApi={setApi}>
          <CarouselContent>
            {isLoading &&
              Array.from({ length: 2 }).map((_, index) => (
                <CarouselItem key={index}>
                  <ul className="w-full grid grid-cols-2  md:grid-cols-4 gap-4 xl:gap-6">
                    {Array.from({ length: 8 }).map((_, index) => (
                      <LoadingItem key={index} />
                    ))}
                  </ul>
                </CarouselItem>
              ))}

            {!isLoading &&
              videos.length > 0 &&
              Array.from({ length: slideCount }).map((_, index) => (
                <CarouselItem key={index}>
                  <ul className="w-full grid grid-cols-2  md:grid-cols-4 gap-4 xl:gap-6">
                    {videos.slice(index * 8, (index + 1) * 8).map((video) => (
                      <AudioCard
                        key={video?.id}
                        data={video}
                        href={`/podcast/${video?.slug}`}
                      />
                    ))}
                  </ul>
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default RelativePodcast;

const LoadingItem = () => {
  return (
    <li className="w-full animate-pulse">
      <div className="aspect-video bg-gray-200 rounded-[6px]" />
      <div className="w-full h-6 bg-gray-200 rounded-[6px] mt-2" />
      <div className="w-1/2 h-6 bg-gray-200 rounded-[6px] mt-2" />
    </li>
  );
};
