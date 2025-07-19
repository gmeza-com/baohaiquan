import clsx from "clsx";
import { IconCaretLeft } from "../Icon/light";

interface NavButtonPodcastProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isRight?: boolean;
  className?: string;
}

const NavButtonPodcast: React.FC<NavButtonPodcastProps> = ({
  isRight,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(
        "size-9 rounded-full flex items-center justify-center text-blue-700 bg-blue-100/65 pointer-events-auto cursor-pointer",
        className
      )}
    >
      <IconCaretLeft size={20} className={clsx(isRight && "rotate-180")} />
    </button>
  );
};

export default NavButtonPodcast;
