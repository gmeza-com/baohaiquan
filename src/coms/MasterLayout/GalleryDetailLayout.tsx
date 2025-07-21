import CategoryService from "@/service/category";
import Footer from "./Footer";
import { getCategoryTree } from "@/lib/utils";
import GalleryDetailHeader from "./GalleryDetailHeader";
import { CategoryProps } from "@/type/article";
import OptionService from "@/service/options";
import ScrollTopButton from "../common/ScrollTopButton";
import { GalleryCategorySlug } from "@/data/category";

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
    "ward",
    "social_zalo",
    "social_facebook",
    "social_youtube",
  ]);

  // Convert to tree structure
  const categoryTree = getCategoryTree(categories);

  return (
    <div className="bg-gray-900">
      <GalleryDetailHeader
        category={category}
        postName={postName}
        mode={
          [
            GalleryCategorySlug.HQ_PODCAST,
            GalleryCategorySlug.HQ_LONGFORM,
          ]?.includes(category?.slug as GalleryCategorySlug)
            ? "light"
            : "dark"
        }
      />
      <main>{children}</main>
      <Footer categories={categoryTree} options={options as any} />
      <ScrollTopButton />
    </div>
  );
};

export default GalleryDetailLayout;
