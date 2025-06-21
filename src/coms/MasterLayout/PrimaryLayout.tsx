import { PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { categoriesAPI } from "@/lib/api";

interface PrimaryLayoutProps extends PropsWithChildren {}

const PrimaryLayout: React.FC<PrimaryLayoutProps> = async ({ children }) => {
  const categories = await categoriesAPI.getCategories();

  return (
    <>
      <Header categories={categories?.data} />
      <main>{children}</main>
      <Footer categories={categories?.data} />
    </>
  );
};

export default PrimaryLayout;
