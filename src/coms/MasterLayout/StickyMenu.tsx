"use client";

import { useLayoutEffect, useState, useEffect, useRef, useCallback } from "react";
import HeadNavMenu, { HeadNavMenuProps } from "./HeadNavMenu";

interface StickyMenuProps extends HeadNavMenuProps {}

const StickyMenu: React.FC<StickyMenuProps> = ({ ...props }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const rafRef = useRef<number | undefined>(undefined);
  const ticking = useRef(false);

  useLayoutEffect(() => {
    const element = document.getElementById("main-header");
    const height = element ? element.offsetHeight : 0;
    setHeaderHeight(height);
  }, []);

  const updateVisibility = useCallback(() => {
    const scrollY = window.scrollY;
    const shouldShow = scrollY > headerHeight - 10;
    setIsVisible(shouldShow);
    ticking.current = false;
  }, [headerHeight]);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      rafRef.current = requestAnimationFrame(updateVisibility);
      ticking.current = true;
    }
  }, [updateVisibility]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  return (
    <div
      className={`hidden lg:block bg-blue-700 pt-3 fixed top-0 w-screen z-50 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container !py-0">
        <HeadNavMenu {...props} preventStretch />
      </div>
    </div>
  );
};

export default StickyMenu;
