import { IGalleryCollection } from "@/type/article";
import DecorTitle from "./DecorTitle";
import dayjs from "dayjs";
import Link from "next/link";
import navigateService from "@/lib/router";
import clsx from "clsx";

type NavyNewspaperBoxProps = {
  gallery: IGalleryCollection;
  title?: React.ReactNode;
  linkClassName?: string;
  titleClassName?: string;
  imgClassName?: string;
  containerClassName?: string;
};

const NavyNewspaperBox: React.FC<NavyNewspaperBoxProps> = ({
  gallery,
  title,
  linkClassName,
  titleClassName,
  imgClassName,
  containerClassName,
}) => {
  return (
    <div className="">
      {title || (
        <DecorTitle
          title="đọc báo in"
          link={navigateService.getGalleryCollection("bao-in")}
        />
      )}
      <div
        className={clsx("@container/newspaper-box mt-5", containerClassName)}
      >
        <Link
          href={`${navigateService.getGalleryCollection("bao-in")}?newspaper=${
            gallery?.slug
          }`}
          className={clsx(
            "bg-blue-50 group px-3 pt-4 pb-3 rounded-[7px] grid grid-cols-1 gap-3 @min-[340px]/newspaper-box:grid-cols-2 @min-[340px]/newspaper-box:gap-6 @min-[340px]/newspaper-box:py-2 @min-[340px]/newspaper-box:ps-2 @min-[340px]/newspaper-box:pe-4",
            linkClassName
          )}
        >
          <div className="@min-[340px]/newspaper-box:col-start-2 @min-[340px]/newspaper-box:row-start-1 @min-[340px]/newspaper-box:flex @min-[340px]/newspaper-box:flex-col @min-[340px]/newspaper-box:justify-center">
            <h5
              className={clsx(
                "group-hover:underline text-[1.375rem] font-bold leading-[135%] tracking-[-1%] text-blue-700",
                titleClassName
              )}
            >
              {gallery?.name}
            </h5>
            <span className="text-gray-700 text-xsm font-normal leading-[160%] tracking-[0%] mt-1">
              Ngày {dayjs(gallery?.published_at).format("DD-MM-YYYY")}
            </span>
            <button className="hidden @min-[340px]/newspaper-box:block mt-4 bg-blue-700 text-white h-10 px-4 rounded-[10px] text-xsm font-semibold leading-[160%] tracking-[0%]">
              Đọc ngay
            </button>
          </div>
          <img
            src={gallery?.thumbnail}
            alt={gallery?.name}
            width={276}
            height={385}
            loading="lazy"
            className={clsx(
              "w-full bg-white rounded-[8px] border-blue-100 group-focus:scale-95 transition-transform border shadow-[0_4px_12px_rgba(0,71,141,0.06),_0_2px_4px_rgba(0,0,0,0.02)]",
              imgClassName
            )}
          />
        </Link>
      </div>
    </div>
  );
};

export default NavyNewspaperBox;
