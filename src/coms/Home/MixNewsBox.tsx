import clsx from "clsx";

const MixNewsBox = () => {
  return (
    <div className="flex flex-col gap-4 divide-y divide-stroke-light">
      {Array.from({ length: 14 }).map((_, index) => (
        <MixNewsItem
          key={index}
          title="Binh chủng Công binh kiểm tra công tác kỹ thuật tại Kho 703"
          image="https://picsum.photos/200/300"
          link="https://www.google.com"
          category="Chính trị - Quân sự"
          description="Chiều 27/5, tại Hải Phòng, Đại tá Hà Huy Khánh, Phó Tư lệnh Binh chủng Công binh cùng đoàn công tác đã tiến hành kiểm tra công tác kỹ thuật công binh tại Kho..."
          className="pb-4 last:pb-0"
        />
      ))}
    </div>
  );
};

export default MixNewsBox;

interface MixNewsItemProps {
  title: string;
  image: string;
  link: string;
  category: string;
  description: string;
  className?: string;
}

const MixNewsItem: React.FC<MixNewsItemProps> = ({
  title,
  image,
  link,
  category,
  description,
  className,
}) => {
  return (
    <div className={clsx("@container/mix-news-item", className)}>
      <div className="flex items-start gap-5 @min-[624px]/mix-news-item:gap-6">
        <img
          src={image}
          alt={title}
          className="w-[135px] @min-[624px]/mix-news-item:w-[234px] aspect-video rounded-[6px] object-cover"
        />
        <div>
          <p className="hidden @min-[624px]/mix-news-item:block text-xsm font-medium leading-[160%] tracking-[0%] text-gray-700 mb-1">
            {category}
          </p>
          <p className="text-base font-semibold leading-[150%] tracking-[-1%] text-gray-900 @min-[624px]/mix-news-item:text-lg @min-[624px]/mix-news-item:tracking-[0%]">
            {title}
          </p>
          <p className="hidden @min-[624px]/mix-news-item:block text-xsm leading-[160%] tracking-[0%] text-gray-700 mt-2.5 line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
