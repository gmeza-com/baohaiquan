import DefenseSecurityBox from "@/coms/Home/DefenseSecurityBox";
import HeadlineBlock from "@/coms/Home/HeadlineBlock";
import ShortBox from "@/coms/Home/ShortBox";
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
      </div>
    </div>
  );
};

export default HomePage;

export const metadata: Metadata = {
  title: "Báo Hải Quân Việt Nam",
  description: "Chuyên Trang Báo Chính Thức Của Hải Quân Nhân Dân Việt Nam",
};
