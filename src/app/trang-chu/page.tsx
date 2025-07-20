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
import PodcastBox from "@/coms/Home/PodcastBox";
import navigateService from "@/lib/router";
import MediaBox from "@/coms/Home/MediaBox";
import ChuChayTrangChu from "@/coms/Home/ChuChayTrangChu";
import QuangCaoCotBen from "@/coms/Home/QuangCaoCotBen";
import QuangCaoChenGiua from "@/coms/Home/QuangCaoChenGiua";
import WidgetService from "@/service/widget";
import OptionService from "@/service/options";
import clsx from "clsx";

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
    hqPodcast,
    mediaBox,
    publishedWidgets,
  ] = await Promise.all([
    PostService.getNewestPosts(6),
    PostService.getFeaturedPosts(10),
    PostService.getMostViewedPosts(8),
    PostService.getNewestPosts(14, true),
    PostService.getGalleryCollection(GalleryCategory.HQ_TV, 5),
    PostService.getGalleryCollection(GalleryCategory.HQ_VIDEO, 3),
    CategoryService.getPostCategories(),
    CategoryService.getGalleryCategories(),
    PostService.getGalleryCollection(GalleryCategory.HQ_NEWS_PAPER, 1),
    PostService.getGalleryCollection(GalleryCategory.HQ_PODCAST, 8),
    PostService.getMediaBox(13),
    WidgetService.getPublishedWidget(),
  ]);

  // increase site_view when access to this page
  OptionService.increaseSiteView();

  const hqMediaCategory = galleryCategories.find(
    (item) => item.id === GalleryCategory.HQ_VIDEO
  );

  const hqTvCategory = galleryCategories.find(
    (item) => item.id === GalleryCategory.HQ_TV
  );

  const hqPodcastCategory = galleryCategories.find(
    (item) => item.id === GalleryCategory.HQ_PODCAST
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

  const haveMiddleAds1 = publishedWidgets?.some(
    (item) => item.slug === `quang-cao-chen-giua-${1}`
  );

  const haveMiddleAds2 = publishedWidgets?.some(
    (item) => item.slug === `quang-cao-chen-giua-${2}`
  );

  return (
    <div>
      {publishedWidgets?.some((item) => item.slug === "homepage-banner") && (
        <ChuChayTrangChu />
      )}

      <HeadlineBlock
        className={clsx(haveMiddleAds1 && "pb-0 lg:!pb-0")}
        rightBlockClassName={clsx(haveMiddleAds1 && "pb-0")}
        newestPosts={newestPosts}
        featuredPosts={featuredPosts}
      />

      {haveMiddleAds1 && <QuangCaoChenGiua index={1} />}

      {/* Block 1 trong categoryTree */}
      <ShortBox
        categoryTree={categoryTree?.[0]}
        articles={categoriesData?.[0]}
        innerClassName={clsx(haveMiddleAds2 && "!pb-0")}
      />

      {haveMiddleAds2 && <QuangCaoChenGiua index={2} />}

      {/* Block 2 trong categoryTree */}
      <DefenseSecurityBox
        categoryTree={categoryTree?.[1]}
        articles={categoriesData?.[1]}
      />

      {publishedWidgets?.some(
        (item) => item.slug === `quang-cao-chen-giua-${3}`
      ) && <QuangCaoChenGiua index={3} />}

      {/* TODO: coming soon */}
      <MediaBox data={mediaBox} />

      {publishedWidgets?.some(
        (item) => item.slug === `quang-cao-chen-giua-${4}`
      ) && <QuangCaoChenGiua index={4} />}

      <div className="container mx-auto">
        <div className="-m-4 md:m-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:gap-12 md:gap-x-6 md:gap-y-16 md:py-5 lg:pt-11 lg:pb-[5.25rem] md:border-t border-blue-200">
          <div className="px-4 pt-9 pb-5 md:p-0 md:sticky lg:top-20 md:top-[5.375rem] md:self-start">
            <TrendingNewsBox posts={mostViewedPosts} />
          </div>
          <div className="md:col-span-2 md:row-start-1 lg:col-start-2 xl:col-start-2">
            <div className="px-4 py-9 md:p-0 border-t border-blue-200 md:border-none">
              <MixNewsBox posts={newestPosts2} />
            </div>
          </div>
          <div className="flex flex-col gap-12 px-4 py-9 md:p-0 border-t border-blue-200 md:border-none md:sticky lg:top-20 md:top-[5.375rem] md:self-start">
            {!!hqNewsPaperContent?.[0] && (
              <NavyNewspaperBox gallery={hqNewsPaperContent?.[0]} />
            )}

            <LinkedWebsiteBox />
            <QuangCaoCotBen slug="quang-cao-cot-ben-1" />
          </div>
        </div>
      </div>

      {publishedWidgets?.some(
        (item) => item.slug === `quang-cao-chen-giua-${5}`
      ) && <QuangCaoChenGiua index={5} />}

      <div className="py-5 md:p-0 border-t border-blue-200 md:border-0">
        <div className="container mx-auto">
          <div className="md:border-t md:border-blue-200 md:py-5  lg:pt-11 lg:pb-[5.25rem]">
            <DecorTitle
              title={hqMediaCategory?.name || "Hải quân Media"}
              link={navigateService.getGalleryCollection(
                hqMediaCategory?.slug ?? ""
              )}
            />
            <div className="mt-8 xl:mt-10 grid grid-cols-1 gap-6 md:grid-cols-5 xl:grid-cols-4 xl:gap-10">
              <NavyMediaBox
                className="md:col-span-3 xl:col-span-3"
                galleries={hqVideo}
              />
              <div className="md:col-span-2 xl:col-span-1">
                <QuangCaoCotBen slug="quang-cao-cot-ben-2" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {publishedWidgets?.some(
        (item) => item.slug === `quang-cao-chen-giua-${6}`
      ) && <QuangCaoChenGiua index={6} />}

      {/* Block 3 trong categoryTree */}
      <DefenseSecurityBox
        categoryTree={categoryTree?.[2]}
        articles={categoriesData?.[2]}
      />

      {publishedWidgets?.some(
        (item) => item.slug === `quang-cao-chen-giua-${7}`
      ) && <QuangCaoChenGiua index={7} />}

      {/* Block 4 trong categoryTree */}
      <DefenseSecurityBox
        categoryTree={categoryTree?.[3]}
        articles={categoriesData?.[3]}
      />

      {publishedWidgets?.some(
        (item) => item.slug === `quang-cao-chen-giua-${8}`
      ) && <QuangCaoChenGiua index={8} />}

      <PodcastBox
        podcasts={hqPodcast}
        category={
          hqPodcastCategory ?? {
            name: "Podcast",
            slug: "podcast",
          }
        }
      />

      {publishedWidgets?.some(
        (item) => item.slug === `quang-cao-chen-giua-${9}`
      ) && <QuangCaoChenGiua index={9} />}

      {/* Block 5 trong categoryTree */}
      <DefenseSecurityBox
        categoryTree={categoryTree?.[4]}
        articles={categoriesData?.[4]}
      />

      {publishedWidgets?.some(
        (item) => item.slug === `quang-cao-chen-giua-${10}`
      ) && <QuangCaoChenGiua index={10} />}

      {/* Block 6 trong categoryTree */}
      <DefenseSecurityBox
        categoryTree={categoryTree?.[5]}
        articles={categoriesData?.[5]}
      />

      {publishedWidgets?.some(
        (item) => item.slug === `quang-cao-chen-giua-${11}`
      ) && <QuangCaoChenGiua index={11} />}

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
        <div key={item?.id}>
          {publishedWidgets?.some(
            (item) => item.slug === `quang-cao-chen-giua-${12 + index}`
          ) && <QuangCaoChenGiua index={12 + index} />}

          <DefenseSecurityBox
            categoryTree={item}
            articles={categoriesData?.[6 + index]}
            hideBorder={index === 0}
          />
        </div>
      ))}

      {publishedWidgets?.some(
        (item) => item.slug === "quang-cao-chen-cuoi"
      ) && <QuangCaoChenGiua index={-1} />}
    </div>
  );
};

export default HomePage;

export const metadata: Metadata = {
  title: "Báo Hải Quân Việt Nam",
  description: "Chuyên Trang Báo Chính Thức Của Hải Quân Nhân Dân Việt Nam",
  icons: { icon: "/favicon.ico" },
};
