import DecorTitle from "./DecorTitle";
import HighlightArticleCarousel from "./HighlightArticleCarousel";
import ArticleRankItem from "./ArticleRankItem";
import { ArticleProps, INewestPost } from "@/type/article";
import Link from "next/link";
import clsx from "clsx";

interface HeadlineBlockProps {
  newestPosts: INewestPost[];
  featuredPosts: ArticleProps[];
  className?: string;
  rightBlockClassName?: string;
}

const HeadlineBlock: React.FC<HeadlineBlockProps> = ({
  newestPosts,
  featuredPosts,
  className,
  rightBlockClassName,
}) => {
  const mainFeaturedPost = featuredPosts?.slice(0, 6);
  const otherFeaturedPosts = featuredPosts?.slice(6);
  const firstFeaturedPost = otherFeaturedPosts?.[0];

  return (
    <div className="container mx-auto">
      <div
        className={clsx(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-6 xl:gap-12 lg:pb-10 lg:pt-3 -m-4 md:m-0",
          className
        )}
      >
        <div
          className={clsx(
            "py-9 px-4 lg:p-0 border-t border-stroke-light lg:border-t-0 md:ps-0 md:pe-6",
            rightBlockClassName
          )}
        >
          <DecorTitle title="tiêu điểm" />
          <div className="flex flex-col gap-3 mt-5">
            <Link
              href={`/tin-tuc/${firstFeaturedPost?.slug}`}
              className="group flex items-start flex-col gap-2.5 pb-5 border-b border-stroke-light border-dashed"
            >
              <img
                src={firstFeaturedPost?.thumbnail}
                alt={firstFeaturedPost?.name}
                className="w-full object-cover aspect-video rounded-[0.375rem]"
                width={294}
                height={165}
              />
              <h5 className="group-hover:underline group-focus:text-blue-700 group-hover:text-blue-700 text-lg font-bold text-gray-900 tracking-[-1%] leading-[150%] line-clamp-2">
                {firstFeaturedPost?.name}
              </h5>
            </Link>
            {otherFeaturedPosts?.slice(1).map((item, index) => (
              <Link
                key={item?.id}
                href={`/tin-tuc/${item?.slug}`}
                className="group flex items-start gap-5 border-b border-stroke-light border-dashed pb-4 last:border-b-0 lg:gap-3"
              >
                <img
                  src={item?.thumbnail}
                  alt={item?.name}
                  className="w-36 object-cover aspect-video rounded-[0.375rem] shrink-0 lg:w-28"
                  width={120}
                  height={68}
                />
                <h6 className="group-hover:underline group-focus:text-blue-700 group-hover:text-blue-700 flex-1 text-base lg:text-[0.9375rem] font-semibold text-gray-900 tracking-[-1%] leading-[150%] line-clamp-3">
                  {item?.name}
                </h6>
              </Link>
            ))}
          </div>
        </div>
        <div className="row-start-1 pb-9 lg:pb-0  md:col-span-2  lg:col-start-2">
          <HighlightArticleCarousel posts={mainFeaturedPost} />
        </div>
        <div className="py-9 px-4 border-t border-stroke-light lg:p-0 lg:border-t-0 md:pe-0 md:ps-6">
          <DecorTitle title="Tin mới" />
          <ol className="flex flex-col divide-y divide-stroke-light divide-dashed">
            {newestPosts?.map((item, index) => (
              <ArticleRankItem
                key={index}
                number={index + 1}
                title={item?.name}
                slug={item?.slug}
              />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default HeadlineBlock;
