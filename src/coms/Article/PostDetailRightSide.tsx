"use client";

import { useEffect, useMemo, useState } from "react";
import DecorTitle from "../Home/DecorTitle";
import axios from "axios";
import NavyNewspaperBox from "../Home/NavyNewspaperBox";
import LinkedWebsiteBox from "../Home/LinkedWebsiteBox";
import QuangCaoCotBen from "../Home/QuangCaoCotBen";
import { IGalleryCollection } from "@/type/article";
import SiteMenu from "./SiteMenu";
import { IMenuItem } from "@/type/menu";

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
    <div className="col-span-1 md:col-span-4 xl:col-span-1 pt-6 flex flex-col gap-10">
      <div>
        <DecorTitle title="Tin theo danh mục" textClassName="!text-xl" />
        <SiteMenu data={menuData} currentCategoryId={currentCategory} />
      </div>

      {!!newsPaperData?.[0] && (
        <NavyNewspaperBox
          gallery={newsPaperData?.[0]}
          title={<DecorTitle title="Báo in" textClassName="!text-xl" />}
        />
      )}

      <LinkedWebsiteBox
        title={<DecorTitle title="Liên kết website" textClassName="!text-xl" />}
      />
      <QuangCaoCotBen slug="quang-cao-cot-ben-1" />
    </div>
  );
};

export default PostDetailRightSide;
