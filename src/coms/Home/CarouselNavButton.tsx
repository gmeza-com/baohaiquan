import clsx from "clsx";
import { IconCaretRight } from "../Icon/light";

interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  isLeft?: boolean;
}

const CarouselNavButton: React.FC<NavButtonProps> = ({
  className,
  isLeft,
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(
        "size-10 flex items-center justify-center bg-white border-[1.25px] rounded-full border-blue-200 text-blue-700 cursor-pointer pointer-events-auto",
        className
      )}
    >
      <IconCaretRight size={20} className={clsx(isLeft && "rotate-180")} />
    </button>
  );
};

export default CarouselNavButton;
