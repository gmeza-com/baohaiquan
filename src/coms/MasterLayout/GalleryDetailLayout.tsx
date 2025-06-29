import CategoryService from "@/service/category";
import Footer from "./Footer";
import { getCategoryTree } from "@/lib/utils";
import GalleryDetailHeader from "./GalleryDetailHeader";

const GalleryDetailLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const categories = await CategoryService.getPostCategories();

  // Convert to tree structure
  const categoryTree = getCategoryTree(categories);

  return (
    <div className="bg-gray-900">
      <GalleryDetailHeader />
      <main>{children}</main>
      <Footer categories={categoryTree} />
    </div>
  );
};

export default GalleryDetailLayout;
