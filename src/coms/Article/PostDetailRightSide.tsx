"use client";

import { useEffect, useMemo, useState } from "react";
import DecorTitle from "../Home/DecorTitle";
import axios from "axios";
import NavyNewspaperBox from "../Home/NavyNewspaperBox";
import LinkedWebsiteBox from "../Home/LinkedWebsiteBox";
import QuangCaoCotBen from "../Home/QuangCaoCotBen";
import { IGalleryCollection } from "@/type/article";
import { IMenuItem } from "@/type/menu";
import MostViewPostLazyLoad from "./MostViewPostLazyLoad";

interface PostDetailRightSideProps {
  menuData: IMenuItem[];
  currentCategory: number;
}

// Hàm đệ quy để convert childrens thành children
const convertChildrensToChildren = (items: any[]): any[] => {
  return items.map((item) => {
    const newItem = { ...item };

    // Nếu có childrens, chuyển thành children và đệ quy xử lý
    if (item.childrens && Array.isArray(item.childrens)) {
      newItem.children = convertChildrensToChildren(item.childrens);
      delete newItem.childrens; // Xóa thuộc tính childrens cũ
    }

    return newItem;
  });
};

const PostDetailRightSide: React.FC<PostDetailRightSideProps> = ({
  menuData,
  currentCategory,
}) => {
  const [newsPaperData, setNewsPaperData] = useState<IGalleryCollection[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const getFirstNewspaper = axios("/api/first-line-newspaper");
      const firstNewspaperRes = await getFirstNewspaper;

      setNewsPaperData(firstNewspaperRes?.data?.data || []);
    };

    fetchData();
  }, []);

  return (
    <div className="col-span-1 md:col-span-4 xl:col-span-1 md:pt-6 xl:pt-12 flex flex-col gap-10">
      <MostViewPostLazyLoad />

      {!!newsPaperData?.[0] && (
        <NavyNewspaperBox
          gallery={newsPaperData?.[0]}
          title={<DecorTitle title="Báo in" textClassName="text-gray-900" />}
          linkClassName="bg-yellow-100"
          titleClassName="text-gray-900"
          imgClassName="border-yellow-200"
          containerClassName="!mt-6 xl:!mt-8"
        />
      )}

      <LinkedWebsiteBox
        title={
          <DecorTitle title="Liên kết website" textClassName="text-gray-900" />
        }
        contentClassName="!mt-6 xl:!mt-8"
      />
      <QuangCaoCotBen slug="quang-cao-cot-ben-1" />
    </div>
  );
};

export default PostDetailRightSide;
