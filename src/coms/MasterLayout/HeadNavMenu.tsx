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
import { getCategoryHref, isOn } from "@/lib/utils";
import clsx from "clsx";
import MoreNavMenuItem from "./MoreNavMenuItem";
import { IMenuItem } from "@/type/menu";

export interface HeadNavMenuProps {
  menuItems: IMenuItem[];
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
        {menuItems?.slice(0, 7).map((item) => {
          return isOn(item.childrens) ? (
            <NavMenuItem
              key={item.id}
              className={isActive?.(item) ? "active" : ""}
            >
              <NavMenuTrigger>
                <Link href={getCategoryHref(item)}>{item.name}</Link>
              </NavMenuTrigger>
              <NavMenuContent className="bg-blue-600 menu-up-arrow">
                <ul className="min-w-36 flex flex-col gap-1 text-white">
                  {(item.childrens || []).map((child: any) => (
                    <li key={child.id}>
                      <NavMenuLink
                        asChild
                        className={isActive?.(child) ? "active" : ""}
                      >
                        <Link
                          href={getCategoryHref(child)}
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
                href={getCategoryHref(item)}
              >
                {item.name}
              </NavMenuLink>
            </NavMenuItem>
          );
        })}

        <MoreNavMenuItem menuItems={menuItems?.slice(7)} />
      </NavMenuList>
    </NavMenu>
  );
};

export default HeadNavMenu;
