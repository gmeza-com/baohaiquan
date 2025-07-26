import CategoryService from "@/service/category";
import Footer from "./Footer";
import GalleryDetailHeader from "./GalleryDetailHeader";
import { CategoryProps } from "@/type/article";
import OptionService from "@/service/options";
import ScrollTopButton from "../common/ScrollTopButton";
import { GalleryCategorySlug } from "@/data/category";
import MenuService from "@/service/menu";

const GalleryDetailLayout = async ({
  children,
  category,
  postName,
}: {
  children: React.ReactNode;
  category: Omit<CategoryProps, "description">;
  postName?: string;
}) => {
  const menuItems = await MenuService.getMenuItems();

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
      <Footer categories={menuItems} options={options as any} />
      <ScrollTopButton />
    </div>
  );
};

export default GalleryDetailLayout;
