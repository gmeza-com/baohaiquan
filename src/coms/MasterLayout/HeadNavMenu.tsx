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
import { IconHome } from "../Icon/fill";
import { isOn } from "@/lib/utils";
import { IconMenu2 } from "../Icon/light";
import navigateService from "@/lib/router";
import clsx from "clsx";

export interface HeadNavMenuProps {
  menuItems: any[];
  path: string;
  className?: string;
  preventStretch?: boolean;
  slug?: string;
}

const HeadNavMenu: React.FC<HeadNavMenuProps> = ({
  menuItems,
  path,
  className,
  preventStretch,
  slug,
}) => {
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
    <NavMenu
      viewport={false}
      className={clsx(className, "font-myriad-pro text-lg")}
    >
      <NavMenuList className={clsx(preventStretch ? "xl:justify-center" : "")}>
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
              className={isActive?.(item) ? "active" : ""}
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
                        className={isActive?.(child) ? "active" : ""}
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
              className={isActive?.(item) ? "active" : ""}
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

        <NavMenuItem
          className={clsx(
            "hidden lg:block ",
            preventStretch ? "" : "xl:hidden"
          )}
        >
          <NavMenuTrigger className="flex cursor-pointer">
            <IconMenu2 width={20} height={26} className="inline-flex" />
          </NavMenuTrigger>
          <NavMenuContent className="bg-blue-600 menu-up-arrow right-0 left-auto min-w-44">
            <ul className="flex flex-col gap-1 text-white">
              <li>
                <NavMenuLink asChild>
                  <Link
                    href={navigateService.getGalleryCollection("bao-in")}
                    className="truncate"
                  >
                    Báo In
                  </Link>
                </NavMenuLink>
              </li>
              <li>
                <NavMenuLink asChild>
                  <Link
                    href={navigateService.getGalleryCollection(
                      "truyen-hinh-hai-quan"
                    )}
                    className="truncate"
                  >
                    Truyền Hình Hải Quân
                  </Link>
                </NavMenuLink>
              </li>
            </ul>
          </NavMenuContent>
        </NavMenuItem>
      </NavMenuList>
    </NavMenu>
  );
};

export default HeadNavMenu;
