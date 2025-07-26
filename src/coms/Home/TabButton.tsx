import clsx from "clsx";
import Link from "next/link";

interface TabButtonProps {
  title: string;
  link: string;
  className?: string;
}

const TabButton: React.FC<TabButtonProps> = ({ title, link, className }) => {
  return (
    <Link
      href={link}
      className={clsx(
        "whitespace-nowrap focus:bg-blue-700 focus:text-white flex items-center justify-center cursor-pointer h-9 px-4 rounded-full border hover:bg-blue-700 hover:text-white transition-colors border-blue-200 text-blue-700 font-semibold text-xsm leading-[160%] tracking-[0%]",
        className
      )}
    >
      {title}
    </Link>
  );
};

export default TabButton;
