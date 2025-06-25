import clsx from "clsx";
import DecorTitle from "./DecorTitle";
import ArticleCard, { ArticleCardProps } from "../common/ArticleCard";
import { CategoryTree } from "@/type/category";
import { ArticleProps } from "@/type/article";
import Link from "next/link";
import SubCategoryTab from "./SubCategoryTab";
import Image from "next/image";

interface DefenseSecurityBoxProps {
  categoryTree: CategoryTree;
  articles: ArticleProps[];
  hideBorder?: boolean;
}

const DefenseSecurityBox: React.FC<DefenseSecurityBoxProps> = ({
  categoryTree,
  articles = [],
  hideBorder = false,
}) => {
  if (articles?.length <= 0) return null;

  return (
    <div
      className={clsx(
        "py-5 md:py-0 ",
        !hideBorder && "border-t border-blue-200 md:border-0"
      )}
    >
      <div className="container mx-auto">
        <div
          className={clsx(
            "md:py-5 lg:pt-11 lg:pb-[5.25rem]",
            !hideBorder && "md:border-t md:border-blue-200"
          )}
        >
          <div className="flex md:items-center justify-between gap-4 md:gap-9 flex-col md:flex-row">
            <DecorTitle
              title={categoryTree?.name ?? ""}
              link={`/danh-muc/${categoryTree?.slug}`}
            />
            <SubCategoryTab categoryTrees={categoryTree?.children ?? []} />
          </div>
          {articles.length > 0 && (
            <div className="mt-5 lg:mt-8 xl:mt-10 flex flex-col gap-3 md:gap-6 xl:gap-12 md:grid md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-8 divide-y divide-blue-200 divide-dashed md:divide-none">
              <ArticleCard
                slug={articles?.[0]?.slug ?? ""}
                title={articles?.[0]?.name ?? ""}
                description={articles?.[0]?.description ?? ""}
                image={articles?.[0]?.thumbnail ?? ""}
                className="lg:col-span-3 xl:col-span-5"
              />
              <div className="flex flex-col gap-3 lg:col-span-2 xl:col-span-3">
                {articles?.slice(1).map((article, index) => (
                  <ArticleCompactHorizontalCard
                    key={article?.id}
                    slug={article?.slug ?? ""}
                    title={article?.name ?? ""}
                    image={article?.thumbnail ?? ""}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DefenseSecurityBox;

type OtherArticleCardProps = Pick<
  ArticleCardProps,
  "title" | "image" | "className" | "slug"
>;

const ArticleCompactHorizontalCard: React.FC<OtherArticleCardProps> = ({
  title,
  image,
  className,
  slug,
}) => {
  return (
    <Link
      href={`/tin-tuc/${slug}`}
      className="@container/card border-b border-blue-200 border-dashed last:border-b-0 cursor-pointer"
    >
      <div className={clsx("pr-1 pb-4 flex gap-5 items-start ", className)}>
        <Image
          src={image}
          alt={title}
          className="w-[135px] aspect-video rounded-[6px] @min-[400px]/card:w-[128px] @min-[400px]/card:aspect-[128/96]"
          width={128}
          height={96}
          loading="lazy"
        />
        <p className="hover:underline hover:text-blue-700 text-gray-900 text-base @min-[400px]/card:text-lg font-semibold leading-[150%] tracking-[-1%]">
          {title}
        </p>
      </div>
    </Link>
  );
};
