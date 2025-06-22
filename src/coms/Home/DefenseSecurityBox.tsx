import clsx from "clsx";
import DecorTitle from "./DecorTitle";

const DefenseSecurityBox = () => {
  return (
    <div className="home-container mx-auto ">
      <div className="px-4 md:px-0 py-9 lg:pt-[3.75rem] lg:pb-[6.25rem] border-t border-blue-200">
        <DecorTitle title="Quốc phòng - An ninh" />
        <div className="mt-5 xl:mt-10 flex flex-col gap-3 md:gap-6 xl:gap-12 md:grid md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-12 divide-y divide-blue-200 divide-dashed md:divide-none">
          <MainArticleCard
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

interface ArticleCardProps {
  title: string;
  description: string;
  image: string;
  className?: string;
}

const MainArticleCard: React.FC<ArticleCardProps> = ({
  title,
  description,
  image,
  className,
}) => {
  return (
    <div className={clsx("@container/card", className)}>
      <div className="flex flex-col @min-[800px]/card:flex-row-reverse @min-[800px]/card:bg-blue-50 @min-[800px]/card:py-4 @min-[800px]/card:px-6 @min-[800px]/card:rounded-[12px] @min-[800px]/card:gap-7 pb-5">
        <img
          src={image}
          alt={title}
          className="w-full aspect-video object-cover rounded-[6px] @min-[800px]/card:aspect-[480/360] @min-[800px]/card:w-3/5 @min-[800px]/card:rounded-[4px]"
        />
        <div className="mt-4 @min-[800px]/card:mt-0 @min-[800px]/card:flex-1">
          <p className="text-gray-900 text-lg font-bold leading-[150%] tracking-[-1%] @min-[800px]/card:text-[1.375rem] @min-[800px]/card:leading-[140%]">
            {title}
          </p>
          <p className="mt-1.5 text-xsm font-normal text-gray-700 leading-[160%] tracking-[0%] @min-[800px]/card:mt-3">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

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
