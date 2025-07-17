"use client";

import { ArticleProps } from "@/type/article";
import ArticleHorizontal from "@/coms/Article/ArticleHorizontal";
import Spinner from "@/coms/common/Spinner";
import { Button } from "@/shadcn/ui/button";
import { useState } from "react";
import { rest } from "@/lib/rest";
import { isOn } from "@/lib/utils";
import axios from "axios";

const CategoryArticles: React.FC<{
  slug: string;
  posts: ArticleProps[];
  excludes?: number[];
}> = ({ slug, posts, excludes }) => {
  const [items, setItems] = useState<ArticleProps[]>(posts);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(posts.length);
  const [loadedAll, setLoadedAll] = useState<boolean>(false);

  const loadMore = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const params = { offset, slug, excludes: excludes?.join(",") || "" };
      const { status, data: resData } = await axios.get("/api/danh-muc", { params });

      const data = resData?.data;

      if (status == 200) {
        if (isOn(data)) {
          setOffset((prev) => prev + data.length);
          setItems((prev) => [...prev, ...data]);
        }

        if (!isOn(data) || data.length < 10) setLoadedAll(true);
      }
    } catch (error) {
      console.error("Failed to load more articles", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ul>
      {items.length > 0 &&
        items.map((post, idx) => (
          <li
            key={post.id}
            className={`mb-6 ${
              idx < items.length - 1 ? "border-b border-b-blue-200 pb-5" : ""
            }`}
          >
            <ArticleHorizontal post={post} showDesc={true} />
          </li>
        ))}
      <li>
        <Button
          variant="outline"
          onClick={loadMore}
          disabled={loading || loadedAll}
          className="w-full text-center my-4 bg-sky-50 border-sky-100 text-blue-700 hover:text-blue-800 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors duration-200"
        >
          {loading && <Spinner />}
          Xem Thêm
        </Button>
      </li>
    </ul>
  );
};

export default CategoryArticles;
