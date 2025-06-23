import Link from "next/link";

interface TabButtonProps {
  title: string;
  link: string;
}

const TabButton: React.FC<TabButtonProps> = ({ title, link }) => {
  return (
    <Link
      href={link}
      className="whitespace-nowrap flex items-center justify-center cursor-pointer h-9 px-4 rounded-full border hover:bg-blue-700 hover:text-white transition-colors border-blue-200 text-blue-700 font-semibold text-xsm leading-[160%] tracking-[0%]"
    >
      {title}
    </Link>
  );
};

export default TabButton;
