"use client";

import { rest } from "@/lib/rest";
import { isOn } from "@/lib/utils";
import { ArticleProps } from "@/type/article";
import { useEffect, useState } from "react";
import DecorTitle from "../Home/DecorTitle";
import { Skeleton } from "@/shadcn/ui/skeleton";
import ArticleNumeric from "../Article/ArticleNumeric";

const CategoryMostRead: React.FC<{
  slug: string;
  quantity?: number;
}> = ({ slug, quantity = 8 }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<ArticleProps[] | null>(null);

  const fetchMostRead = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const params = { slug, offset: 0, limit: quantity };
      const url = "/danh-muc/doc-nhieu";
      const { status, data } = await rest.get(url, { params });
      if (status === 200 && isOn(data)) {
        setItems(data);
      }
    } catch (error) {
      console.error("Error fetching most read articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timeout: any = null;
    if (!loading && isOn(slug) && items === null) {
      timeout = setTimeout(fetchMostRead, 1500); // Delay fetching to avoid too many requests
    }

    return () => timeout && clearTimeout(timeout); // Cleanup timeout on unmount
  }, [slug]);

  return (
    <>
      <DecorTitle title="Tin Đọc nhiều" className="mb-6" />
      <ul className="flex flex-col gap-6">
        {(items == null || loading) &&
          Array.from({ length: quantity }).map((_, idx) => (
            <SkeletonItem key={idx} />
          ))}

        {items &&
          items.map((item, idx) => (
            <li
              key={idx}
              className={`pb-6 ${
                idx + 1 < items.length
                  ? "border-b border-b-sky-200 border-dashed"
                  : ""
              }`}
            >
              <ArticleNumeric post={item} num={idx + 1} />
            </li>
          ))}
      </ul>
    </>
  );
};

const SkeletonItem: React.FC = () => {
  return (
    <li className="flex w-full py-2 gap-5">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex-grow flex flex-col gap-2">
        <Skeleton className="h-4 w-full block" />
        <Skeleton className="h-4 w-[70%]" />
      </div>
    </li>
  );
};

export default CategoryMostRead;
