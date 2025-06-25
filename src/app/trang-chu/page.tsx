import DecorTitle from "@/coms/Home/DecorTitle";
import DefenseSecurityBox from "@/coms/Home/DefenseSecurityBox";
import HeadlineBlock from "@/coms/Home/HeadlineBlock";
import LinkedWebsiteBox from "@/coms/Home/LinkedWebsiteBox";
import MixNewsBox from "@/coms/Home/MixNewsBox";
import NavyMediaBox from "@/coms/Home/NavyMediaBox";
import NavyNewspaperBox from "@/coms/Home/NavyNewspaperBox";
import NavyTVBox from "@/coms/Home/NavyTVBox";
import ShortBox from "@/coms/Home/ShortBox";
import TrendingNewsBox from "@/coms/Home/TrendingNewsBox";
import { getCategoryTree } from "@/lib/utils";
import { Category } from "@/type/category";
import { Metadata } from "next";
import PostService from "@/service/post";
import { GalleryCategory } from "@/data/category";
import CategoryService from "@/service/category";
import Image from "next/image";

const HomePage = async () => {
  const [
    newestPosts,
    featuredPosts,
    mostViewedPosts,
    newestPosts2,
    galleryTV,
    hqVideo,
    categories,
    galleryCategories,
    hqNewsPaperContent,
  ] = await Promise.all([
    PostService.getNewestPosts(6),
    PostService.getFeaturedPosts(11),
    PostService.getMostViewedPosts(8),
    PostService.getNewestPosts(14, true),
    PostService.getGalleryCollection(GalleryCategory.HQ_TV, 5),
    PostService.getGalleryCollection(GalleryCategory.HQ_VIDEO, 3),
    CategoryService.getPostCategories(),
    CategoryService.getGalleryCategories(),
    PostService.getGalleryCollection(GalleryCategory.HQ_NEWS_PAPER, 1),
  ]);

  const hqMediaCategory = galleryCategories.find(
    (item) => item.id === GalleryCategory.HQ_VIDEO
  );

  const hqTvCategory = galleryCategories.find(
    (item) => item.id === GalleryCategory.HQ_TV
  );

  // Convert to tree structure
  const categoryTree = getCategoryTree(categories as Category[]);

  const categoriesData = await Promise.all(
    categoryTree?.map(async (item, index) => {
      const articles = await CategoryService.getPostsByCategory(
        item?.slug,
        0,
        index === 0 ? 10 : 4
      );
      return articles;
    })
  );

  return (
    <div>
      <HeadlineBlock newestPosts={newestPosts} featuredPosts={featuredPosts} />

      <div className="pb-12">
        <div className="container mx-auto">
          <img
            src="/images/home/hero-banner.webp"
            alt="banner"
            className="w-full max-w-[50rem] mx-auto"
            loading="lazy"
          />
        </div>
      </div>
      {/* Block 1 trong categoryTree */}
      <ShortBox
        categoryTree={categoryTree?.[0]}
        articles={categoriesData?.[0]}
      />
      <div className="pb-10 md:pb-[72px]">
        <div className="container mx-auto">
          <Image
            src="/images/home/hero-banner-2.webp"
            alt="banner"
            className="w-full md:rounded-[12px]"
            loading="lazy"
            width={1320}
            height={172}
          />
        </div>
      </div>
      {/* Block 2 trong categoryTree */}
      <DefenseSecurityBox
        categoryTree={categoryTree?.[1]}
        articles={categoriesData?.[1]}
      />

      {/* TODO: coming soon */}
      {/* <MediaBox /> */}

      <div className="container mx-auto">
        <div className="-m-4 md:m-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:gap-12 md:gap-x-6 md:gap-y-16 lg:pt-11 lg:pb-[5.25rem] md:border-t border-blue-200">
          <div className="px-4 pt-9 pb-5 md:p-0">
            <TrendingNewsBox posts={mostViewedPosts} />
          </div>
          <div className="md:col-span-2 md:row-start-1 lg:col-start-2 xl:col-start-2">
            <div className="px-4 py-9 md:p-0 border-t border-blue-200 md:border-none">
              <MixNewsBox posts={newestPosts2} />
            </div>
          </div>
          <div className="flex flex-col gap-12 px-4 py-9 md:p-0 border-t border-blue-200 md:border-none">
            {!!hqNewsPaperContent?.[0] && (
              <NavyNewspaperBox gallery={hqNewsPaperContent?.[0]} />
            )}

            <LinkedWebsiteBox />
            <img
              src="/images/home/100-nam.jpg"
              className="w-full"
              loading="lazy"
            />
            <img
              src="/images/home/cong-ty-xay-lap-thanh-an.jpg"
              className="w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <div className="py-5 md:p-0 border-t border-blue-200 md:border-0">
        <div className="container mx-auto">
          <div className="md:border-t md:border-blue-200 md:py-5  lg:pt-11 lg:pb-[5.25rem]">
            <DecorTitle
              title={hqMediaCategory?.name || "Hải quân Media"}
              link={`/gallery/collections/${hqMediaCategory?.slug}`}
            />
            <div className="mt-8 xl:mt-10 grid grid-cols-1 gap-6 md:grid-cols-5 xl:grid-cols-4 xl:gap-10">
              <NavyMediaBox
                className="md:col-span-3 xl:col-span-3"
                galleries={hqVideo}
              />
              <div className="md:col-span-2 xl:col-span-1">
                <img
                  src="/images/home/mb-ads.jpg"
                  alt="MB Ads"
                  className="w-full"
                  loading="lazy"
                />
                <img
                  src="/images/home/viettel-ads.jpg"
                  alt="Viettel Ads"
                  className="w-full mt-6"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Block 3 trong categoryTree */}
      <DefenseSecurityBox
        categoryTree={categoryTree?.[2]}
        articles={categoriesData?.[2]}
      />

      {/* Block 4 trong categoryTree */}
      <DefenseSecurityBox
        categoryTree={categoryTree?.[3]}
        articles={categoriesData?.[3]}
      />

      {/* TODO: coming soon */}
      {/* <PodcastBox /> */}

      {/* Block 5 trong categoryTree */}
      <DefenseSecurityBox
        categoryTree={categoryTree?.[4]}
        articles={categoriesData?.[4]}
      />

      {/* Block 6 trong categoryTree */}
      <DefenseSecurityBox
        categoryTree={categoryTree?.[5]}
        articles={categoriesData?.[5]}
      />

      <NavyTVBox
        className="mb-10"
        galleries={galleryTV}
        category={
          hqTvCategory ?? {
            name: "Truyền hình hải quân",
            slug: "truyen-hinh-hai-quan",
          }
        }
      />

      {/* Block 7 trong categoryTree */}
      {/* Block 8 trong categoryTree */}
      {/* Block 9 trong categoryTree */}
      {/* Block 10 trong categoryTree */}
      {/* Block 11 trong categoryTree */}
      {/* Block 12 trong categoryTree */}
      {/* Block 13 trong categoryTree */}
      {categoryTree?.slice(6).map((item, index) => (
        <DefenseSecurityBox
          key={item?.id}
          categoryTree={item}
          articles={categoriesData?.[6 + index]}
          hideBorder={index === 0}
        />
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
