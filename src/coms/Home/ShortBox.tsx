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
import { ArticleProps } from "@/type/article";
import Link from "next/link";
import SubCategoryTab from "./SubCategoryTab";
import Image from "next/image";
import CarouselNavButton from "./CarouselNavButton";

interface ShortBoxProps {
  categoryTree: CategoryTree;
  articles: ArticleProps[];
  className?: string;
  innerClassName?: string;
}

const ShortBox: React.FC<ShortBoxProps> = ({
  categoryTree,
  articles,
  className,
  innerClassName,
}) => {
  const [api, setApi] = React.useState<CarouselApi>();

  return (
    <div
      className={clsx(
        "border-t border-blue-200 md:border-0 pt-5 md:py-0",
        className
      )}
    >
      <div className="container mx-auto">
        <div
          className={clsx(
            "md:border-t md:border-blue-200 md:pt-5 lg:pt-11",
            innerClassName
          )}
        >
          <div className="flex md:items-center justify-between gap-4 md:gap-9 flex-col md:flex-row">
            <DecorTitle
              title={categoryTree?.name ?? ""}
              className="shrink-0"
              link={`/danh-muc/${categoryTree?.slug}`}
            />
            <SubCategoryTab categoryTrees={categoryTree?.children ?? []} />
          </div>
          <div className="flex gap-3 overflow-x-auto mt-5 -mx-4  px-4 md:hidden">
            {articles.map((article, index) => (
              <Card
                key={article?.id}
                title={article?.name ?? ""}
                image={
                  (article?.thumbnail_vertical || article?.thumbnail) ?? ""
                }
                className="basis-[40%] shrink-0"
                slug={article?.slug ?? ""}
              />
            ))}
          </div>

          <Carousel
            className="mt-5 md:mt-10 hidden md:block relative"
            setApi={setApi}
          >
            <CarouselContent>
              {articles.map((article, index) => (
                <CarouselItem
                  key={article?.id}
                  className={clsx("basis-2/5 md:basis-1/4 lg:basis-1/5 w-full")}
                >
                  <Card
                    title={article?.name ?? ""}
                    image={
                      (article?.thumbnail_vertical || article?.thumbnail) ?? ""
                    }
                    slug={article?.slug ?? ""}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute inset-0 items-center gap-2 hidden md:flex justify-between px-4 pointer-events-none">
              <CarouselNavButton isLeft onClick={() => api?.scrollPrev()} />
              <CarouselNavButton onClick={() => api?.scrollNext()} />
            </div>
          </Carousel>
        </div>
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
    <Link href={`/tin-tuc/${slug}`} className={clsx("w-full group", className)}>
      <div
        className={clsx(
          "relative bg-blue-200 overflow-hidden rounded-[11.03px] @container/card"
        )}
      >
        <img
          src={image}
          className="size-full aspect-[9/16] object-cover group-focus:scale-110 group-hover:scale-110 transition-transform duration-300"
          alt={title}
          width={251}
          height={435}
          loading="lazy"
        />
        <BlurEffect
          position="bottom"
          intensity={60}
          className="h-1/2 bg-gradient-to-b from-transparent from-0% via-[rgba(0,56,112,0.25)] via-50% to-[rgba(0,56,112,0.5)] to-100%"
        />
        <div className="absolute bottom-0 w-full z-20 px-2.5 pb-4 pt-2 @min-[187px]/card:px-5 @min-[187px]/card:pb-6 @min-[246px]/card:px-6 @min-[246px]/card:pb-7">
          <p className="text-white text-center group-focus:underline text-base font-bold line-clamp-4 @min-[174px]/card:text-lg @min-[187px]/card:text-xl @min-[246px]/card:text-[1.375rem]">
            {title}
          </p>
        </div>
      </div>
    </Link>
  );
};
