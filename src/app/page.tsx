import { Button } from "@/shadcn/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bảo Hải quân Việt Nam",
  description: "Chuyên Trang Báo Chính Thức Của Hải Quân Nhân Dân Việt Nam",
};

const HomePage = () => {
  return (
    <div className="container">
      <h1 className="text-3xl font-black">Báo Hải Quân Việt Nam</h1>
      <Button className="bg-green-500 hover:bg-green-300">Hehe</Button>
    </div>
  );
};

export default HomePage;
