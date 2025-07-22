"use client";

import { CategoryTree } from "@/type/category";
import { IconCaretDown } from "../Icon/light";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";

interface ExpandableCategoryProps {
  category: CategoryTree;
}

const ExpandableCategory: React.FC<ExpandableCategoryProps> = ({
  category,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <li className="border-b border-blue-200 pb-2 last:border-b-0">
      <div className="flex items-center justify-between gap-2 h-12">
        <Link
          href={`/danh-muc/${category.slug}`}
          className="font-semibold uppercase text-base leading-[150%] tracking-[-1%] text-gray-900"
        >
          {category.name}
        </Link>
        {category?.children?.length > 0 && (
          <IconCaretDown
            onClick={() => setIsExpanded((prev) => !prev)}
            className={clsx(
              "text-gray-800 cursor-pointer transition-transform",
              !isExpanded ? "rotate-180" : ""
            )}
            size={24}
          />
        )}
      </div>
      <ul
        className={clsx(
          "flex flex-col gap-0.5",
          isExpanded ? "block" : "hidden"
        )}
      >
        {category?.children?.map((item) => (
          <li
            key={item.id}
            className="min-h-11 flex items-center pt-2 pr-1 pb-3 border-b last:border-b-0 border-blue-200 border-dashed"
          >
            <Link
              href={`/danh-muc/${item.slug}`}
              className="text-[15px] leading-[150%] tracking-[0%] font-normal text-gray-900"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default ExpandableCategory;
