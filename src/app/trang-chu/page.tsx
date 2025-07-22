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
import { Category, CategoryTree } from "@/type/category";
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

const parseHomeLayout = (layout: string) => {
  const layoutArray = layout.split(",");

  return layoutArray?.map((item) => {
    const test = item.split(":");

    const type = test?.[0];
    const id = test?.[1];
    const additional = test?.[2];

    console.log("type", type);
    console.log("id", id);
    console.log("additional", additional);

    return {
      type,
      id,
      additional,
    };
  });
};

const HomePage = async () => {
  const [
    newestPosts,
    featuredPosts,
    mostViewedPosts,
    newestPosts2,
    galleryTV,
    hqVideo,
    hqNewsPaperContent,
    hqPodcast,
    mediaBox,
    publishedWidgets,
    homeLayout,
  ] = await Promise.all([
    PostService.getNewestPosts(6),
    PostService.getFeaturedPosts(10),
    PostService.getMostViewedPosts(8),
    PostService.getNewestPosts(7, true),
    PostService.getGalleryCollection(GalleryCategory.HQ_TV, 5),
    PostService.getGalleryCollection(GalleryCategory.HQ_VIDEO, 3),
    PostService.getGalleryCollection(GalleryCategory.HQ_NEWS_PAPER, 1),
    PostService.getGalleryCollection(GalleryCategory.HQ_PODCAST, 8),
    PostService.getMediaBox(13),
    WidgetService.getPublishedWidget(),
    OptionService.getOptions(["home_layout"]),
  ]);

  const homeLayoutData = parseHomeLayout(homeLayout?.home_layout ?? "");

  // increase site_view when access to this page
  OptionService.increaseSiteView();

  const [categories, galleryCategories] = await Promise.all([
    CategoryService.getPostCategories(),
    CategoryService.getGalleryCategories(
      homeLayoutData
        ?.filter((item) => Boolean(item?.id) && item?.type === "gallery")
        ?.map((item) => item?.id)
    ),
  ]);

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
  const categoryTree = getCategoryTree(categories as Category[])?.filter(
    (tree) =>
      homeLayoutData
        ?.filter((item) => Boolean(item?.id) && item?.type === "post")
        ?.map((item) => Number(item?.id))
        .some((item) => item === tree?.id)
  );

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

  const categoriesDataWithTree =
    categoriesData?.map((item, index) => ({
      data: item,
      categoryTree: categoryTree?.[index],
    })) ?? [];

  const haveMiddleAds1 = publishedWidgets?.some(
    (item) => item.slug === `quang-cao-chen-giua-${1}`
  );

  const haveMiddleAds0 = publishedWidgets?.some(
    (item) => item.slug === `quang-cao-chen-giua-${0}`
  );

  const haveMiddleAds2 = publishedWidgets?.some(
    (item) => item.slug === `quang-cao-chen-giua-${2}`
  );

  const renderHomeBlock = (item: any) => {
    const { type, id, additional } = item;

    switch (type) {
      case "tieu-diem":
        return (
          <HeadlineBlock
            className={clsx(haveMiddleAds1 && "pb-0 lg:!pb-0")}
            rightBlockClassName={clsx(haveMiddleAds1 && "pb-0")}
            newestPosts={newestPosts}
            featuredPosts={featuredPosts}
          />
        );
      case "da-phuong-tien":
        return <MediaBox data={mediaBox} />;
      case "tin-doc-nhieu":
        return (
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
        );

      case "post":
        switch (additional) {
          case "chinh-tri":
            return (
              <ShortBox
                categoryTree={categoryTree?.[0]}
                articles={categoriesData?.[0]}
                innerClassName={clsx(haveMiddleAds2 && "!pb-0")}
              />
            );

          default:
            return (
              <DefenseSecurityBox
                categoryTree={
                  categories.find(
                    (item) => item.id === Number(id)
                  ) as CategoryTree
                }
                articles={
                  categoriesDataWithTree?.find(
                    (item) => item?.categoryTree?.id === Number(id)
                  )?.data ?? []
                }
              />
            );
        }

      case "gallery":
        switch (additional) {
          case "hq-media":
            return (
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
            );
          case "podcast":
            return (
              <PodcastBox
                podcasts={hqPodcast}
                category={
                  hqPodcastCategory ?? {
                    name: "Podcast",
                    slug: "podcast",
                  }
                }
              />
            );
          case "hq-tv":
            return (
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
            );
          default:
            return null;
        }
      default:
        return null;
    }
  };

  return (
    <div>
      {publishedWidgets?.some((item) => item.slug === "homepage-banner") && (
        <ChuChayTrangChu />
      )}

      {haveMiddleAds0 && <QuangCaoChenGiua index={0} />}

      {homeLayoutData?.map((item, index) => {
        const isLast = index === homeLayoutData?.length - 1;

        const _index = isLast ? -1 : index + 1;

        return (
          <>
            {renderHomeBlock(item)}

            {publishedWidgets?.some(
              (item) => item.slug === `quang-cao-chen-giua-${index + 1}`
            ) && <QuangCaoChenGiua index={_index} />}
          </>
        );
      })}
    </div>
  );
};

export default HomePage;

export const metadata: Metadata = {
  title: "Báo Hải Quân Việt Nam",
  description: "Chuyên Trang Báo Chính Thức Của Hải Quân Nhân Dân Việt Nam",
  icons: { icon: "/favicon.ico" },
};
