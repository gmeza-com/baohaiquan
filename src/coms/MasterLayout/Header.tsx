import clsx from "clsx";
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
import { isOn } from "@/lib/utils";
import { anton } from "@/app/font";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";

interface HeaderProps {
  menuItems: any[];
}

const Header: React.FC<HeaderProps> = async ({ menuItems }) => {
  return (
    <header className="bg-blue-700 max-w-screen sticky top-0 z-40 lg:static">
      <div className="container mx-auto gap-12 flex w-full">
        <Link href="/" className="hidden shrink-0 items-end xl:flex pb-1">
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
              <MenuButton data={menuItems} />
            </div>
            <Link href="/">
              <img src="/logo.svg" alt="Logo" className="w-[216px]" />
            </Link>
            <div className="flex items-center justify-end">
              <button className="p-1 rounded cursor-pointer hover:bg-blue-600 transition lg:hidden">
                <IconMagnifyingGlass className="text-white/90" size={24} />
              </button>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden xl:flex justify-end items-center gap-1">
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
              Truyền hình
            </Link>
            <button className="p-1 rounded cursor-pointer hover:bg-blue-500 transition">
              <IconMagnifyingGlass size={20} className="text-white/90" />
            </button>
          </div>

          {/* Nav menu for wide screen */}
          <NavMenu viewport={false} className="hidden lg:block mt-2">
            <NavMenuList className={`${anton.variable} font-anton`}>
              <NavMenuItem>
                <NavMenuLink
                  className={`${navigationMenuTriggerStyle()} px-1`}
                  href="/"
                >
                  <IconHome className="text-white" size={20} />
                </NavMenuLink>
              </NavMenuItem>
              {menuItems.map((item) => {
                return isOn(item.childrens) ? (
                  <NavMenuItem key={item.id}>
                    <NavMenuTrigger>
                      <Link href={`/danh-muc/${item.attributes.category_slug}`}>
                        {item.name}
                      </Link>
                    </NavMenuTrigger>
                    <NavMenuContent>
                      <ul className="min-w-36 flex flex-col gap-1 font-oswald">
                        {item.childrens.map((child: any) => (
                          <li key={child.id}>
                            <NavMenuLink asChild>
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
                  <NavMenuItem key={item.id}>
                    <NavMenuLink
                      className={navigationMenuTriggerStyle()}
                      href={`/danh-muc/${item.attributes.category_slug}`}
                    >
                      {item.name}
                    </NavMenuLink>
                  </NavMenuItem>
                );
              })}

              <NavMenuItem className="hidden lg:flex xl:hidden">
                <NavMenuTrigger className="cursor-pointer">
                  <IconMenu2 />
                </NavMenuTrigger>
                <NavMenuContent>
                  <ul className="min-w-36 flex flex-col gap-1 font-oswald">
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
                          Truyền Hình
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

const MenuButton: React.FC<{ data: any[] }> = ({ data }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-1 rounded cursor-pointer hover:bg-blue-600 transition lg:hidden outline-0">
          <IconList className="text-white/90" size={24} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="font-anton p-3">
        <DropdownMenuItem className="my-1">
          <Link href="/">Trang Chủ</Link>
        </DropdownMenuItem>
        {data.map((item, idx) => {
          return isOn(item.childrens) ? (
            <DropdownMenuSub key={idx}>
              <DropdownMenuSubTrigger className="my-1">
                <Link href={`/danh-muc/${item.attributes.category_slug}`}>
                  {item.name}
                </Link>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <ul className="min-w-36 flex flex-col gap-1 font-oswald font-medium">
                    {item.childrens.map((child: any) => (
                      <li key={child.id}>
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/danh-muc/${child.attributes.category_slug}`}
                            className="truncate cursor-pointer"
                          >
                            {child.name}
                          </Link>
                        </DropdownMenuItem>
                      </li>
                    ))}
                  </ul>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          ) : (
            <DropdownMenuItem key={idx}>
              <Link href={`/danh-muc/${item.attributes.category_slug}`}>
                {item.name}
              </Link>
            </DropdownMenuItem>
          );
        })}

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/bao-in-hai-quan-3d">Báo In</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/truyen-hinh-hai-quan">Truyền Hình Hải Quân</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
