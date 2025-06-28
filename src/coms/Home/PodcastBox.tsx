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
              link={`/gallery/collections/${category?.slug}`}
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
                slug={item.slug}
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
                    slug={item.slug}
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
  slug: string;
}

const PodcastCard: React.FC<PodcastCardProps> = ({
  className,
  title,
  description,
  image,
  audioUrl,
  slug,
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
      <Link href={`/gallery/collections/${slug}`}>
        <div className="size-12 bg-white flex items-center justify-center rounded-full">
          <IconHeadphones size={36} className="text-blue-600" />
        </div>
        <p className="text-white leading-[140%] tracking-[-1%] font-bold mt-4 text-[1.375rem]">
          {title}
        </p>
        <p className="text-white/80 text-xsm font-normal mt-2 leading-[160%] tracking-[0%] line-clamp-4">
          {description}
        </p>
      </Link>
      <div className="flex-1 flex justify-center items-center relative -mx-4">
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

interface SoundWaveProps {
  className?: string;
  isPlaying?: boolean;
}

const SoundWave: React.FC<SoundWaveProps> = ({ className, isPlaying }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [barCount, setBarCount] = useState(48);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const updateBarCount = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        // Calculate bar count based on width: each bar is 4px (w-1) + 4px gap = 8px total
        // Add some buffer for better visual
        const calculatedCount = Math.floor(containerWidth / 8);
        // Ensure minimum and maximum bounds
        const boundedCount = Math.max(12, Math.min(calculatedCount, 60));
        setBarCount(boundedCount);
      }
    };

    updateBarCount();

    // Add resize listener
    const resizeObserver = new ResizeObserver(updateBarCount);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Generate bar heights dynamically based on count
  const generateBarHeights = (count: number) => {
    const heights = [];
    for (let i = 0; i < count; i++) {
      // Generate varied heights between 20% and 95%
      const height = 20 + Math.random() * 75;
      heights.push(Math.round(height));
    }
    return heights;
  };

  const barHeights = generateBarHeights(barCount);

  return (
    <div
      ref={containerRef}
      className={clsx("flex items-center justify-between gap-1 z-0", className)}
    >
      {Array.from({ length: barCount }).map((_, i) => {
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
