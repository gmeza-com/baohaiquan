"use client";

import {
  NavMenuContent,
  NavMenuItem,
  NavMenuLink,
  NavMenuTrigger,
} from "@/shadcn/ui/nav-menu";
import clsx from "clsx";
import { IconMenu2 } from "../Icon/light";
import Link from "next/link";
import navigateService from "@/lib/router";
import { useMediaQuery } from "@uidotdev/usehooks";
import { IMenuItem } from "@/type/menu";
import { isOn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shadcn/ui/tooltip";

interface MoreNavMenuItemProps {
  menuItems: IMenuItem[];
}

const MoreNavMenuItem: React.FC<MoreNavMenuItemProps> = ({ menuItems }) => {
  const isSmallThanXl = useMediaQuery("screen and (max-width: 1279px)");

  console.log("menuItems", menuItems);

  if (menuItems?.length <= 0 && !isSmallThanXl) return null;

  return (
    <NavMenuItem>
      <NavMenuTrigger className="flex cursor-pointer">
        <IconMenu2 width={20} height={26} className="inline-flex" />
      </NavMenuTrigger>
      <NavMenuContent className="bg-blue-600 menu-up-arrow right-0 left-auto min-w-44">
        <ul className="flex flex-col gap-1 text-white">
          {menuItems.map((item) => {
            if (isOn(item.childrens)) {
              return (
                <Tooltip>
                  <TooltipTrigger>
                    <li key={item.id}>
                      <NavMenuLink asChild>
                        <Link
                          href={`/danh-muc/${item.attributes.category_slug}`}
                          className="truncate text-right"
                        >
                          {item.name}
                        </Link>
                      </NavMenuLink>
                    </li>
                  </TooltipTrigger>
                  <TooltipContent
                    side="left"
                    align="start"
                    className="bg-blue-600 min-w-44 [&>span>svg]:fill-blue-600 [&>span>svg]:bg-blue-600 rounded"
                  >
                    <ul className="flex flex-col gap-1 text-white font-myriad-pro text-lg">
                      {(item.childrens || []).map((child) => {
                        return (
                          <li key={child.id}>
                            <NavMenuLink asChild>
                              <Link
                                href={`/danh-muc/${child.attributes.category_slug}`}
                                className="truncate text-right"
                              >
                                {child.name}
                              </Link>
                            </NavMenuLink>
                          </li>
                        );
                      })}
                    </ul>
                  </TooltipContent>
                </Tooltip>
              );
            }

            return (
              <li key={item.id}>
                <NavMenuLink asChild>
                  <Link
                    href={`/danh-muc/${item.attributes.category_slug}`}
                    className="truncate text-right"
                  >
                    {item.name}
                  </Link>
                </NavMenuLink>
              </li>
            );
          })}
          {isSmallThanXl && (
            <>
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
            </>
          )}
        </ul>
      </NavMenuContent>
    </NavMenuItem>
  );
};

export default MoreNavMenuItem;
