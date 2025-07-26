import { PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MenuService from "@/service/menu";
import OptionService from "@/service/options";
import ScrollTopButton from "../common/ScrollTopButton";
import { IMenuItem } from "@/type/menu";

interface PrimaryLayoutProps extends PropsWithChildren {}

const PrimaryLayout: React.FC<PrimaryLayoutProps> = async ({ children }) => {
  let menuItems: IMenuItem[] = [];
  let options: Record<string, string> | null = null;

  try {
    // menu items
    menuItems = await MenuService.getMenuItems();

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
  } catch (error) {}

  return (
    <>
      <Header menuItems={menuItems} options={options as any} />
      <main>{children}</main>
      <Footer categories={menuItems} options={options as any} />
      <ScrollTopButton />
    </>
  );
};

export default PrimaryLayout;
