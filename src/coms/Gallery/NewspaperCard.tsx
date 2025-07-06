"use client";

import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";
import FlipbookModal from "./FlipbookModal";

interface NewspaperCardProps {
  item: any;
}

const NewspaperCard = ({ item }: NewspaperCardProps) => {
  const [showFlipbook, setShowFlipbook] = useState(false);

  const handleCardClick = () => {
    setShowFlipbook(true);
  };

  const handleCloseFlipbook = () => {
    setShowFlipbook(false);
  };

  return (
    <>
      <li
        key={item?.id}
        className="relative cursor-pointer hover:scale-105 transition-all duration-300 group"
        onClick={handleCardClick}
      >
        <div className="w-full aspect-[3/4] shadow-xl">
          <Image
            src={item?.thumbnail}
            alt={item?.name}
            width={276}
            height={385}
            className="size-full object-cover"
          />

          <div className="absolute pointer-events-none bottom-0 left-0 w-full h-full bg-black/50 items-center justify-center flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <h6 className="text-center text-white font-bold text-2xl">
              {item?.name}
            </h6>
            <span className="text-white text-lg font-medium">
              ({`${dayjs(item?.published_at).format("DD/MM/YYYY")}`})
            </span>
          </div>
        </div>
      </li>

      {/* Flipbook Modal */}
      <FlipbookModal
        isOpen={showFlipbook}
        onClose={handleCloseFlipbook}
        slug={item?.slug}
      />
    </>
  );
};

export default NewspaperCard;
