import { IMenuItem } from "@/type/menu";
import { IconCaretDoubleRight } from "../Icon/light";
import clsx from "clsx";
import { useState } from "react";
import Link from "next/link";
import { getCategoryHref } from "@/lib/utils";

interface SiteMenuProps {
  data: IMenuItem[];
  currentCategoryId: number;
}

// Hàm kiểm tra recursive xem có item con nào active không
const hasActiveChild = (
  items: IMenuItem[],
  currentCategoryId: number
): boolean => {
  if (!items || items.length === 0) return false;

  return items.some((item) => {
    // Kiểm tra item hiện tại
    if (item?.attributes?.category_id === currentCategoryId) {
      return true;
    }
    // Kiểm tra recursive trong children
    return hasActiveChild(item?.childrens || [], currentCategoryId);
  });
};

// Hàm kiểm tra và set default open
const shouldItemBeOpen = (
  item: IMenuItem,
  currentCategoryId: number
): boolean => {
  // Item hiện tại active
  const isCurrentActive = item?.attributes?.category_id === currentCategoryId;

  // Có item con nào active không
  const hasActiveChildren = hasActiveChild(
    item?.childrens || [],
    currentCategoryId
  );

  return isCurrentActive || hasActiveChildren;
};

const SiteMenu: React.FC<SiteMenuProps> = ({ data, currentCategoryId }) => {
  return (
    <ul className="mt-6 flex flex-col  divide-y divide-blue-200">
      {data?.map((item) => (
        <ExpandableItem
          key={item?.id}
          item={item}
          currentCategoryId={currentCategoryId}
          defaultOpen={shouldItemBeOpen(item, currentCategoryId)}
        />
      ))}
    </ul>
  );
};

export default SiteMenu;

const ExpandableItem = ({
  item,
  currentCategoryId,
  defaultOpen = false,
}: {
  item: IMenuItem;
  currentCategoryId: number;
  defaultOpen?: boolean;
}) => {
  console.log("item", item);

  // Sử dụng defaultOpen prop để khởi tạo state
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const isActive = item?.attributes?.category_id === currentCategoryId;

  return (
    <li className={clsx("")}>
      <Link
        href={getCategoryHref(item)}
        className={clsx(
          "flex items-center gap-2 font-semibold ps-4 py-2 transition-colors text-sm relative hover:bg-blue-100",
          isActive && "bg-blue-100"
        )}
      >
        <IconCaretDoubleRight size={18} />
        {item?.name}
        {isActive && (
          <div className="absolute h-full w-1 bg-blue-700 left-0 top-0" />
        )}
      </Link>
      {(item?.childrens?.length || 0) > 0 && isOpen && (
        <ul className="flex flex-col divide-y border-t border-blue-200 divide-blue-200">
          {item?.childrens?.map((_item) => (
            <li key={_item?.id}>
              <Link
                href={getCategoryHref(_item)}
                className={clsx(
                  "block pl-10 py-2 font-semibold transition-colors text-sm relative hover:bg-blue-100",
                  _item?.attributes?.category_id === currentCategoryId
                    ? "bg-blue-100"
                    : ""
                )}
              >
                {_item?.name}
                {_item?.attributes?.category_id === currentCategoryId && (
                  <div className="absolute h-full w-1 bg-blue-700 left-0 top-0" />
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};
