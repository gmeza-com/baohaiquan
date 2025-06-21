import clsx from "clsx";
import { IconList, IconMagnifyingGlass, IconUser } from "../Icon/light";
import { IconHome, IconNewspaper, IconTelevisionSimple } from "../Icon/fill";
import { CategoryTree } from "@/type/category";

interface HeaderProps {
  categories: CategoryTree[];
}

const Header: React.FC<HeaderProps> = async ({ categories }) => {
  return (
    <header className="bg-blue-700">
      <div className="lg:container lg:py-2 mx-auto gap-8 flex overflow-hidden w-full">
        <button className="hidden lg:block shrink-0">
          <img src="/logo.svg" alt="Logo" className="w-[248.62px]" />
        </button>
        <div className="flex-1 overflow-hidden flex flex-col gap-1">
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
          <nav className="border-b border-blue-700 flex items-center lg:gap-1.5">
            <div className="bg-blue-700 w-[52px] h-[48px] lg:size-10 flex items-center gap-2 px-2 py-1.5">
              <button className="size-full flex items-center justify-center">
                <IconHome size={20} className="text-white/90" />
              </button>
            </div>
            <div className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-2.5 lg:gap-1.5">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className="whitespace-nowrap size-full px-1 lg:px-2 lg:py-3 lg:font-bold text-base leading-[160%] tracking-[0%] align-middle text-white font-anton lg:font-roboto font-normal"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </nav>
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
