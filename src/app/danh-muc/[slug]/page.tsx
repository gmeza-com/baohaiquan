import CategoryArticles from "@/coms/Block/CategoryArticles";
import CategoryFeature from "@/coms/Block/CategoryFeature";
import CategoryMostRead from "@/coms/Block/CategoryMostRead";
import { cleanSlug, isOn } from "@/lib/utils";
import CategoryService from "@/service/category";
import { ArticleProps } from "@/type/article";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  let { slug } = params;
  try {
    slug = cleanSlug(slug);
    // Fetch category information
    const info = await CategoryService.getCategoryInfo(slug);

    if (info) return { title: info.name, description: info.description };
  } catch (error) {
    console.error("Error fetching metadata:", error);
  }

  // Fallback metadata
  return {
    title: "Báo Hải Quân Việt Nam",
    description: "Chuyên Trang Báo Chính Thức Của Hải Quân Nhân Dân Việt Nam",
  };
}

const DanhMucPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  let features: ArticleProps[] = [];
  let articles: ArticleProps[] = [];
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
  } catch (error) {}

  return (
    <div className="container">
      {isOn(features) && <CategoryFeature posts={features} />}
      <div className="grid grid-cols-4 gap-6 mt-21">
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-6">
            <CategoryMostRead slug={slug} quantity={8} />
          </div>
        </div>
        <div className="col-span-4 lg:col-span-2">
          <CategoryArticles
            posts={articles}
            excludes={excludeIds}
            slug={slug}
          />
        </div>
        <div className="hidden lg:block lg:col-span-1">banners</div>
        <div className="md:col-span-4 lg:hidden">
          <CategoryMostRead slug={slug} quantity={8} />
        </div>
      </div>
    </div>
  );
};

export default DanhMucPage;
