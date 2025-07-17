"use client";

import clsx from "clsx";
import DecorTitle from "./DecorTitle";
import { IconHeadphones } from "../Icon/light";
import { IconPlay2, IconPause } from "../Icon/fill";
import React, { useState, useEffect, useRef } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/shadcn/ui/carousel";
import NavButton from "./NavButton";
import { IGalleryCollection } from "@/type/article";
import { Category } from "@/type/category";
import Link from "next/link";
import dynamic from "next/dynamic";
import navigateService from "@/lib/router";

const SoundWave = dynamic(() => import("./SoundWave"), {
  ssr: false,
});

interface PodcastBoxProps {
  podcasts: IGalleryCollection[];
  category: Pick<Category, "slug" | "name">;
}

const PodcastBox: React.FC<PodcastBoxProps> = ({ podcasts = [], category }) => {
  const [api, setApi] = React.useState<CarouselApi>();

  if (podcasts?.length <= 0) return null;

  return (
    <div className="border-t border-blue-200 md:border-0">
      <div className="container mx-auto">
        <div className="py-5 lg:pt-11 lg:pb-[5.25rem] md:border-t md:border-blue-200">
          <div className="flex justify-between items-center">
            <DecorTitle
              title={category?.name}
              link={navigateService.getGalleryCollection(category?.slug)}
            />
            <div className="items-center gap-2 hidden md:flex">
              <NavButton onClick={() => api?.scrollPrev()} />
              <NavButton isRight onClick={() => api?.scrollNext()} />
            </div>
          </div>
          <div className="flex overflow-x-auto gap-6 mt-5 -mx-4 px-4 md:hidden">
            {podcasts.map((item, index) => (
              <PodcastCard
                key={index}
                className="basis-4/5 shrink-0"
                title={item.name}
                description={item.description}
                image={item.thumbnail}
                audioUrl={item.content}
                href={navigateService.getGalleryDetails(
                  category?.slug,
                  item?.slug
                )}
              />
            ))}
          </div>
          <Carousel
            className="md:mt-8 xl:mt-10 hidden md:block"
            setApi={setApi}
          >
            <CarouselContent className="xl:-ml-6">
              {podcasts.map((item, index) => (
                <CarouselItem
                  key={index}
                  className={clsx(
                    "md:basis-2/5 lg:basis-2/7 xl:basis-1/4 xl:pl-6"
                  )}
                >
                  <PodcastCard
                    key={index}
                    className="basis-4/5 shrink-0"
                    title={item.name}
                    description={item.description}
                    image={item.thumbnail}
                    audioUrl={item.content}
                    href={navigateService.getGalleryDetails(
                      category?.slug,
                      item?.slug
                    )}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default PodcastBox;

interface PodcastCardProps {
  className?: string;
  title: string;
  description: string;
  image: string;
  audioUrl?: string;
  href: string;
}

const PodcastCard: React.FC<PodcastCardProps> = ({
  className,
  title,
  description,
  image,
  audioUrl,
  href,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioUrl) {
      const audioElement = new Audio(audioUrl);
      audioElement.addEventListener("ended", () => setIsPlaying(false));
      setAudio(audioElement);

      return () => {
        audioElement.pause();
        audioElement.removeEventListener("ended", () => setIsPlaying(false));
      };
    }
  }, [audioUrl]);

  const handlePlayPause = () => {
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
      setIsPlaying(true);
    }
  };

  return (
    <div
      className={clsx(
        "flex flex-col gap-5 aspect-[312/430]  bg-blue-500 overflow-hidden rounded-3xl p-4 pb-7",
        className
      )}
    >
      <Link href={href} className="flex-1 overflow-hidden group">
        <div className="size-12 bg-white flex items-center justify-center rounded-full">
          <IconHeadphones size={36} className="text-blue-600" />
        </div>
        <p className="text-white group-focus:underline leading-[140%] tracking-[-1%] font-bold mt-4 text-[1.375rem] line-clamp-1">
          {title}
        </p>
        <p className="text-white/80 text-xsm font-normal mt-2 leading-[160%] tracking-[0%] line-clamp-4">
          {description}
        </p>
      </Link>
      <div className="h-40 flex justify-center items-center relative -mx-4">
        <SoundWave className="absolute inset-0" isPlaying={isPlaying} />
        <div className="rounded-full h-full aspect-square overflow-hidden bg-white p-0.5">
          <div className="size-full relative rounded-full overflow-hidden">
            <img
              className={clsx(
                "absolute inset-0 size-full object-cover",
                isPlaying && "animate-[spin_10s_linear_infinite]"
              )}
              src={image}
            />
            <div className="size-full flex items-center justify-center relative z-10">
              <div
                onClick={handlePlayPause}
                className={clsx(
                  "size-[3.75rem] rounded-full flex items-center justify-center backdrop-blur-2xl cursor-pointer",
                  audio ? "bg-white/35" : "bg-white/20 cursor-not-allowed"
                )}
              >
                {isPlaying ? (
                  <IconPause size={24} className="text-white" />
                ) : (
                  <IconPlay2 size={24} className="text-white" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
