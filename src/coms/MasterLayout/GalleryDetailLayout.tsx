import CategoryService from "@/service/category";
import Footer from "./Footer";
import { getCategoryTree } from "@/lib/utils";
import GalleryDetailHeader from "./GalleryDetailHeader";
import { CategoryProps } from "@/type/article";
import OptionService from "@/service/options";

const GalleryDetailLayout = async ({
  children,
  category,
  postName,
}: {
  children: React.ReactNode;
  category: Omit<CategoryProps, "description">;
  postName?: string;
}) => {
  const categories = await CategoryService.getPostCategories();
  const options = await OptionService.getOptions([
    "site_phone",
    "site_email",
    "site_address",
    "province",
    "district",
    "social_zalo",
    "social_facebook",
    "social_youtube",
  ]);

  // Convert to tree structure
  const categoryTree = getCategoryTree(categories);

  return (
    <div className="bg-gray-900">
      <GalleryDetailHeader category={category} postName={postName} />
      <main>{children}</main>
      <Footer categories={categoryTree} options={options as any} />
    </div>
  );
};

export default GalleryDetailLayout;
