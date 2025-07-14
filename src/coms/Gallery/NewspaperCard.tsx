"use client";

import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";
import FlipbookModal from "./FlipbookModal";

interface NewspaperCardProps {
  item: any;
  catId: number;
}

const NewspaperCard = ({ item, catId }: NewspaperCardProps) => {
  const [showFlipbook, setShowFlipbook] = useState(false);

  const handleCardClick = () => {
    setShowFlipbook(true);
  };

  const handleCloseFlipbook = () => {
    setShowFlipbook(false);
  };

  return (
    <>
      <li key={item?.id} className="" onClick={handleCardClick}>
        <div className="w-full aspect-[3/4] cursor-pointer bg-blue-50 rounded-[12px] flex items-center justify-center">
          <div className="w-[73%] aspect-[3/4] relative">
            <Image
              src={item?.thumbnail}
              alt={item?.name}
              width={227}
              height={317}
              className="size-full object-cover rounded-[4px] drop-shadow-sm z-20 relative"
            />
            <div className="absolute -bottom-2 origin-bottom scale-[95%] rounded-[4px] size-full bg-[#CEDEF3] z-10" />
            <div className="absolute -bottom-4 origin-bottom scale-[90%] rounded-[4px] size-full bg-[#CEDEF3]/40 z-0" />
          </div>
        </div>
        <div className="mt-2.5">
          <h6 className="text-lg font-semibold">{item?.name}</h6>
          <span className="text-xsm text-gray-700 mt-[2px]">
            {dayjs(item?.published_at).format("DD/MM/YYYY")}
          </span>
        </div>
      </li>

      {/* Flipbook Modal */}
      <FlipbookModal
        isOpen={showFlipbook}
        onClose={handleCloseFlipbook}
        slug={item?.slug}
        catId={catId}
      />
    </>
  );
};

export default NewspaperCard;
