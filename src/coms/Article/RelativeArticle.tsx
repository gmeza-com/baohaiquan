"use client";

import { ArticleProps } from "@/type/article";
import axios from "axios";
import { useEffect, useState } from "react";
import ArticleVerticle from "./ArticleVerticle";
import Link from "next/link";

interface RelativeArticleProps {
  slug: string;
  catSlug: string;
}

const RelativeArticle: React.FC<RelativeArticleProps> = ({ slug, catSlug }) => {
  const [data, setData] = useState<ArticleProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const res = await axios.get(`/api/relative-articles`, {
          params: {
            slug,
            limit: 4,
          },
        });

        setData(res.data.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderContent = () => {
    if (isError) return null;

    return (
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-x-6 xl:gap-y-8 mt-6 xl:mt-10">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <li key={`relative-article-${index}`}>
                <div className="w-full aspect-video bg-gray-200 rounded-md" />
                <div className="w-full h-8 bg-gray-200 rounded-md mt-2" />
                <div className="w-1/2 h-8 bg-gray-200 rounded-md mt-2" />
              </li>
            ))
          : data.map((item) => (
              <ArticleVerticle
                post={item}
                showDesc={false}
                key={item.slug}
                thumbnailClassName="aspect-video object-cover"
              />
            ))}
      </ul>
    );
  };

  return (
    <div className="max-w-[568px] mx-auto mt-6 md:mt-10 pt-7 pb-16 border-t border-yellow-200">
      <h6 className="uppercase font-playfair-display font-black text-[1.75rem] leading-[140%] tracking-[0%]">
        Tin liên quan
      </h6>
      {renderContent()}
      <Link
        href={`/danh-muc/${catSlug}`}
        className="w-full flex items-center active:scale-95 focus:ring-1 transition-transform justify-center bg-yellow-200 rounded-[0.75rem] h-12 mt-7 text-gray-900 font-semibold text-xsm leading-[160%] tracking-[0%]"
      >
        Xem thêm
      </Link>
    </div>
  );
};

export default RelativeArticle;
