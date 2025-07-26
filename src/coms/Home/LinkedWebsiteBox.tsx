"use client";

import Image from "next/image";
import DecorTitle from "./DecorTitle";
import { useEffect, useMemo, useState } from "react";
import { ILinkedWebsite, IWidget } from "@/type/widget";
import axios from "axios";
import Link from "next/link";
import clsx from "clsx";

const LIMIT = 6;

interface LinkedWebsiteBoxProps {
  title?: React.ReactNode;
  contentClassName?: string;
}

const LinkedWebsiteBox: React.FC<LinkedWebsiteBoxProps> = ({
  title,
  contentClassName,
}) => {
  const [data, setData] = useState<IWidget | null>(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isShowMore, setIsShowMore] = useState<boolean>(false);

  const content = useMemo<ILinkedWebsite[]>(() => {
    return Object.values(data?.content || {})
      ?.sort((a, b) => Number(a.position) - Number(b.position))
      ?.filter((website) => website.active === "1");
  }, [data]);

  const firstWebsite = useMemo<ILinkedWebsite | null>(() => {
    return content[0] || null;
  }, [content]);

  const restWebsites = useMemo<ILinkedWebsite[]>(() => {
    return content.slice(1);
  }, [content]);

  const haveMore = useMemo<boolean>(() => {
    return restWebsites.length > LIMIT;
  }, [restWebsites]);

  /**
   * useEffect
   * ====================================================================
   */

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setIsError(false);

        const res = await axios.get(`/api/widget/lien-ket-website`);

        setData(res.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /**
   * render view
   * ====================================================================
   */

  if (loading) return null;
  if (isError) return null;

  return (
    <div className="@container/linked-website-box">
      {title || (
        <DecorTitle
          title="Liên kết website"
          textClassName="@max-[250px]/linked-website-box:text-lg"
        />
      )}
      <div className={clsx(contentClassName, "mt-8")}>
        {firstWebsite && (
          <Link
            href={firstWebsite?.url as string}
            target={firstWebsite?.target as string}
          >
            <div className="pb-5 border-b border-blue-200 border-dashed">
              <img
                src={firstWebsite?.language?.["vi"]?.image}
                alt={firstWebsite?.url}
                className="w-full rounded-[12px] shadow-[0_4px_12px_rgba(0,71,141,0.06),_0_2px_4px_rgba(0,0,0,0.02)]"
              />
            </div>
          </Link>
        )}

        <div className="mt-5 grid grid-cols-2 gap-1.5 p-2 bg-blue-50 rounded-2xl">
          {restWebsites
            .slice(0, isShowMore ? undefined : LIMIT)
            .map((website) => (
              <Link
                href={website?.url}
                target={website?.target}
                key={website.url}
                className="bg-white border border-blue-100 flex items-center justify-center px-2 aspect-[139/80] overflow-hidden rounded-[12px] py-4"
              >
                <img
                  src={website.language?.["vi"]?.image}
                  alt={website.url}
                  className="size-full object-contain"
                  loading="lazy"
                  width={139}
                  height={80}
                />
              </Link>
            ))}

          {haveMore && (
            <button
              onClick={() => setIsShowMore((prev) => !prev)}
              className="col-span-2 text-sm text-blue-700 underline cursor-pointer"
            >
              {isShowMore ? "Thu gọn" : "Xem thêm"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkedWebsiteBox;
