import clsx from "clsx";
import { IconPlay2 } from "../Icon/fill";
import DecorTitle from "./DecorTitle";

const NavyTVBox = () => {
  return (
    <div className="bg-blue-700">
      <div className="home-container mx-auto pt-9 pb-11 xl:pt-[3.75rem] xl:pb-[5rem] px-4 md:px-0">
        <DecorTitle title="Truyền hình hải quân" textClassName="text-white" />
        <div className="mt-5 md:mt-8 xl:mt-10 md:grid md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-8 md:gap-5 xl:gap-12">
          <div className="lg:col-span-3 xl:col-span-5 @container/main-video">
            <div className="relative w-full aspect-video overflow-hidden rounded-[6px]">
              <img
                src="https://picsum.photos/1920/1080"
                className="w-full h-full object-cover"
              />

              <div className="cursor-pointer absolute size-[5.5rem] rounded-full bg-white/25 backdrop-blur-2xl top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center">
                <IconPlay2 size={34} className="text-white" />
              </div>
            </div>
            <p className="text-white text-lg font-bold leading-[150%] tracking-[-1%] mt-4 @min-[700px]/main-video:text-[2rem] @min-[700px]/main-video:mt-5">
              Cán bộ, chiến sĩ Lữ đoàn 172 hướng về ngày thành lập Hải quân nhân
              dân Việt Nam
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-blue-400 border-dashed md:border-t-0 md:mt-0 md:pt-0 lg:col-span-2 xl:col-span-3">
            <div className="flex flex-col gap-3 xl:gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className={clsx(
                    "@container/video-item w-full flex gap-5 pt-3 border-t border-blue-400 border-dashed first:border-t-0 first:pt-0"
                  )}
                >
                  <div className="relative shrink-0">
                    <img
                      src="https://picsum.photos/1920/1080"
                      className="w-[133px] aspect-[133/100] object-cover rounded-[6px]"
                    />
                    <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 size-12 rounded-full bg-white/25 backdrop-blur-2xl flex items-center justify-center">
                      <IconPlay2 size={19} className="text-white" />
                    </div>
                  </div>

                  <p className="@min-[400px]/video-item:text-lg flex-1 text-white font-semibold leading-[150%] tracking-[0%]">
                    Vùng 3-Ban Tuyên giáo và Dân vận 6 tỉnh, thành phố: Triển
                    khai kế hoạch
                  </p>
                </div>
              ))}
            </div>

            <button className="h-12 w-full mt-6 rounded-[10px] bg-white/10 text-white font-semibold leading-[160%] tracking-[0%]">
              Xem thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavyTVBox;
