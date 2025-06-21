import PrimaryLayout from "@/coms/MasterLayout/PrimaryLayout";
import { PropsWithChildren } from "react";

interface HomeLayoutProps extends PropsWithChildren {}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return <PrimaryLayout>{children}</PrimaryLayout>;
};

export default HomeLayout;
