"use client";

import clsx from "clsx";
import DecorTitle from "./DecorTitle";
import { IconGlobal } from "../Icon/light";
import { IconPlay2, IconPause } from "../Icon/fill";
import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/shadcn/ui/carousel";
import NavButton from "./NavButton";

const PodcastBox = () => {
  const [api, setApi] = React.useState<CarouselApi>();

  return (
    <div className="home-container mx-auto py-9 xl:pt-14 xl:pb-24 border-t border-blue-200">
      <div className="px-4">
        <div className="flex justify-between items-center">
          <DecorTitle title="podcast" />
          <div className="items-center gap-2 hidden md:flex">
            <NavButton onClick={() => api?.scrollPrev()} />
            <NavButton isRight onClick={() => api?.scrollNext()} />
          </div>
        </div>
        <div className="flex overflow-x-auto gap-6 mt-5 -mx-4 px-4 md:hidden">
          {Array.from({ length: 10 }).map((_, index) => (
            <PodcastCard
              key={index}
              className="basis-4/5 shrink-0"
              title="Bản Tin Thời Sự"
              description="Bản tin thời sự sáng ngày 21/5/2025: Hôm nay, Quốc hội sẽ ra quyết định rút ngắn nhiệm kỳ, ấn định ngày bầu cử khóa XVI"
              image="https://picsum.photos/200/200"
            />
          ))}
        </div>
        <Carousel className="md:mt-8 xl:mt-10 hidden md:block" setApi={setApi}>
          <CarouselContent>
            {Array.from({ length: 15 }).map((_, index) => (
              <CarouselItem
                key={index}
                className={clsx(
                  "md:basis-2/5 lg:basis-2/7 xl:basis-1/4 xl:pl-6"
                )}
              >
                <PodcastCard
                  key={index}
                  className="basis-4/5 shrink-0"
                  title="Bản Tin Thời Sự"
                  description="Bản tin thời sự sáng ngày 21/5/2025: Hôm nay, Quốc hội sẽ ra quyết định rút ngắn nhiệm kỳ, ấn định ngày bầu cử khóa XVI"
                  image="https://picsum.photos/200/200"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
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
}

const PodcastCard: React.FC<PodcastCardProps> = ({
  className,
  title,
  description,
  image,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      className={clsx(
        "flex flex-col gap-5 aspect-[312/430]  bg-blue-500 overflow-hidden rounded-3xl p-4 pb-7",
        className
      )}
    >
      <div>
        <div className="size-12 bg-white flex items-center justify-center rounded-full">
          <IconGlobal size={36} className="text-blue-600" />
        </div>
        <p className="text-white leading-[140%] tracking-[-1%] font-bold mt-4 text-[1.375rem]">
          {title}
        </p>
        <p className="text-white/80 text-xsm font-normal mt-2 leading-[160%] tracking-[0%] line-clamp-4">
          {description}
        </p>
      </div>
      <div className="flex-1 flex justify-center items-center relative">
        <SoundWave
          className="absolute inset-0 -translate-x-1/2"
          isPlaying={isPlaying}
        />
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
                onClick={() => setIsPlaying((prev) => !prev)}
                className="size-[3.75rem] rounded-full flex items-center justify-center bg-white/35 backdrop-blur-2xl cursor-pointer"
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

interface SoundWaveProps {
  className?: string;
  isPlaying?: boolean;
}

const SoundWave: React.FC<SoundWaveProps> = ({ className, isPlaying }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Pre-calculate heights to avoid hydration mismatch
  const barHeights = [
    45, 67, 32, 89, 54, 23, 78, 41, 66, 35, 82, 48, 71, 29, 93, 37, 58, 44, 76,
    31, 85, 52, 69, 38, 91, 46, 63, 27, 88, 55, 72, 33, 79, 42, 65, 36, 87, 51,
    74, 28, 94, 47, 61, 34, 81, 49, 68, 39,
  ];

  return (
    <div
      className={clsx("flex items-center justify-between gap-1 z-0", className)}
    >
      {Array.from({ length: 48 }).map((_, i) => {
        const baseHeight = barHeights[i];
        // Reset delay every 3 items: 0, 0.08, 0.16, 0, 0.08, 0.16, ...
        const animationDelay = (i % 3) * 0.08;

        // Choose different animation types for variety
        const animationType = i % 3;
        let animationClass = "";
        if (isPlaying && isMounted) {
          switch (animationType) {
            case 0:
              animationClass = "animate-sound-wave";
              break;
            case 1:
              animationClass = "animate-sound-wave-pulse";
              break;
            case 2:
              animationClass = "animate-sound-wave-flow";
              break;
          }
        }

        // Calculate opacity based on position (deterministic)
        const opacityValue =
          isPlaying && isMounted ? 0.4 + Math.sin(i * 0.4) * 0.5 : 0.3;

        return (
          <div
            key={i}
            className={clsx(
              "w-1 rounded-full bg-white/25 shrink-0 transition-all duration-300",
              isPlaying && isMounted ? animationClass : "opacity-30"
            )}
            style={{
              height: `${baseHeight}%`,
              animationDelay: `${animationDelay}s`,
              opacity: opacityValue,
            }}
          />
        );
      })}
    </div>
  );
};
