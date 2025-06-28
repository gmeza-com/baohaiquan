"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/shadcn/ui/carousel";
import HighlightArticleCard from "./HighlightArtileCard";
import React, { useState } from "react";
import clsx from "clsx";
import { IconCaretRight } from "../Icon/light";
import { ArticleProps } from "@/type/article";
import CarouselNavButton from "./CarouselNavButton";

interface HighlightArticleCarouselProps {
  posts: ArticleProps[];
}

const HighlightArticleCarousel: React.FC<HighlightArticleCarouselProps> = ({
  posts,
}) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="pb-16 relative">
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {posts.map((item, index) => (
            <CarouselItem key={item?.id}>
              <HighlightArticleCard data={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute top-0 left-0 w-full aspect-video pointer-events-none hidden md:block">
        <CarouselNavButton
          onClick={() => api?.scrollPrev()}
          isLeft
          className="absolute top-1/2 left-3 -translate-y-1/2"
        />
        <CarouselNavButton
          onClick={() => api?.scrollNext()}
          className="absolute top-1/2 right-3 -translate-y-1/2"
        />
      </div>

      <div className="absolute bottom-5 left-0 w-full flex justify-center items-center gap-1.5 mt-4">
        {posts.map((item, index) => (
          <div
            key={item?.id}
            className={clsx(
              "rounded-full h-0.5 w-7",
              current === index + 1 ? "bg-blue-600" : "bg-blue-200"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default HighlightArticleCarousel;
