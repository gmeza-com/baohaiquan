"use client";
import { useEffect, useState } from "react";
import DecorTitle from "../Home/DecorTitle";
import { categoriesAPI } from "@/lib/api";
import { MostViewCategory } from "@/type/category";
import Image from "next/image";
import Link from "next/link";

const MostViewArticles = () => {
  const [mostViewCategories, setMostViewCategories] = useState<
    MostViewCategory[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    categoriesAPI
      .getMostViewCategories()
      .then((res) => {
        setMostViewCategories(res.data);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading || !mostViewCategories.length || isError) return null;

  return (
    <div className="w-full py-4 lg:py-10 xl:py-15">
      <div className="container mx-auto">
        <DecorTitle title="Xem nhiều" />

        <div className="mt-10 lg:mt-8 xl:mt-10 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-x-6 gap-y-10">
          {mostViewCategories
            ?.filter((category) => category?.most_viewed?.length)
            .map((category) => (
              <div key={category.id}>
                <div className="flex items-center gap-3">
                  <div className="h-6 w-1 rounded-full bg-sky-400" />
                  <Link href={`/danh-muc/${category.slug}`}>
                    <h3 className="text-blue-700 text-xl font-semibold truncate">
                      {category.name}
                    </h3>
                  </Link>
                </div>
                <ul className="mt-6 flex flex-col divide-y divide-stroke-light divide-dashed">
                  <li className="pb-6 @container/most-view-article">
                    <Link
                      href={`/tin-tuc/${category?.most_viewed?.[0]?.slug}`}
                      className="flex items-start gap-5 @min-[320px]:flex-row flex-col"
                    >
                      <img
                        src={category?.most_viewed?.[0]?.thumbnail || ""}
                        alt={category?.most_viewed?.[0]?.name || ""}
                        width={244}
                        height={137}
                        className="aspect-video rounded-[6px] @min-[320px]:w-[136px] w-full object-cover shrink-0"
                      />
                      <h6 className="text-gray-900 font-semibold @min-[320px]:text-base text-lg">
                        {category?.most_viewed?.[0]?.name}
                      </h6>
                    </Link>
                  </li>
                  {category?.most_viewed?.slice(1)?.map((article) => (
                    <li key={article.id} className="pt-3 pb-4">
                      <Link
                        href={`/tin-tuc/${article.slug}`}
                        className="font-medium text-xsm text-gray-900"
                      >
                        {article.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MostViewArticles;
