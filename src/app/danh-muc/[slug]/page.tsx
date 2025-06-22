import CategoryFeature from "@/coms/Block/CategoryFeature";
import { isOn } from "@/lib/utils";
import CategoryService from "@/service/category";
import { ArticleProps } from "@/type/article";

const DanhMucPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  let features: ArticleProps[] = [];
  let articles: ArticleProps[] = [];
  try {
    const { slug } = await params;
    if (!slug) throw new Error("Slug is required");

    // Fetch featured articles first
    features = await CategoryService.getFeaturedsByCategory(slug, 0, 8);

    const excludeIds: number[] =
      features.length > 0 ? features.map((item) => item.id) : [];

    // Fetch articles in the category, excluding featured IDs
    articles = await CategoryService.getPostsByCategory(
      slug,
      0,
      10,
      excludeIds
    );
  } catch (error) {}

  return (
    <div className="container">
      {isOn(features) && <CategoryFeature posts={features} />}
    </div>
  );
};

export default DanhMucPage;
