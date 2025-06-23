import ArticleCard, { ArticleCardProps } from "../common/ArticleCard";
import DecorTitle from "./DecorTitle";

const MediaBox = () => {
  return (
    <div className="home-container mx-auto mb-10 lg:mb-24">
      <div className="bg-branch-default py-9 px-4 lg:px-7 lg:pt-8 lg:pb-10 md:rounded-3xl">
        <DecorTitle title="Đa phương tiện" />
        <div className="mt-5 flex flex-col gap-5 md:grid md:grid-cols-2 lg:mt-10 xl:gap-12 ">
          <ArticleCard
            title="Khai mạc Hội nghị Cấp cao ASEAN - Hội đồng Hợp tác vùng Vịnh tại Malaysia"
            description="Trong khuôn khổ Hội nghị Cấp cao Hiệp hội các quốc gia Đông Nam Á (ASEAN) lần thứ 46, sáng 27/5, Hội nghị Cấp cao ASEAN - Hội đồng Hợp tác vùng Vịnh (GCC) lần thứ 2 đã khai mạc tại Trung tâm Hội nghị Kuala Lumpur của Malaysia."
            image="https://picsum.photos/500/300"
            className="border-b border-blue-200 border-dashed md:border-none"
          />
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 xl:gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <ArticleCompactVerticalCard
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

export default MediaBox;

type ArticleCompactVerticalCardProps = Pick<
  ArticleCardProps,
  "title" | "image" | "className"
>;

const ArticleCompactVerticalCard: React.FC<ArticleCompactVerticalCardProps> = ({
  title,
  image,
}) => {
  return (
    <div className="@container/card">
      <div className="flex flex-col gap-2.5">
        <img
          src={image}
          alt={title}
          className="w-full aspect-video rounded-[6px] object-cover"
        />
        <p className="text-gray-900 line-clamp-4 text-base @min-[250px]/card:text-lg font-semibold leading-[150%] tracking-[0%]">
          {title}
        </p>
      </div>
    </div>
  );
};
