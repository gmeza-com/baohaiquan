import DecorTitle from "@/coms/Home/DecorTitle";
import DefenseSecurityBox from "@/coms/Home/DefenseSecurityBox";
import HeadlineBlock from "@/coms/Home/HeadlineBlock";
import LinkedWebsiteBox from "@/coms/Home/LinkedWebsiteBox";
import MediaBox from "@/coms/Home/MediaBox";
import MixNewsBox from "@/coms/Home/MixNewsBox";
import NavyMediaBox from "@/coms/Home/NavyMediaBox";
import NavyNewspaperBox from "@/coms/Home/NavyNewspaperBox";
import PodcastBox from "@/coms/Home/PodcastBox";
import ShortBox from "@/coms/Home/ShortBox";
import TrendingNewsBox from "@/coms/Home/TrendingNewsBox";
import { Metadata } from "next";

const HomePage = () => {
  return (
    <div className="container">
      <div>
        <HeadlineBlock />
        <div className="pt-4 pb-16 mx-auto">
          <img
            src="/images/home/hero-banner.webp"
            alt="banner"
            className="w-full max-w-[50rem] mx-auto"
          />
        </div>
        <ShortBox />
        <div className="mx-auto pb-10 md:pb-[72px]">
          <img
            src="/images/home/hero-banner-2.webp"
            alt="banner"
            className="w-full md:rounded-[12px]"
          />
        </div>
        <DefenseSecurityBox />
        <MediaBox />
        <div className="mx-auto md:pt-10 md:pb-10 xl:pb-24 xl:pt-[3.75rem] md:border-t border-blue-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:gap-12 md:gap-x-6 md:gap-y-16">
            <div className="border-t border-blue-200 md:border-none px-4 pt-9 pb-5 md:p-0">
              <TrendingNewsBox />
            </div>
            <div className="md:col-span-2 md:row-start-1 lg:col-start-2 xl:col-start-2">
              <div className="px-4 py-9 md:p-0 border-t border-blue-200 md:border-none">
                <MixNewsBox />
              </div>
            </div>
            <div className="flex flex-col gap-12 px-4 py-9 md:p-0 border-t border-blue-200 md:border-none">
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
        <div className="mx-auto py-9 xl:pt-14 xl:pb-24 border-t border-blue-200">
          <div className="px-4 md:p-0">
            <DecorTitle title="Hải quân Media" />
            <div className="mt-8 xl:mt-10 grid grid-cols-1 gap-6 md:grid-cols-5 xl:grid-cols-4 xl:gap-10">
              <NavyMediaBox className="md:col-span-3 xl:col-span-3" />
              <div className="md:col-span-2 xl:col-span-1">
                <img
                  src="/images/home/mb-ads.jpg"
                  alt="MB Ads"
                  className="w-full"
                />
                <img
                  src="/images/home/viettel-ads.jpg"
                  alt="Viettel Ads"
                  className="w-full mt-6"
                />
              </div>
            </div>
          </div>
        </div>
        <PodcastBox />
      </div>
      <ShortBox />
      <div className="container mx-auto pb-10 md:pb-[72px]">
        <img
          src="/images/home/hero-banner-2.webp"
          alt="banner"
          className="w-full md:rounded-[12px]"
        />
      </div>
      <DefenseSecurityBox />
      <MediaBox />
    </div>
  );
};

export default HomePage;

export const metadata: Metadata = {
  title: "Báo Hải Quân Việt Nam",
  description: "Chuyên Trang Báo Chính Thức Của Hải Quân Nhân Dân Việt Nam",
  icons: { icon: "/favicon.ico" },
};
