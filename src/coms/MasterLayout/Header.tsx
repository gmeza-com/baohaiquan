import clsx from "clsx";
import { IconList, IconMagnifyingGlass, IconUser } from "@/coms/Icon/light";
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

interface HeaderProps {
  menuItems: any[];
}

const Header: React.FC<HeaderProps> = async ({ menuItems }) => {
  return (
    <header className="bg-blue-700">
      <div className="container lg:py-2 mx-auto gap-8 flex w-full">
        <button className="hidden lg:block shrink-0">
          <img src="/logo.svg" alt="Logo" className="w-[248.62px]" />
        </button>
        <div className="flex-1 flex flex-col gap-1">
          {/* Mobile Header */}
          <div className="grid grid-cols-[1fr_auto_1fr] py-2 border-b border-blue-600 lg:hidden">
            <MenuButton classNames="ms-1" />
            <img src="/logo.svg" alt="Logo" className="w-[198.89px]" />
            <div className="flex items-center justify-end">
              <button className="w-10 h-11 flex items-center justify-center">
                <IconMagnifyingGlass className="text-white/90" size={22} />
              </button>
              <button className="w-10 h-11 flex items-center justify-center">
                <IconUser className="text-white/90" size={22} />
              </button>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:flex justify-end items-center gap-1">
            <button className="h-10 px-2.5 flex items-center gap-2 uppercase text-white font-normal text-base leading-[160%] tracking-[0%] align-middle">
              <IconNewspaper size={20} className="text-white/90" />
              Báo In
            </button>
            <button className="h-10 px-2.5 flex items-center gap-2 uppercase text-white font-normal text-base leading-[160%] tracking-[0%] align-middle">
              <IconTelevisionSimple size={20} className="text-white/90" />
              Truyền hình
            </button>
            <button className="size-10 flex items-center justify-center">
              <IconMagnifyingGlass size={20} className="text-white/90" />
            </button>
          </div>

          {/* Nav */}
          <NavMenu viewport={false}>
            <NavMenuList>
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
                      <ul className="min-w-36 flex flex-col gap-1">
                        {item.childrens.map((child: any) => (
                          <li key={child.id}>
                            <NavMenuLink
                              asChild
                              href={`/danh-muc/${child.attributes.category_slug}`}
                              className="truncate font-medium"
                            >
                              <Link
                                href={`/danh-muc/${child.attributes.category_slug}`}
                                className="truncate font-medium"
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
            </NavMenuList>
          </NavMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;

interface MenuButtonProps {
  classNames?: string;
}

const MenuButton: React.FC<MenuButtonProps> = ({ classNames }) => {
  return (
    <button
      className={clsx("size-12 flex justify-center items-center", classNames)}
    >
      <IconList className="text-white/90" size={24} />
    </button>
  );
};
