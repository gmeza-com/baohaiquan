import DecorTitle from "./DecorTitle";
import HighlightArticleCard from "./HighlightArtileCard";
import HighlightArticleCarousel from "./HighlightArticleCarousel";

const HeadlineBlock: React.FC = () => {
  return (
    <div className="mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 xl:gap-12 lg:pb-10 xl:pt-7 md:pt-3">
        <div className="py-9 px-4 border-t border-stroke-light xl:p-0 xl:border-t-0 md:ps-0 md:pe-6">
          <DecorTitle title="tiêu điểm" />
          <div className="flex flex-col gap-3 mt-5">
            <div className="flex items-start flex-col gap-2.5 pb-5 border-b border-stroke-light border-dashed">
              <img
                src="https://picsum.photos/100/100"
                alt="test"
                className="w-full object-cover aspect-video rounded-[0.375rem]"
              />
              <p className="text-lg font-bold text-gray-900 tracking-[-1%] leading-[150%] line-clamp-2">
                Đoàn công tác số 24 hoàn thành chuyến công tác thăm Trường Sa và
                Nhà giàn DK1
              </p>
            </div>
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex items-start gap-5 border-b border-stroke-light border-dashed pb-4 last:border-b-0 lg:gap-3"
              >
                <img
                  src="https://picsum.photos/100/100"
                  alt="test"
                  className="w-36 object-cover aspect-video rounded-[0.375rem] shrink-0 lg:w-28"
                />
                <p className="flex-1 text-base lg:text-[0.9375rem] font-semibold text-gray-900 tracking-[-1%] leading-[150%] line-clamp-3">
                  Ban Thường vụ Đảng ủy Quân chủng thông qua công tác chuẩn bị
                  Đại hội đại biểu Đảng bộ Cục Chính trị
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="row-start-1 pb-9 md:col-span-2 xl:col-span-2 xl:col-start-2">
          <HighlightArticleCard className="md:hidden" />
          <div className="hidden md:block">
            <HighlightArticleCarousel />
          </div>
        </div>
        <div className="py-9 px-4 border-t border-stroke-light xl:p-0 xl:border-t-0 md:pe-0 md:ps-6">
          <DecorTitle title="Tin mới" />
          <div className="flex flex-col divide-y divide-stroke-light divide-dashed">
            {Array.from({ length: 6 })?.map((item, index) => (
              <div
                key={index}
                className="pt-3 pb-4 pe-1 flex items-center gap-7"
              >
                <span className="font-playfair-display text-7xl -mt-5">
                  <div className="w-8 flex justify-center items-center text-[#A5C5E6]">
                    {index + 1}
                  </div>
                </span>
                <p className="font-semibold text-gray-900 tracking-[-1%] leading-[150%] lg:text-xsm line-clamp-3">
                  50 năm Đại thắng mùa xuân 1975: Xây dựng quyết tâm cho bộ đội
                  trong trận quyết chiến chiến lược
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadlineBlock;
