import { PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { categoriesAPI } from "@/lib/api";
import { rest } from "@/lib/rest";

interface PrimaryLayoutProps extends PropsWithChildren {}

const PrimaryLayout: React.FC<PrimaryLayoutProps> = async ({ children }) => {
  let menuItems: any[] = [];
  let categories: any;
  try {
    // menu items
    const { data, status } = await rest.get("/menu-items");
    if (status === 200) menuItems = data;

    // categories
    categories = await categoriesAPI.getCategories();
    console.log("categories", categories);
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
