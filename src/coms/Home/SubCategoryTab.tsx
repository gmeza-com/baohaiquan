"use client";

import { Category } from "@/type/category";
import TabButton from "./TabButton";
import { useLayoutEffect, useRef, useState } from "react";
import NavButton from "./NavButton";

interface SubCategoryTabProps {
  categoryTrees: Category[];
}

const SubCategoryTab: React.FC<SubCategoryTabProps> = ({ categoryTrees }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(true);

  const checkScrollPosition = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const { scrollLeft, scrollWidth, clientWidth } = container;

      setIsStart(scrollLeft <= 0);
      setIsEnd(scrollLeft >= scrollWidth - clientWidth);
    }
  };

  const handleScrollLeft = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollAmount = container.clientWidth * 1; // Scroll 100% của container width
      container.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollAmount = container.clientWidth * 1; // Scroll 100% của container width
      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useLayoutEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const containerWidth = container.clientWidth;
        const scrollWidth = container.scrollWidth;

        // Kiểm tra xem có overflow hay không
        const overflowing = scrollWidth > containerWidth;
        setIsOverflowing(overflowing);

        if (overflowing) {
          checkScrollPosition();
        } else {
          setIsStart(true);
          setIsEnd(true);
        }
      }
    };

    checkOverflow();

    // Thêm event listener để kiểm tra khi window resize
    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [categoryTrees]);

  // Thêm event listener cho scroll
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      return () => {
        container.removeEventListener("scroll", checkScrollPosition);
      };
    }
  }, []);

  if (categoryTrees.length === 0) return null;

  return (
    <div className="relative flex-1 -mx-4 md:mx-0 md:overflow-hidden">
      <div
        ref={containerRef}
        className={`items-center no-scrollbar w-full gap-3 overflow-x-auto flex px-4`}
      >
        {categoryTrees.map((item) => (
          <TabButton
            key={item?.id}
            title={item?.name ?? ""}
            link={`/danh-muc/${item?.slug}`}
          />
        ))}
      </div>

      {isOverflowing && !isEnd && (
        <div className="hidden md:block absolute rotate-180 h-full w-16 bg-gradient-to-r from-white from-40% to-transparent top-0 right-0 pointer-events-none" />
      )}
      {isOverflowing && !isStart && (
        <div className="hidden md:block absolute h-full w-16 bg-gradient-to-r from-white from-40% to-transparent top-0 left-0 pointer-events-none" />
      )}

      {isOverflowing && !isStart && (
        <NavButton
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10"
          onClick={handleScrollLeft}
        />
      )}
      {isOverflowing && !isEnd && (
        <NavButton
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10"
          isRight
          onClick={handleScrollRight}
        />
      )}
    </div>
  );
};

export default SubCategoryTab;
