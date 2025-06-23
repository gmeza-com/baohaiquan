import DecorTitle from "./DecorTitle";

const NavyNewspaperBox = () => {
  return (
    <div className="">
      <DecorTitle title="đọc báo in" />
      <div className="@container/newspaper-box mt-5">
        <div className="bg-blue-50 px-3 pt-4 pb-3 rounded-[7px] grid grid-cols-1 gap-3 @min-[340px]/newspaper-box:grid-cols-2 @min-[340px]/newspaper-box:gap-6 @min-[340px]/newspaper-box:py-2 @min-[340px]/newspaper-box:ps-2 @min-[340px]/newspaper-box:pe-4">
          <div className="@min-[340px]/newspaper-box:col-start-2 @min-[340px]/newspaper-box:row-start-1 @min-[340px]/newspaper-box:flex @min-[340px]/newspaper-box:flex-col @min-[340px]/newspaper-box:justify-center">
            <p className="text-[1.375rem] font-bold leading-[135%] tracking-[-1%] text-blue-700">
              Báo Hải Quân Việt Nam Số 1728
            </p>
            <p className="text-gray-700 text-xsm font-normal leading-[160%] tracking-[0%] mt-1">
              Ngày 28-05-2025
            </p>
            <button className="hidden @min-[340px]/newspaper-box:block mt-4 bg-blue-700 text-white h-10 px-4 rounded-[10px] text-xsm font-semibold leading-[160%] tracking-[0%]">
              Đọc ngay
            </button>
          </div>
          <div className="w-full aspect-[3/4] bg-white rounded-[8px] border-blue-100 border shadow-[0_4px_12px_rgba(0,71,141,0.06),_0_2px_4px_rgba(0,0,0,0.02)]" />
        </div>
      </div>
    </div>
  );
};

export default NavyNewspaperBox;
