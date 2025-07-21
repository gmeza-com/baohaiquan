import { PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MenuService from "@/service/menu";
import CategoryService from "@/service/category";
import { getCategoryTree } from "@/lib/utils";
import { CategoryTree } from "@/type/category";
import OptionService from "@/service/options";

interface PrimaryLayoutProps extends PropsWithChildren {}

const PrimaryLayout: React.FC<PrimaryLayoutProps> = async ({ children }) => {
  let menuItems: any[] = [];
  let categoryTree: CategoryTree[] = [];
  let options: Record<string, string> | null = null;

  try {
    // menu items
    menuItems = await MenuService.getMenuItems();

    // categories
    const categories = await CategoryService.getPostCategories();
    // options
    options =
      (await OptionService.getOptions([
        "site_phone",
        "site_email",
        "site_address",
        "province",
        "ward",
        "social_zalo",
        "social_facebook",
        "social_youtube",
      ])) ?? null;

    categoryTree = getCategoryTree(categories);
  } catch (error) {}

  return (
    <>
      <Header menuItems={menuItems} options={options as any} />
      <main>{children}</main>
      <Footer categories={categoryTree} options={options as any} />
    </>
  );
};

export default PrimaryLayout;
