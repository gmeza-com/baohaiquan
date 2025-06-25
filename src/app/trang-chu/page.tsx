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
import PostService from "@/service/post";
import { GalleryCategory } from "@/data/category";
import CategoryService from "@/service/category";

const getArticleData = async (categoryId: number, limit: number) => {
  return db("posts as p")
    .join("post_languages as pl", "p.id", "pl.post_id")
    .join("post_category as pc", "p.id", "pc.post_id")
    .join("users as u", "p.user_id", "u.id")
    .select(
      "p.id",
      "pl.slug",
      "pl.name",
      "pl.description",
      "pl.tags",
      "p.thumbnail",
      "p.featured",
      "p.published",
      "p.published_at",
      "p.created_at",
      "p.updated_at",
      "p.featured_started_at",
      "p.featured_ended_at",
      "p.user_id as author_id",
      "u.name as author_name"
    )
    .where("pc.post_category_id", categoryId)
    .andWhere("p.featured", 1)
    .andWhere("p.published", 3)
    .andWhere("p.published_at", "<=", new Date().toISOString())
    .andWhere("p.hide", 0)
    .andWhere("pl.locale", "vi")
    .orderBy("p.updated_at", "desc")
    .offset(0)
    .limit(limit);
};

const HomePage = async () => {
  const newestPosts = await PostService.getNewestPosts(6);

  const featuredPosts = await PostService.getFeaturedPosts(11);

  const mostViewedPosts = await PostService.getMostViewedPosts(8);

  const newestPosts2 = await PostService.getNewestPosts(14, true);

  const galleryTV = await PostService.getGalleryCollection(
    GalleryCategory.HQ_TV,
    5
  );
  const hqVideo = await PostService.getGalleryCollection(
    GalleryCategory.HQ_VIDEO,
    3
  );

  const categories = await CategoryService.getPostCategories();
  const galleryCategories = await CategoryService.getGalleryCategories();

  const hqMediaCategory = galleryCategories.find(
    (item) => item.id === GalleryCategory.HQ_VIDEO
  );

  const hqTvCategory = galleryCategories.find(
    (item) => item.id === GalleryCategory.HQ_TV
  );

  // Convert to tree structure
  const categoryTree = getCategoryTree(categories as Category[]);

  const firstData = await getArticleData(categoryTree?.[0]?.id, 10);

  const categoriesData = await Promise.all(
    categoryTree?.slice(1)?.map(async (item) => {
      const articles = await getArticleData(item?.id, 4);
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
          />
        </div>
      </div>
      {/* Block 1 trong categoryTree */}
      <ShortBox categoryTree={categoryTree?.[0]} articles={firstData} />
      <div className="pb-10 md:pb-[72px]">
        <div className="container mx-auto">
          <img
            src="/images/home/hero-banner-2.webp"
            alt="banner"
            className="w-full md:rounded-[12px]"
          />
        </div>
      </div>
      {/* Block 2 trong categoryTree */}
      <DefenseSecurityBox
        categoryTree={categoryTree?.[0]}
        articles={categoriesData?.[0]}
      />
      <MediaBox />
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
      </div>
      {/* Block 3 trong categoryTree */}
      <DefenseSecurityBox
        categoryTree={categoryTree?.[2]}
        articles={categoriesData?.[1]}
      />

      {/* Block 4 trong categoryTree */}
      <DefenseSecurityBox
        categoryTree={categoryTree?.[3]}
        articles={categoriesData?.[2]}
      />

      <PodcastBox />
      {/* Block 5 trong categoryTree */}
      <DefenseSecurityBox
        categoryTree={categoryTree?.[4]}
        articles={categoriesData?.[3]}
      />

      {/* Block 6 trong categoryTree */}
      <DefenseSecurityBox
        categoryTree={categoryTree?.[5]}
        articles={categoriesData?.[4]}
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
          articles={categoriesData?.[5 + index]}
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
