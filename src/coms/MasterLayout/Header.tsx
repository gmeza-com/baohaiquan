import { IconList, IconMagnifyingGlass, IconMenu2 } from "@/coms/Icon/light";
import {
  IconBrandFacebook,
  IconBrandYoutube,
  IconBrandZalo,
  IconNewspaper,
  IconTelevisionSimple,
} from "@/coms/Icon/fill";

import Link from "next/link";
import { headers } from "next/headers";
import { isOn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shadcn/ui/sheet";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/shadcn/ui/accordion";
import navigateService from "@/lib/router";
import SearchButton from "./SearchButton";
import HeadNavMenu from "./HeadNavMenu";
import StickyMenu from "./StickyMenu";
import dayjs from "@/lib/dayjs";

interface HeaderProps {
  menuItems: any[];
}

const Header: React.FC<HeaderProps> = async ({ menuItems }) => {
  const path = (await headers()).get("x-pathname") || "";

  // get the last part of the path
  const slug = path.split("/").pop() || "";

  return (
    <>
      <header
        id="main-header"
        className="bg-blue-700 max-w-screen sticky top-0 z-40 lg:static"
      >
        <HeaderInformation />
        <div className="container mx-auto gap-12 flex w-full !py-0">
          <Link href="/" className="hidden shrink-0 items-end xl:flex py-3">
            <img
              src="/logo.svg"
              alt="Logo"
              className="xl:w-[210px] 2xl:w-[248px] h-auto"
            />
          </Link>
          <div className="flex-1 flex flex-col gap-1">
            {/* Mobile Header */}
            <div className="grid grid-cols-[1fr_auto_1fr] py-2 xl:hidden lg:border-b border-blue-600">
              <div className="flex items-center justify-start">
                <MenuSidebar data={menuItems} />
              </div>
              <Link href="/">
                <img src="/logo.svg" alt="Logo" className="w-[216px]" />
              </Link>
              <div className="flex items-center justify-end">
                <SearchButton>
                  <div className="p-2 rounded cursor-pointer hover:bg-blue-600 transition lg:hidden">
                    <IconMagnifyingGlass className="text-white/90" size={24} />
                  </div>
                </SearchButton>
              </div>
            </div>

            {/* Desktop Header */}
            <div className="hidden xl:flex justify-end items-center gap-1 pt-2">
              <Link
                href={navigateService.getGalleryCollection("bao-in")}
                className="pl-2 pr-3 py-1 rounded bg-blue-600 hover:bg-blue-500 transition flex text-sm items-center gap-2 uppercase text-white font-normal leading-[160%] tracking-[0%] align-middle"
              >
                <IconNewspaper size={20} className="text-white/90" />
                Báo In
              </Link>
              <Link
                href={navigateService.getGalleryCollection(
                  "truyen-hinh-hai-quan"
                )}
                className="pl-2 pr-3 py-1 rounded bg-blue-600 hover:bg-blue-500 transition flex items-center gap-2 uppercase text-white font-normal text-sm leading-[160%] tracking-[0%] align-middle"
              >
                <IconTelevisionSimple size={20} className="text-white/90" />
                Truyền Hình Hải Quân
              </Link>
              <SearchButton sideOffset={-25}>
                <div className="p-1 rounded cursor-pointer hover:bg-blue-500 transition">
                  <IconMagnifyingGlass size={20} className="text-white/90" />
                </div>
              </SearchButton>
            </div>

            {/* Nav menu for wide screen */}
            <HeadNavMenu
              className="hidden lg:block mt-2"
              path={path}
              menuItems={menuItems}
              slug={slug}
            />
          </div>
        </div>
      </header>

      <StickyMenu path={path} menuItems={menuItems} slug={slug} />
    </>
  );
};

export default Header;

const MenuSidebar: React.FC<{ data: any[] }> = ({ data }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-2 rounded cursor-pointer hover:bg-blue-600 transition lg:hidden outline-0">
          <IconList className="text-white/90" size={24} />
        </button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="text-sm px-2 font-light"></SheetTitle>
        </SheetHeader>
        <div className="px-6 font-myriad-pro text-lg">
          <div className="border-b">
            <Link
              className="py-4 block font-medium focus-within:text-blue-700"
              href="/"
            >
              Trang Chủ
            </Link>
          </div>
          <Accordion type="single" collapsible>
            {data.map((item, idx) => {
              return isOn(item.childrens) ? (
                <AccordionItem
                  key={idx}
                  value={`item-${item.id}`}
                  className="py-1"
                >
                  <AccordionTrigger>
                    <Link
                      href={`/danh-muc/${item.attributes.category_slug}`}
                      className="truncate no-underline focus-within:text-blue-700"
                    >
                      {item.name}
                    </Link>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="w-full flex flex-col gap-1 font-normal pl-3">
                      {item.childrens.map((child: any) => (
                        <li key={child.id}>
                          <Link
                            href={`/danh-muc/${child.attributes.category_slug}`}
                            className="truncate block cursor-pointer py-1 focus-within:text-blue-700"
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ) : (
                <div key={item.attributes.category_slug} className="border-b">
                  <Link
                    className="py-4 block font-medium"
                    href={`/danh-muc/${item.attributes.category_slug}`}
                  >
                    {item.name}
                  </Link>
                </div>
              );
            })}
          </Accordion>
          <div className="border-b">
            <Link
              className="py-4 block font-medium"
              href={navigateService.getGalleryCollection("bao-in")}
            >
              Báo In
            </Link>
          </div>
          <div>
            <Link
              className="py-4 block font-medium"
              href={navigateService.getGalleryCollection(
                "truyen-hinh-hai-quan"
              )}
            >
              Truyền Hình Hải Quân
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const HeaderInformation: React.FC = () => {
  return (
    <div className="w-full bg-blue-800 h-9">
      <div className="container !py-0 mx-auto flex items-center justify-between h-full">
        <div className="flex items-center gap-4">
          <span className="uppercase text-white text-xsm leading-[160%] tracking-[0%]">
            {dayjs().format("dddd, D/M/YYYY")}
          </span>{" "}
          <span className="text-white/50 font-light text-xsm -mt-0.5">|</span>
          <span className="uppercase text-white text-xsm leading-[160%] tracking-[0%]">
            Liên hệ
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="uppercase text-white text-xsm leading-[160%] tracking-[0%]">
            Theo dõi báo trên
          </span>

          <div className="flex items-center gap-1.5">
            <Link href="#" className="size-9 flex items-center justify-center">
              <IconBrandZalo size={16} />
            </Link>
            <Link href="#" className="size-9 flex items-center justify-center">
              <IconBrandYoutube size={16} className="text-white/90" />
            </Link>
            <Link href="#" className="size-9 flex items-center justify-center">
              <IconBrandFacebook size={16} className="text-white/90" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
