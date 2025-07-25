import Image from "next/image";
import Link from "next/link";
import { IconShareNetwork } from "../Icon/light";
import ShareList from "../Article/ShareList";
import { CategoryProps } from "@/type/article";
import navigateService from "@/lib/router";
import clsx from "clsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import { GalleryCategory } from "@/data/category";

interface GalleryDetailHeaderProps {
  category: Omit<CategoryProps, "description">;
  postName?: string;
  mode?: "light" | "dark";
}

const GalleryDetailHeader = ({
  category,
  postName,
  mode = "dark",
}: GalleryDetailHeaderProps) => {
  const isHeaderWithCategory = [GalleryCategory.LONGFORM]?.includes(
    category?.id
  );

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 backdrop-blur-3xl",
        mode === "dark" && "bg-gray-950/95",
        mode === "light" && "bg-blue-700"
      )}
    >
      <div
        className={clsx(
          "container grid items-center",
          isHeaderWithCategory
            ? "lg:grid-cols-[auto_1fr_auto] grid-cols-[auto_1fr] gap-12 overflow-hidden"
            : "grid-cols-[auto_1fr] lg:grid-cols-[1fr_auto_1fr]"
        )}
      >
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={248}
            height={60}
            className="h-10 w-auto lg:h-15"
          />
        </Link>
        {isHeaderWithCategory ? (
          <div className="items-center gap-4 overflow-hidden hidden lg:flex">
            <Link
              href={navigateService.getGalleryCollection(category?.slug)}
              className="text-xl font-bold text-white whitespace-nowrap leading-[140%] tracking-[0%] font-playfair-display"
            >
              {category?.name}
            </Link>
            <div className="w-px h-4 bg-white/50" />{" "}
            <h1 className="text-white text-lg font-semibold leading-[150%] tracking-[0] truncate">
              {postName}
            </h1>
          </div>
        ) : (
          <Link
            href={navigateService.getGalleryCollection(category?.slug)}
            className="hidden lg:block text-white text-[1.75rem] font-playfair-display font-bold tracking-[0%] leading-[140%] "
          >
            {category?.name}
          </Link>
        )}

        <div className="flex items-center justify-end gap-2">
          <Popover>
            <PopoverTrigger>
              <div className="md:hidden">
                <IconShareNetwork className="text-white" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="flex items-center justify-between px-3 py-2">
              <span className="text-black font-normal text-lg leading-[150%] tracking-[0%]">
                Chia sẻ
              </span>{" "}
              <ShareList
                url={`${
                  process.env.NEXT_PUBLIC_APP
                }${navigateService.getGalleryCollection(category?.slug)}`}
              />
            </PopoverContent>
          </Popover>

          <div className="hidden md:flex items-center gap-6">
            <span className="text-white/80 font-normal text-lg leading-[150%] tracking-[0%]">
              Chia sẻ
            </span>{" "}
            <ShareList
              url={`${
                process.env.NEXT_PUBLIC_APP
              }${navigateService.getGalleryCollection(category?.slug)}`}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default GalleryDetailHeader;
