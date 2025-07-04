import { PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MenuService from "@/service/menu";
import CategoryService from "@/service/category";
import { getCategoryTree } from "@/lib/utils";
import { CategoryTree } from "@/type/category";

interface PrimaryLayoutProps extends PropsWithChildren {}

const PrimaryLayout: React.FC<PrimaryLayoutProps> = async ({ children }) => {
  let menuItems: any[] = [];
  let categoryTree: CategoryTree[] = [];

  try {
    // menu items
    menuItems = await MenuService.getMenuItems();

    // categories
    const categories = await CategoryService.getPostCategories();

    categoryTree = getCategoryTree(categories);
  } catch (error) {}

  return (
    <>
      <Header menuItems={menuItems} />
      <main>{children}</main>
      <Footer categories={categoryTree} />
    </>
  );
};

export default PrimaryLayout;
