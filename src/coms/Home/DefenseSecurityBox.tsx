import clsx from "clsx";
import DecorTitle from "./DecorTitle";
import ArticleCard, { ArticleCardProps } from "../common/ArticleCard";
import { CategoryTree } from "@/type/category";
import TabButton from "./TabButton";
import { ArticleProps } from "@/type/article";
import Link from "next/link";

interface DefenseSecurityBoxProps {
  categoryTree: CategoryTree;
  articles: ArticleProps[];
}

const DefenseSecurityBox: React.FC<DefenseSecurityBoxProps> = ({
  categoryTree,
  articles = [],
}) => {
  return (
    <div className="home-container mx-auto">
      <div className="px-4 md:px-0 py-9 lg:pt-[3.75rem] lg:pb-[6.25rem] border-t border-blue-200">
        <div className="flex items-center justify-between gap-4 md:gap-9">
          <DecorTitle title={categoryTree?.name ?? ""} />
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
        </div>
        {articles.length > 0 && (
          <div className="mt-5 lg:mt-8 xl:mt-10 flex flex-col gap-3 md:gap-6 xl:gap-12 md:grid md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-12 divide-y divide-blue-200 divide-dashed md:divide-none">
            <ArticleCard
              slug={articles?.[0]?.slug ?? ""}
              title={articles?.[0]?.name ?? ""}
              description={articles?.[0]?.description ?? ""}
              image={articles?.[0]?.thumbnail ?? ""}
              className="lg:col-span-3 xl:col-span-8"
            />
            <div className="flex flex-col gap-3 lg:col-span-2 xl:col-span-4">
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
        <img
          src={image}
          alt={title}
          className="w-[135px] aspect-video rounded-[6px] @min-[400px]/card:w-[128px] @min-[400px]/card:aspect-[128/96]"
        />
        <p className="hover:underline hover:text-blue-700 text-gray-900 text-base @min-[400px]/card:text-lg font-semibold leading-[150%] tracking-[-1%]">
          {title}
        </p>
      </div>
    </Link>
  );
};
