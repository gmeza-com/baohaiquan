"use client";

import { Button } from "@/shadcn/ui/button";
import { ArticleProps } from "@/type/article";
import { useState } from "react";
import Spinner from "@/coms/common/Spinner";
import ArticleHorizontal from "@/coms/Article/ArticleHorizontal";
import { isOn } from "@/lib/utils";
import { rest } from "@/lib/rest";

const ResultList: React.FC<{
  items: ArticleProps[] | null;
  keyword: string;
  type: "bai-viet" | "video" | "";
}> = ({ items, keyword, type }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadedAll, setLoadedAll] = useState<boolean>(
    !items || items?.length < 10
  );
  const [results, setResults] = useState<ArticleProps[] | null>(items);

  const loadMore = async () => {
    try {
      if (loadedAll || loading) return;

      if (!isOn(keyword)) throw new Error("invalid keyword");

      const params = { keyword, type, offset: results?.length };
      const { status, data } = await rest.get("/tim-kiem", { params });

      if (status !== 200) throw new Error("invalid request");
      if (isOn(data)) setResults(results ? [...results, ...data] : data);
      else setLoadedAll(true);

      setLoading(true);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <ul className="flex flex-col gap-6 mt-3 mb-6">
      {results &&
        isOn(results) &&
        results.map((el: any) => (
          <li key={el.id}>
            <ArticleHorizontal post={el} showDesc={true} />
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

export default ResultList;
