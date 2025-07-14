"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import { IconMagnifyingGlass } from "../Icon/light";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cleanTextSearch } from "@/lib/utils";

interface SearchButtonProps {
  children: React.ReactNode;
  sideOffset?: number;
}

const SearchButton = ({ children, sideOffset = -45 }: SearchButtonProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleClickSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchText = cleanTextSearch(search);

    if (searchText.length > 0) {
      router.push(`/tim-kiem?keyword=${searchText}`);
    } else {
      setIsOpen(false);
      setSearch("");
    }
  };

  return (
    <Popover
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setSearch("");
        }
        setIsOpen(open);
      }}
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent
        className="p-0"
        side="left"
        sideOffset={sideOffset}
        align="start"
        hideWhenDetached
      >
        <form className="flex items-center" onSubmit={handleClickSearch}>
          <input
            type="text"
            placeholder="Nhập từ khóa..."
            className="font-medium h-10 text-base border-0 p-3 flex-1 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            type="submit"
            className="flex items-center justify-center shrink-0 size-10 rounded cursor-pointer"
          >
            <IconMagnifyingGlass size={24} className="text-gray-500" />
          </button>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default SearchButton;
