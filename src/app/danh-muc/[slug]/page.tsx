import CategoryArticles from "@/coms/Block/CategoryArticles";
import CategoryFeature from "@/coms/Block/CategoryFeature";
import CategoryMostRead from "@/coms/Block/CategoryMostRead";
import NavyNewspaperBox from "@/coms/Home/NavyNewspaperBox";
import LinkedWebsiteBox from "@/coms/Home/LinkedWebsiteBox";
import { cleanSlug, isOn } from "@/lib/utils";
import CategoryService from "@/service/category";
import { ArticleProps } from "@/type/article";
import { GalleryCategory } from "@/data/category";
import PostService from "@/service/post";
import CategoryRowList from "@/coms/Block/CategoryRowList";
import QuangCaoCotBen from "@/coms/Home/QuangCaoCotBen";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  try {
    let { slug } = await params;
    slug = cleanSlug(slug);
    if (!slug) throw new Error("Slug is required");

    // Fetch category information
    const info = await CategoryService.getCategoryInfo(slug);

    if (info)
      return {
        title: info.name,
        description: info.description,
        icons: { icon: "/favicon.ico" },
      };
  } catch (error) {
    console.error("Error fetching metadata:", error);
  }

  // Fallback metadata
  return {
    title: "Báo Hải Quân Việt Nam",
    description: "Chuyên Trang Báo Chính Thức Của Hải Quân Nhân Dân Việt Nam",
    icons: { icon: "/favicon.ico" },
  };
}

const DanhMucPage = async ({ params }: PageProps) => {
  let info: any = null;
  let features: ArticleProps[] = [];
  let articles: ArticleProps[] = [];
  let otherItems: ArticleProps[] = [];
  let hqNewsPaperContent: any = [];
  let excludeIds: number[] = [];
  let { slug } = await params;
  try {
    slug = cleanSlug(slug);
    if (!slug) throw new Error("Slug is required");
    // fetch the category information

    // Fetch featured articles first
    features = await CategoryService.getFeaturedsByCategory(slug, false, 0, 8);

    // If there are featured articles, exclude their IDs
    excludeIds = features.length > 0 ? features.map((item) => item.id) : [];

    // Fetch articles in the category, excluding featured IDs
    articles = await CategoryService.getPostsByCategory(
      slug,
      0,
      10,
      false,
      excludeIds
    );

    hqNewsPaperContent = await PostService.getGalleryCollection(
      GalleryCategory.HQ_NEWS_PAPER,
      1
    );

    info = await CategoryService.getCategoryInfo(slug);

    otherItems = await CategoryService.getOtherCateogoryPosts(slug);
  } catch (error) {}

  return (
    <div className="container">
      <h1 className="text-3xl lg:text-4xl font-bold mt-12 pb-6 text-center text-blue-700 font-playfair-display uppercase">
        {info.name}
      </h1>
      <div className="border-b-4 mx-auto border-b-blue-400 w-30 mb-12"></div>

      {isOn(features) && <CategoryFeature posts={features} />}
      <div className="grid grid-cols-4 gap-6 mt-21 pb-12 mb-12 border-b-2 border-b-blue-200">
        <div className="col-span-4 md:col-span-2 lg:col-span-1 row-start-2 lg:row-start-1">
          <div className="sticky top-24 lg:top-20">
            <CategoryMostRead slug={slug} quantity={8} />
          </div>
        </div>
        <div className="col-span-4 lg:col-span-2 row-start-1">
          <CategoryArticles
            posts={articles}
            excludes={excludeIds}
            slug={slug}
          />
        </div>
        <div className="col-span-4 md:col-span-2 lg:col-span-1 md:row-start-2 row-start-3 lg:row-start-1">
          <div className="sticky top-24 lg:top-20 flex gap-6 flex-col">
            {!!hqNewsPaperContent?.[0] && (
              <NavyNewspaperBox gallery={hqNewsPaperContent?.[0]} />
            )}
            <LinkedWebsiteBox />
            <QuangCaoCotBen slug="quang-cao-cot-ben-1" />
          </div>
        </div>
      </div>
      <CategoryRowList posts={otherItems} />
    </div>
  );
};

export default DanhMucPage;
