import { IconList, IconMagnifyingGlass, IconMenu2 } from "@/coms/Icon/light";
import {
  IconHome,
  IconNewspaper,
  IconTelevisionSimple,
} from "@/coms/Icon/fill";

import {
  NavMenu,
  NavMenuContent,
  NavMenuItem,
  NavMenuLink,
  NavMenuList,
  NavMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/shadcn/ui/nav-menu";
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

interface HeaderProps {
  menuItems: any[];
}

const Header: React.FC<HeaderProps> = async ({ menuItems }) => {
  const path = (await headers()).get("x-pathname") || "";

  // get the last part of the path
  const slug = path.split("/").pop() || "";

  const isActive = (item: any) => {
    if (isOn(path)) {
      if (item.attributes.category_slug === slug) return true;

      if (item.childrens)
        return item.childrens.some(
          (child: any) => child.attributes.category_slug === slug
        );
    }

    return false;
  };

  return (
    <header className="bg-blue-700 max-w-screen sticky top-0 z-40 lg:static">
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
              <a
                href="/tim-kiem"
                className="p-2 rounded cursor-pointer hover:bg-blue-600 transition lg:hidden"
              >
                <IconMagnifyingGlass className="text-white/90" size={24} />
              </a>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden xl:flex justify-end items-center gap-1 pt-2">
            <Link
              href="/bao-in-hai-quan-3d"
              className="pl-2 pr-3 py-1 rounded bg-blue-600 hover:bg-blue-500 transition flex text-sm items-center gap-2 uppercase text-white font-normal leading-[160%] tracking-[0%] align-middle"
            >
              <IconNewspaper size={20} className="text-white/90" />
              Báo In
            </Link>
            <Link
              href="/truyen-hinh-hai-quan"
              className="pl-2 pr-3 py-1 rounded bg-blue-600 hover:bg-blue-500 transition flex items-center gap-2 uppercase text-white font-normal text-sm leading-[160%] tracking-[0%] align-middle"
            >
              <IconTelevisionSimple size={20} className="text-white/90" />
              Truyền Hình Hải Quân
            </Link>
            <a
              href="/tim-kiem"
              className="p-1 rounded cursor-pointer hover:bg-blue-500 transition"
            >
              <IconMagnifyingGlass size={20} className="text-white/90" />
            </a>
          </div>

          {/* Nav menu for wide screen */}
          <NavMenu
            viewport={false}
            className="hidden lg:block mt-2 font-myriad-pro text-lg"
          >
            <NavMenuList>
              <NavMenuItem className={path == "/" ? "active" : ""}>
                <NavMenuLink asChild className="py-1 hover:bg-blue-600">
                  <Link href="/">
                    <IconHome className="text-white inline-block" size={24} />
                  </Link>
                </NavMenuLink>
              </NavMenuItem>
              {menuItems.map((item) => {
                return isOn(item.childrens) ? (
                  <NavMenuItem
                    key={item.id}
                    className={isActive(item) ? "active" : ""}
                  >
                    <NavMenuTrigger>
                      <Link href={`/danh-muc/${item.attributes.category_slug}`}>
                        {item.name}
                      </Link>
                    </NavMenuTrigger>
                    <NavMenuContent className="bg-blue-600 menu-up-arrow">
                      <ul className="min-w-36 flex flex-col gap-1 text-white">
                        {item.childrens.map((child: any) => (
                          <li key={child.id}>
                            <NavMenuLink
                              asChild
                              className={isActive(child) ? "active" : ""}
                            >
                              <Link
                                href={`/danh-muc/${child.attributes.category_slug}`}
                                className="truncate"
                              >
                                {child.name}
                              </Link>
                            </NavMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavMenuContent>
                  </NavMenuItem>
                ) : (
                  <NavMenuItem
                    key={item.id}
                    className={isActive(item) ? "active" : ""}
                  >
                    <NavMenuLink
                      className={navigationMenuTriggerStyle()}
                      href={`/danh-muc/${item.attributes.category_slug}`}
                    >
                      {item.name}
                    </NavMenuLink>
                  </NavMenuItem>
                );
              })}

              <NavMenuItem className="hidden lg:block xl:hidden">
                <NavMenuTrigger className="flex cursor-pointer">
                  <IconMenu2 width={20} height={26} className="inline-flex" />
                </NavMenuTrigger>
                <NavMenuContent className="bg-blue-600 menu-up-arrow right-0 left-auto min-w-44">
                  <ul className="flex flex-col gap-1 text-white">
                    <li>
                      <NavMenuLink asChild>
                        <Link href="/bao-in-hai-quan-3d" className="truncate">
                          Báo In
                        </Link>
                      </NavMenuLink>
                    </li>
                    <li>
                      <NavMenuLink asChild>
                        <Link href="/truyen-hinh-hai-quan" className="truncate">
                          Truyền Hình Hải Quân
                        </Link>
                      </NavMenuLink>
                    </li>
                  </ul>
                </NavMenuContent>
              </NavMenuItem>
            </NavMenuList>
          </NavMenu>
        </div>
      </div>
    </header>
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
            <Link className="py-4 block font-medium" href="/">
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
                      className="truncate no-underline"
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
                            className="truncate block cursor-pointer py-1"
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
            <Link className="py-4 block font-medium" href="/bao-in-hai-quan-3d">
              Báo In
            </Link>
          </div>
          <div>
            <Link
              className="py-4 block font-medium"
              href="/truyen-hinh-hai-quan"
            >
              Truyền Hình Hải Quân
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
