"use client";

import { useEffect, useState } from "react";
import LinkedWebsiteBox from "../Home/LinkedWebsiteBox";
import MixNewsBox from "../Home/MixNewsBox";
import NavyNewspaperBox from "../Home/NavyNewspaperBox";
import TrendingNewsBox from "../Home/TrendingNewsBox";
import axios from "axios";
import { ArticleProps, IGalleryCollection, INewestPost } from "@/type/article";
import QuangCaoCotBen from "../Home/QuangCaoCotBen";

interface MixBoxProps {
  mostViewedPosts: ArticleProps[];
  newestPosts: INewestPost[];
  hqNewsPaperContent: IGalleryCollection[];
}

const MixBox = () => {
  const [data, setData] = useState<MixBoxProps | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const res = await axios.get("/api/mix-box");

        setData(res?.data?.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading || isError) return null;

  return (
    <div className="container mx-auto">
      <div className="-m-4 md:m-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:gap-12 md:gap-x-6 md:gap-y-16 md:py-5 lg:pt-11 lg:pb-[5.25rem] ">
        <div className="px-4 pt-9 pb-5 md:p-0 md:sticky lg:top-20 md:top-[5.375rem] md:self-start">
          <TrendingNewsBox posts={data?.mostViewedPosts || []} />
        </div>
        <div className="md:col-span-2 md:row-start-1 lg:col-start-2 xl:col-start-2">
          <div className="px-4 py-9 md:p-0 border-t border-blue-200 md:border-none">
            <MixNewsBox posts={data?.newestPosts || []} />
          </div>
        </div>
        <div className="flex flex-col gap-12 px-4 py-9 md:p-0 border-t border-blue-200 md:border-none md:sticky lg:top-20 md:top-[5.375rem] md:self-start">
          {!!data?.hqNewsPaperContent?.[0] && (
            <NavyNewspaperBox gallery={data?.hqNewsPaperContent?.[0]} />
          )}

          <LinkedWebsiteBox />
          <QuangCaoCotBen slug="quang-cao-cot-ben-1" />
        </div>
      </div>
    </div>
  );
};

export default MixBox;
