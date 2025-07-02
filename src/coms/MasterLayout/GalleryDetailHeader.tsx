import Image from "next/image";
import Link from "next/link";
import { IconShareNetwork } from "../Icon/light";
import ShareList from "../Article/ShareList";
import { CategoryProps } from "@/type/article";

interface GalleryDetailHeaderProps {
  category: Omit<CategoryProps, "description">;
}

const GalleryDetailHeader = ({ category }: GalleryDetailHeaderProps) => {
  return (
    <header className="bg-gray-950/95 sticky top-0 z-50 backdrop-blur-3xl">
      <div className="container grid grid-cols-[auto_1fr] lg:grid-cols-[1fr_auto_1fr] items-center">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={248}
            height={60}
            className="h-10 w-auto lg:h-15"
          />
        </Link>
        <Link
          href={`/gallery/collections/${category?.slug}`}
          className="hidden lg:block text-white text-[1.75rem] font-playfair-display font-bold tracking-[0%] leading-[140%] "
        >
          {category?.name}
        </Link>

        <div className="flex items-center justify-end gap-2">
          <button className="md:hidden">
            <IconShareNetwork className="text-white" />
          </button>
          <div className="hidden md:flex items-center gap-6">
            <span className="text-white/80 font-normal text-lg leading-[150%] tracking-[0%]">
              Chia sẻ
            </span>{" "}
            <ShareList />
          </div>
        </div>
      </div>
    </header>
  );
};

export default GalleryDetailHeader;
