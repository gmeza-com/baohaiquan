import Link from "next/link";
import ArticleCard, { ArticleCardProps } from "../common/ArticleCard";
import DecorTitle from "./DecorTitle";
import { IMediaBox } from "@/type/article";
import navigateService from "@/lib/router";
import { useCallback } from "react";
import clsx from "clsx";
import { Category } from "@/type/category";

interface MediaBoxProps {
  data: IMediaBox[];
  className?: string;
  mediaCatList: Omit<Category, "description" | "parent_id">[];
}

const MediaBox: React.FC<MediaBoxProps> = ({
  data,
  className,
  mediaCatList,
}) => {
  const firstItem = data?.[0];
  const restItems = data?.slice(1);

  const getHref = useCallback((article: IMediaBox) => {
    return navigateService.getGalleryDetails(
      article?.category_slug,
      article?.slug
    );
  }, []);

  return (
    <div className={clsx("", className)}>
      <div className="container mx-auto">
        <div className="bg-branch-default py-9 px-4 lg:px-7 lg:pt-8 lg:pb-10 md:rounded-3xl -m-4 md:m-0">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4 lg:gap-10">
            <DecorTitle title="Đa phương tiện" link="/da-phuong-tien" />

            <ul className="flex items-center gap-4 lg:gap-5 divide-x divide-blue-200 overflow-x-auto no-scrollbar">
              {mediaCatList.map((item) => (
                <li
                  key={item?.id}
                  className="text-nowrap pe-4 lg:pe-5 lg:text-lg font-semibold"
                >
                  <Link
                    href={navigateService.getGalleryCollection(item?.slug)}
                    className="focus:underline text-blue-700"
                  >
                    {item?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-5 flex flex-col gap-5 md:grid md:grid-cols-2 lg:mt-10 xl:gap-12 ">
            <ArticleCard
              href={getHref(firstItem)}
              title={firstItem?.name}
              description={firstItem?.description}
              image={firstItem?.thumbnail}
              className="border-b border-blue-200 border-dashed md:border-none"
              label={firstItem?.category_name}
            />
            <div className="w-full h-full overflow-hidden relative">
              <ul className="grid grid-cols-2 gap-x-4 gap-y-6 xl:gap-6 custom-scrollbar absolute w-full overflow-y-auto h-full">
                {restItems.map((article) => {
                  const href = getHref(article);

                  return (
                    <ArticleCompactVerticalCard
                      key={article?.id}
                      title={article?.name}
                      image={article?.thumbnail}
                      href={href}
                      label={article?.category_name}
                    />
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaBox;

type ArticleCompactVerticalCardProps = Pick<
  ArticleCardProps,
  "title" | "image" | "className" | "href"
> & {
  label?: string;
};

const ArticleCompactVerticalCard: React.FC<ArticleCompactVerticalCardProps> = ({
  title,
  image,
  href,
  label,
}) => {
  return (
    <Link href={href} className="group">
      <div className="@container/card">
        <div className="flex flex-col gap-2.5">
          <div className="relative rounded-[6px] overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full aspect-video  object-cover"
              width={290}
              height={163}
              loading="lazy"
            />
            {label && (
              <div className="absolute bottom-0 left-0 px-4 py-1.5 text-sm @min-[215px]/card:text-base @min-[275px]/card:text-xl font-bold font-playfair-display text-white bg-blue-900/40 rounded-tr-[12px] backdrop-blur-xl leading-[140%] tracking-[0%]">
                {label}
              </div>
            )}
          </div>

          <h6 className="text-gray-900 group-focus:text-blue-700 group-active:text-blue-700 line-clamp-4 text-base @min-[250px]/card:text-lg font-semibold leading-[150%] tracking-[0%]">
            {title}
          </h6>
        </div>
      </div>
    </Link>
  );
};
