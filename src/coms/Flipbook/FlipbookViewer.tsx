"use client";

import { useEffect, useRef } from "react";

export interface FlipbookPage {
  src: string;
  thumb?: string;
  title?: string;
  htmlContent?: string;
  items?: Array<{
    type: "iframe" | "img";
    src: string;
    width: number;
    height: number;
    x: number;
    y: number;
  }>;
}

interface FlipbookProps {
  pages: FlipbookPage[];
  name?: string;
  startPage?: number;
  skin?: "light" | "dark" | "gradient";
  layout?: "1" | "2" | "3" | "4";
  viewMode?: "webgl" | "3d" | "2d" | "swipe";
  lightBox?: boolean;
  autoplayOnStart?: boolean;
  className?: string;
}

declare global {
  interface Window {
    $: any;
    FLIPBOOK: any;
  }
}

export default function FlipbookViewer({
  pages,
  name = "Flipbook",
  startPage = 1,
  skin = "light",
  layout = "1",
  viewMode = "webgl",
  lightBox = false,
  autoplayOnStart = false,
  className = "",
}: FlipbookProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const flipbookRef = useRef<any>(null);

  useEffect(() => {
    // Load jQuery if not already loaded
    const loadJQuery = async () => {
      if (typeof window !== "undefined" && !window.$) {
        // Load jQuery from CDN
        return new Promise<void>((resolve) => {
          const script = document.createElement("script");
          script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
          script.onload = () => {
            window.$ = (window as any).jQuery;
            resolve();
          };
          document.head.appendChild(script);
        });
      }
    };

    // Load flipbook script
    const loadFlipbook = async () => {
      if (typeof window !== "undefined" && !window.FLIPBOOK) {
        return new Promise<void>((resolve) => {
          const script = document.createElement("script");
          script.src = "/flipbook/flipbook.js";
          script.onload = () => {
            resolve();
          };
          document.head.appendChild(script);
        });
      }
    };

    const initializeFlipbook = () => {
      if (!containerRef.current || !window.$ || !window.FLIPBOOK) return;

      // Destroy existing instance
      if (flipbookRef.current) {
        try {
          flipbookRef.current.destroy();
        } catch (e) {
          console.log("No existing flipbook to destroy");
        }
      }

      // Initialize new flipbook
      flipbookRef.current = window.$(containerRef.current).flipBook({
        pages: pages,
        name: name,
        startPage: startPage,
        skin: skin,
        layout: layout,
        viewMode: viewMode,
        lightBox: lightBox,
        autoplayOnStart: autoplayOnStart,
        // Additional options
        btnNext: { enabled: true },
        btnPrev: { enabled: true },
        btnZoomIn: { enabled: true },
        btnZoomOut: { enabled: true },
        btnToc: { enabled: true },
        btnThumbs: { enabled: true },
        btnShare: { enabled: true },
        btnPrint: { enabled: true },
        btnDownloadPages: { enabled: true },
        btnSound: { enabled: true },
        btnExpand: { enabled: true },
        sideNavigationButtons: true,
        zoomMin: 0.95,
        zoomMax: 3,
        zoomStep: 2,
        sound: true,
        backgroundColor: "rgb(81, 85, 88)",
        backgroundTransparent: true,
        thumbSize: 130,
        loadAllPages: false,
        loadPagesF: 2,
        loadPagesB: 1,
        autoplayInterval: 3000,
        autoplayLoop: true,
        icons: "svg",
        assets: {
          preloader: "/images/preloader.jpg",
          overlay: "/images/overlay.png",
          flipMp3: "/flipbook/turnPage.mp3",
          spinner: "/images/spinner.gif",
        },
      });
    };

    const init = async () => {
      await loadJQuery();
      await loadFlipbook();
      initializeFlipbook();
    };

    init();

    // Cleanup on unmount
    return () => {
      if (flipbookRef.current) {
        try {
          flipbookRef.current.destroy();
        } catch (e) {
          console.log("Error destroying flipbook:", e);
        }
      }
    };
  }, [
    pages,
    name,
    startPage,
    skin,
    layout,
    viewMode,
    lightBox,
    autoplayOnStart,
  ]);

  return (
    <>
      {/* Load CSS */}
      <link rel="stylesheet" href="/flipbook/flipbook.style.css" />
      <link rel="stylesheet" href="/flipbook/flipbook-svg-icons.css" />

      {/* Container */}
      <div
        ref={containerRef}
        className={`flipbook-container w-screen h-screen ${className}`}
      />
    </>
  );
}
