import HeadlineBlock from "@/coms/Home/HeadlineBlock";
import ShortBox from "@/coms/Home/ShortBox";
import { Metadata } from "next";

const HomePage = () => {
  return (
    <div className="">
      <div>
        <HeadlineBlock />
        <div className="home-container hidden md:block !pt-4 !pb-16 mx-auto">
          <img
            src="/images/home/hero-banner.webp"
            alt="banner"
            className="w-full max-w-[50rem] mx-auto"
          />
        </div>
        <ShortBox />
      </div>
    </div>
  );
};

export default HomePage;

export const metadata: Metadata = {
  title: "Báo Hải Quân Việt Nam",
  description: "Chuyên Trang Báo Chính Thức Của Hải Quân Nhân Dân Việt Nam",
};
