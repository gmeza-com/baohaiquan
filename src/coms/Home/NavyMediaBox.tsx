import clsx from "clsx";

interface NavyMediaBoxProps {
  className?: string;
}

const NavyMediaBox: React.FC<NavyMediaBoxProps> = ({ className }) => {
  return (
    <div className={clsx("@container/navy-media-box", className)}>
      <img
        src="https://picsum.photos/500/300"
        className="object-cover w-full rounded-[6px]"
      />
      <div className="flex flex-col gap-4 @min-[900px]/navy-media-box:gap-6 mt-4 @min-[900px]/navy-media-box:mt-10 @min-[900px]/navy-media-box:flex-row">
        {Array.from({ length: 3 }).map((_, index) => (
          <NavyMediaItem
            key={index}
            title="Ban Thường vụ Đảng ủy Quân chủng thông qua công tác chuẩn bị Đại hội đại biểu Đảng bộ Cục Chính trị"
            image="https://picsum.photos/500/300"
            active={index === 0}
          />
        ))}
      </div>
    </div>
  );
};

export default NavyMediaBox;

interface NavyMediaItemProps {
  title: string;
  image: string;
  active?: boolean;
}

const NavyMediaItem: React.FC<NavyMediaItemProps> = ({
  title,
  image,
  active,
}) => {
  return (
    <div
      className={clsx(
        "relative flex items-start gap-3 ps-4 @min-[900px]/navy-media-box:ps-0 @min-[900px]/navy-media-box:pt-3 @min-[900px]/navy-media-box:border-t-4",
        active ? "border-blue-500" : "border-transparent"
      )}
    >
      {active && (
        <div className="absolute h-full w-[4px] top-0 left-0 bg-blue-500 @min-[900px]/navy-media-box:hidden" />
      )}
      <img
        src={image}
        className="object-cover w-[120px] aspect-video rounded-[6px] mt-1"
      />
      <p
        className={clsx(
          "line-clamp-4 text-xsm font-medium leading-[150%] tracking-[0%]",
          active ? "text-blue-700" : "text-gray-900"
        )}
      >
        {title}
      </p>
    </div>
  );
};
