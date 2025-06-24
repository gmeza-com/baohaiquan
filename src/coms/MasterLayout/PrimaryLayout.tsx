import { PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { categoriesAPI } from "@/lib/api";
import MenuService from "@/service/menu";

interface PrimaryLayoutProps extends PropsWithChildren {}

const PrimaryLayout: React.FC<PrimaryLayoutProps> = async ({ children }) => {
  let menuItems: any[] = [];
  let categories: any;

  try {
    // menu items
    menuItems = await MenuService.getMenuItems();

    // categories
    categories = await categoriesAPI.getCategories();
  } catch (error) {}

  return (
    <>
      <Header menuItems={menuItems} />
      <main>{children}</main>
      <Footer categories={categories?.data} />
    </>
  );
};

export default PrimaryLayout;
