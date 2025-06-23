import DecorTitle from "@/coms/Home/DecorTitle";
import DefenseSecurityBox from "@/coms/Home/DefenseSecurityBox";
import HeadlineBlock from "@/coms/Home/HeadlineBlock";
import LinkedWebsiteBox from "@/coms/Home/LinkedWebsiteBox";
import MediaBox from "@/coms/Home/MediaBox";
import MixNewsBox from "@/coms/Home/MixNewsBox";
import NavyMediaBox from "@/coms/Home/NavyMediaBox";
import NavyNewspaperBox from "@/coms/Home/NavyNewspaperBox";
import NavyTVBox from "@/coms/Home/NavyTVBox";
import PodcastBox from "@/coms/Home/PodcastBox";
import ShortBox from "@/coms/Home/ShortBox";
import TrendingNewsBox from "@/coms/Home/TrendingNewsBox";
import { getCategoryTree } from "@/lib/utils";
import { Category } from "@/type/category";
import { Metadata } from "next";
import db from "@/lib/db";

const HomePage = async () => {
  const categories = await db("post_categories as pcs")
    .select("pcs.id", "pcl.name", "pcl.slug", "pcs.parent_id")
    .join("post_category_languages as pcl", "pcl.post_category_id", "pcs.id")
    .where("pcs.published", 1);

  // Convert to tree structure
  const categoryTree = getCategoryTree(categories as Category[]);

  return (
    <div>
      <HeadlineBlock />

      <div className="home-container mx-auto pt-4 pb-16">
        <img
          src="/images/home/hero-banner.webp"
          alt="banner"
          className="w-full max-w-[50rem] mx-auto"
        />
      </div>
      {/* Block 1 trong categoryTree */}
      <ShortBox categoryTree={categoryTree?.[0]} />
      <div className="home-container mx-auto pb-10 md:pb-[72px]">
        <img
          src="/images/home/hero-banner-2.webp"
          alt="banner"
          className="w-full md:rounded-[12px]"
        />
      </div>
      {/* Block 2 trong categoryTree */}
      <DefenseSecurityBox categoryTree={categoryTree?.[0]} />
      <MediaBox />
      <div className="home-container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:gap-12 md:gap-x-6 md:gap-y-16 md:pt-10 md:pb-10 xl:pb-24 xl:pt-[3.75rem] md:border-t border-blue-200">
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
      <div className="home-container mx-auto">
        <div className="px-4 md:px-0 py-9 xl:pt-14 xl:pb-24 border-t border-blue-200">
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
      {/* Block 3 trong categoryTree */}
      <DefenseSecurityBox categoryTree={categoryTree?.[2]} />

      {/* Block 4 trong categoryTree */}
      <DefenseSecurityBox categoryTree={categoryTree?.[3]} />

      <PodcastBox />
      {/* Block 5 trong categoryTree */}
      <DefenseSecurityBox categoryTree={categoryTree?.[4]} />

      {/* Block 6 trong categoryTree */}
      <DefenseSecurityBox categoryTree={categoryTree?.[5]} />

      <NavyTVBox />

      {/* Block 7 trong categoryTree */}
      {/* Block 8 trong categoryTree */}
      {/* Block 9 trong categoryTree */}
      {/* Block 10 trong categoryTree */}
      {/* Block 11 trong categoryTree */}
      {/* Block 12 trong categoryTree */}
      {/* Block 13 trong categoryTree */}
      {categoryTree?.slice(6).map((item) => (
        <DefenseSecurityBox key={item?.id} categoryTree={item} />
      ))}
    </div>
  );
};

export default HomePage;

export const metadata: Metadata = {
  title: "Báo Hải Quân Việt Nam",
  description: "Chuyên Trang Báo Chính Thức Của Hải Quân Nhân Dân Việt Nam",
  icons: { icon: "/favicon.ico" },
};
