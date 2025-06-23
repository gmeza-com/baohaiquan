"use client";

import clsx from "clsx";
import BlurEffect from "../common/BlurEffect";
import { IconCaretLeft } from "../Icon/light";
import DecorTitle from "./DecorTitle";
import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselApi,
} from "@/shadcn/ui/carousel";
import React from "react";
import NavButton from "./NavButton";
import { CategoryTree } from "@/type/category";
import TabButton from "./TabButton";
import { ArticleProps } from "@/type/article";
import Link from "next/link";

interface ShortBoxProps {
  categoryTree: CategoryTree;
  articles: ArticleProps[];
}

const ShortBox: React.FC<ShortBoxProps> = ({ categoryTree, articles }) => {
  const [api, setApi] = React.useState<CarouselApi>();

  return (
    <div className="home-container mx-auto">
      <div className="px-4 md:px-0 border-t border-blue-200 pt-9 pb-11 lg:pb-[71.8px] lg:pt-[60px]">
        <div className="flex items-center justify-between gap-4 md:gap-9">
          <DecorTitle title={categoryTree?.name ?? ""} className="shrink-0" />
          {categoryTree?.children?.length > 0 && (
            <div className="items-center gap-3 flex-1 overflow-x-auto hidden lg:flex">
              {categoryTree?.children.map((item) => (
                <TabButton
                  key={item?.id}
                  title={item?.name ?? ""}
                  link={`/danh-muc/${item?.slug}`}
                />
              ))}
            </div>
          )}
          <div className="items-center gap-2 hidden md:flex">
            <NavButton onClick={() => api?.scrollPrev()} />
            <NavButton isRight onClick={() => api?.scrollNext()} />
          </div>
        </div>
        <div className="flex gap-3 overflow-x-auto mt-5 -mx-4  px-4 md:hidden">
          {articles.map((article, index) => (
            <Card
              key={article?.id}
              title={article?.name ?? ""}
              image={article?.thumbnail ?? ""}
              className="basis-[40%]"
              slug={article?.slug ?? ""}
            />
          ))}
        </div>
        <Carousel className="mt-5 md:mt-10 hidden md:block" setApi={setApi}>
          <CarouselContent>
            {articles.map((article, index) => (
              <CarouselItem
                key={article?.id}
                className={clsx("basis-2/5 md:basis-1/4 lg:basis-1/5")}
              >
                <Card
                  title={article?.name ?? ""}
                  image={article?.thumbnail ?? ""}
                  slug={article?.slug ?? ""}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default ShortBox;

interface CardProps {
  title: string;
  image: string;
  className?: string;
  slug: string;
}

const Card: React.FC<CardProps> = ({ title, image, className, slug }) => {
  return (
    <Link href={`/tin-tuc/${slug}`}>
      <div
        className={clsx(
          "relative w-full aspect-[9/16] bg-blue-200 shrink-0 overflow-hidden rounded-[11.03px] @container/card",
          className
        )}
      >
        <img src={image} className="size-full object-cover" />
        <BlurEffect
          position="bottom"
          intensity={60}
          className="h-1/2 bg-gradient-to-b from-transparent from-0% via-[rgba(0,56,112,0.25)] via-50% to-[rgba(0,56,112,0.5)] to-100%"
        />
        <div className="absolute bottom-0 w-full z-20 px-2.5 pb-4 pt-2 @min-[187px]/card:px-5 @min-[187px]/card:pb-6 @min-[246px]/card:px-6 @min-[246px]/card:pb-7">
          <p className="text-white text-center text-base font-bold line-clamp-4 @min-[174px]/card:text-lg @min-[187px]/card:text-xl @min-[246px]/card:text-[1.375rem]">
            {title}
          </p>
        </div>
      </div>
    </Link>
  );
};
