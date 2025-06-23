import clsx from "clsx";
import DecorTitle from "./DecorTitle";
import ArticleCard, { ArticleCardProps } from "../common/ArticleCard";
import { CategoryTree } from "@/type/category";
import TabButton from "./TabButton";

interface DefenseSecurityBoxProps {
  categoryTree: CategoryTree;
}

const DefenseSecurityBox: React.FC<DefenseSecurityBoxProps> = ({
  categoryTree,
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
        <div className="mt-5 lg:mt-8 xl:mt-10 flex flex-col gap-3 md:gap-6 xl:gap-12 md:grid md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-12 divide-y divide-blue-200 divide-dashed md:divide-none">
          <ArticleCard
            title="Khối thi đua số 2, Vùng 3: Hội nghị sơ kết công tác thi đua khen thưởng 6 tháng đầu năm 2025"
            description="Sáng 26/5, tại Lữ đoàn 172 (Đà Nẵng) khối thi đua số 2 (khối cấp trung, lữ đoàn và tương đương) Vùng 3 Hải quân tổ chức Hội nghị sơ kết công tác thi đua khen thưởng (TĐKT) và phong trào thi đua quyết thắng (TĐQT) 6 tháng đầu năm 2025."
            image="https://picsum.photos/500/300"
            className="lg:col-span-3 xl:col-span-8"
          />
          <div className="flex flex-col gap-3 lg:col-span-2 xl:col-span-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <ArticleCompactHorizontalCard
                key={index}
                title="Khối thi đua số 2, Vùng 3: Hội nghị sơ kết công tác thi đua khen thưởng 6 tháng đầu năm 2025"
                image="https://picsum.photos/500/300"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefenseSecurityBox;

type OtherArticleCardProps = Pick<
  ArticleCardProps,
  "title" | "image" | "className"
>;

const ArticleCompactHorizontalCard: React.FC<OtherArticleCardProps> = ({
  title,
  image,
  className,
}) => {
  return (
    <div className="@container/card border-b border-blue-200 border-dashed last:border-b-0">
      <div className={clsx("pr-1 pb-4 flex gap-5 items-start ", className)}>
        <img
          src={image}
          alt={title}
          className="w-[135px] aspect-video rounded-[6px] @min-[400px]/card:w-[128px] @min-[400px]/card:aspect-[128/96]"
        />
        <p className="text-gray-900 text-base @min-[400px]/card:text-lg font-semibold leading-[150%] tracking-[-1%]">
          {title}
        </p>
      </div>
    </div>
  );
};
