import clsx from "clsx";
import { IconMenu2, IconSearch, IconUser } from "../Icon/light";
import { IconHome } from "../Icon/fill";
import { categoriesAPI } from "@/lib/api";

const Header: React.FC = async () => {
  const categories = await categoriesAPI.getCategories();

  console.log("categories", categories);

  return (
    <header className="bg-blue-700">
      <div className="grid grid-cols-[1fr_auto_1fr] py-2 border-b border-blue-600">
        <MenuButton classNames="ms-1" />
        <img src="/logo.svg" alt="Logo" className="w-[198.89px]" />
        <div className="flex items-center justify-end">
          <button className="w-10 h-11 flex items-center justify-center">
            <IconSearch className="text-white/90" size={22} />
          </button>
          <button className="w-10 h-11 flex items-center justify-center">
            <IconUser className="text-white/90" size={22} />
          </button>
        </div>
      </div>
      <nav className="border-b border-blue-700 flex">
        <div className="bg-blue-700 w-[52px] h-[48px] flex items-center gap-2 px-2 py-1.5">
          <button className="size-full flex items-center justify-center">
            <IconHome size={20} className="text-white/90" />
          </button>
        </div>
        <div className="flex-1 overflow-x-auto flex items-center gap-2.5">
          {categories.data.map((category) => (
            <button
              key={category.id}
              className="whitespace-nowrap size-full px-1 font-anton font-normal text-[15px] leading-[160%] tracking-[0%] align-middle text-white"
            >
              {category.name}
            </button>
          ))}
        </div>
      </nav>
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
      <IconMenu2 className="text-white/90" size={24} />
    </button>
  );
};
