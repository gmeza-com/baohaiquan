import DefenseSecurityBox from "@/coms/Home/DefenseSecurityBox";
import HeadlineBlock from "@/coms/Home/HeadlineBlock";
import LinkedWebsiteBox from "@/coms/Home/LinkedWebsiteBox";
import MediaBox from "@/coms/Home/MediaBox";
import MixNewsBox from "@/coms/Home/MixNewsBox";
import NavyNewspaperBox from "@/coms/Home/NavyNewspaperBox";
import ShortBox from "@/coms/Home/ShortBox";
import TrendingNewsBox from "@/coms/Home/TrendingNewsBox";
import { Metadata } from "next";

const HomePage = () => {
  return (
    <div className="">
      <div>
        <HeadlineBlock />
        <div className="home-container pt-4 pb-16 mx-auto">
          <img
            src="/images/home/hero-banner.webp"
            alt="banner"
            className="w-full max-w-[50rem] mx-auto"
          />
        </div>
        <ShortBox />
        <div className="home-container mx-auto pb-10 md:pb-[72px]">
          <img
            src="/images/home/hero-banner-2.webp"
            alt="banner"
            className="w-full md:rounded-[12px]"
          />
        </div>
        <DefenseSecurityBox />
        <MediaBox />
        <div className="home-container mx-auto md:pt-10 xl:pt-[3.75rem] md:border-t border-blue-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:gap-12 md:gap-x-6 md:gap-y-16">
            <div className="border-t border-blue-200 md:border-none px-4 pt-9 pb-5 md:p-0">
              <TrendingNewsBox />
            </div>
            <div className="md:col-span-2 md:row-start-1 lg:col-start-2 xl:col-start-2">
              <div className="px-4 py-9 md:p-0 border-t border-blue-200 md:border-none">
                <MixNewsBox />
              </div>
            </div>
            <div className="flex flex-col gap-12 px-4 pt-9 md:p-0 border-t border-blue-200 md:border-none">
              <NavyNewspaperBox />
              <LinkedWebsiteBox />
              <img src="/images/home/100-nam.jpg" className="w-full" />
              <img
                src="/images/home/cong-ty-xay-lap-thanh-an.jpg"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

export const metadata: Metadata = {
  title: "Báo Hải Quân Việt Nam",
  description: "Chuyên Trang Báo Chính Thức Của Hải Quân Nhân Dân Việt Nam",
};
