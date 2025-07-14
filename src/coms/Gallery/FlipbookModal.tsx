"use client";

import { useEffect, useState } from "react";
import FlipbookViewer, { FlipbookPage } from "@/coms/Flipbook/FlipbookViewer";
import axios, { AxiosResponse } from "axios";
import { GalleryProps } from "@/type/article";
import { IconLoader2, IconX } from "../Icon/light";

interface FlipbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  slug: string;
  catId: number;
}

export default function FlipbookModal({
  isOpen,
  onClose,
  slug,
  catId,
}: FlipbookModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [pages, setPages] = useState<FlipbookPage[]>([]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const res = await axios.get<
          AxiosResponse<{ data: GalleryProps; success: boolean }>
        >(`/api/gallery/${slug}`, {
          params: {
            catId: catId,
          },
        });

        // Convert object data to array format
        const contentData = (res?.data?.data as any)?.content as Record<
          string,
          any
        >;

        const contentArr: FlipbookPage[] = Object.values(contentData)
          .sort((a, b) => {
            return Number(a?.position) - Number(b?.position);
          })
          .map((item) => ({
            src: item?.picture,
            thumb: item?.picture,
            title: item?.title,
          }));

        setPages(contentArr);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen && slug) {
      fetchData();
    }
  }, [slug, isOpen]);

  const renderContent = () => {
    if (isError) {
      return (
        <div className="size-full flex-col flex justify-center items-center gap-4">
          <span className="text-2xl text-white font-bold">
            Lỗi khi tải bản in
          </span>
          <button className="bg-primary h-8 px-4 rounded-md text-white font-medium cursor-pointer">
            Tải lại
          </button>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="size-full flex items-center justify-center">
          <IconLoader2 className="animate-spin text-white" size={32} />
        </div>
      );
    }

    if (pages?.length <= 0) {
      return (
        <div className="size-full flex-col flex justify-center items-center gap-4">
          <span className="text-2xl text-white font-bold">
            Không có dữ liệu
          </span>
        </div>
      );
    }

    return <FlipbookViewer pages={pages} />;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <button
        onClick={onClose}
        className="absolute z-10 cursor-pointer top-0 right-0 size-12 bg-black/20 flex items-center justify-center"
      >
        <IconX className="text-white" size={24} />
      </button>
      {renderContent()}
    </div>
  );
}
