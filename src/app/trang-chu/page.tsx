import HeadlineBlock from "@/coms/Home/HeadlineBlock";
import { Metadata } from "next";

const HomePage = () => {
  return (
    <div className="">
      <HeadlineBlock />
    </div>
  );
};

export default HomePage;

export const metadata: Metadata = {
  title: "Báo Hải Quân Việt Nam",
  description: "Chuyên Trang Báo Chính Thức Của Hải Quân Nhân Dân Việt Nam",
};
