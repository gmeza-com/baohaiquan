import clsx from "clsx";
import { IconCaretLeft } from "../Icon/light";

interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isRight?: boolean;
  className?: string;
}

const NavButton: React.FC<NavButtonProps> = ({
  isRight,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(
        "size-9 bg-blue-100/65 rounded-full flex items-center justify-center text-blue-700 pointer-events-auto cursor-pointer",
        className
      )}
    >
      <IconCaretLeft size={20} className={clsx(isRight && "rotate-180")} />
    </button>
  );
};

export default NavButton;
