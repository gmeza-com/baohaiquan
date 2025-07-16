import clsx from "clsx";
import { IconPlay2 } from "../Icon/fill";
import DecorTitle from "./DecorTitle";
import VideoPlayer from "./VideoPlayer";
import Image from "next/image";
import Link from "next/link";
import { Category } from "@/type/category";
import navigateService from "@/lib/router";

interface NavyTVBoxProps {
  className?: string;
  galleries: any[];
  category: Pick<Category, "slug" | "name">;
}

const NavyTVBox: React.FC<NavyTVBoxProps> = ({
  className,
  galleries,
  category,
}) => {
  const firstGallery = galleries?.[0];
  const otherGalleries = galleries?.slice(1);

  return (
    <div className={clsx("bg-blue-700", className)}>
      <div className="container mx-auto">
        <div className="pt-5 pb-7 xl:pt-11 xl:pb-16">
          <DecorTitle
            title={category?.name || "Truyền hình hải quân"}
            textClassName="text-white"
            link={navigateService.getGalleryCollection(category?.slug)}
          />
          <div className="mt-5 md:mt-8 xl:mt-10 md:grid md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-8 md:gap-5 xl:gap-12">
            <div className="lg:col-span-3 xl:col-span-5 @container/main-video">
              <VideoPlayer
                url={firstGallery?.content}
                thumbnail={firstGallery?.thumbnail}
                className="rounded-[6px]"
              />

              <div className="mt-4 @min-[700px]/main-video:mt-5">
                <Link
                  href={navigateService.getGalleryDetails(category?.slug, firstGallery?.slug)}
                  className="text-white hover:underline text-lg font-bold leading-[150%] tracking-[-1%] @min-[700px]/main-video:text-[2rem]"
                >
                  {firstGallery?.name}
                </Link>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-blue-400 border-dashed md:border-t-0 md:mt-0 md:pt-0 lg:col-span-2 xl:col-span-3">
              <div className="flex flex-col gap-3 xl:gap-4">
                {otherGalleries.map((item, index) => (
                  <Link
                    href={navigateService.getGalleryDetails(category?.slug, item?.slug)}
                    key={index}
                    className={clsx(
                      "@container/video-item group w-full flex gap-5 pt-3 border-t border-blue-400 border-dashed first:border-t-0 first:pt-0"
                    )}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={item?.thumbnail}
                        alt={item?.name}
                        width={128}
                        height={96}
                        className="w-[133px] aspect-[133/100] object-cover rounded-[6px]"
                        loading="lazy"
                      />
                      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 size-12 rounded-full bg-white/25 backdrop-blur-2xl flex items-center justify-center">
                        <IconPlay2 size={19} className="text-white" />
                      </div>
                    </div>

                    <h6 className="group-hover:underline @min-[400px]/video-item:text-lg flex-1 text-white font-semibold leading-[150%] tracking-[0%]">
                      {item?.name}
                    </h6>
                  </Link>
                ))}
              </div>

              <Link
                href={navigateService.getGalleryCollection(
                  "truyen-hinh-hai-quan"
                )}
                passHref
              >
                <button className="h-12 w-full mt-6 rounded-[10px] bg-white/10 text-white font-semibold leading-[160%] tracking-[0%]">
                  Xem thêm
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavyTVBox;
