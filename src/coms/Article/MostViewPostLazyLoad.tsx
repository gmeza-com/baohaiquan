"use client";

import { useEffect, useState } from "react";
import DecorTitle from "../Home/DecorTitle";
import { ArticleProps } from "@/type/article";
import axios from "axios";
import ArticleRankItem from "../Home/ArticleRankItem";
import clsx from "clsx";

const MostViewPostLazyLoad = () => {
  const [data, setData] = useState<ArticleProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsError(false);
        setIsLoading(true);

        const res = await axios.get("/api/most-view-article", {
          params: {
            limit: 8,
          },
        });

        setData(res?.data?.data || []);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isError) {
    return null;
  }

  if (data?.length <= 0 && !isLoading) {
    return null;
  }

  return (
    <div className="@container/trending-news-box">
      <DecorTitle
        title="Tin đọc nhiều"
        textClassName="@max-[250px]/trending-news-box:text-xl text-gray-900"
      />
      <ol className="flex flex-col mt-6 xl:mt-8">
        {isLoading &&
          Array.from({ length: 8 }).map((_, index) => (
            <li key={index} className="animate-pulse pt-3 pb-4 pe-1 first:pt-0">
              <div className="h-20 w-full bg-gray-200 rounded"></div>
            </li>
          ))}

        {data.map((item, index) => (
          <ArticleRankItem
            key={item?.id}
            number={index + 1}
            title={item?.name}
            slug={item?.slug}
            numberClassName="text-gray-600"
            className="first:pt-0"
            linkClassName={clsx(index === 0 && "!pt-0")}
          />
        ))}
      </ol>
    </div>
  );
};

export default MostViewPostLazyLoad;
