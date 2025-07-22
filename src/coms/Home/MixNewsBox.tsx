import { CategoryProps, INewestPost } from "@/type/article";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

interface MixNewsBoxProps {
  posts: INewestPost[];
}

const MixNewsBox: React.FC<MixNewsBoxProps> = ({ posts }) => {
  return (
    <div className="flex flex-col gap-4 divide-y divide-stroke-light md:pt-4 lg:pt-0">
      {posts.map((item, index) => (
        <MixNewsItem
          key={index}
          title={item?.name}
          image={item?.thumbnail}
          link={`/tin-tuc/${item?.slug}`}
          category={item?.category}
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
  category?: Pick<CategoryProps, "id" | "slug" | "name">;
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
    <Link
      href={link}
      className={clsx("@container/mix-news-item group", className)}
    >
      <div className="flex items-start gap-5 @min-[624px]/mix-news-item:gap-6">
        <img
          src={image}
          alt={title}
          className="w-[135px] @min-[624px]/mix-news-item:w-[234px] aspect-video rounded-[6px] object-cover"
          width={234}
          height={132}
          loading="lazy"
        />
        <div>
          <span className="hover:underline hidden @min-[624px]/mix-news-item:block text-xsm font-medium leading-[160%] tracking-[0%] text-gray-700 mb-1">
            {category?.name}
          </span>
          <h6 className="group-hover:underline group-hover:text-blue-700 group-focus:text-blue-700 text-base font-semibold leading-[150%] tracking-[-1%] text-gray-900 @min-[624px]/mix-news-item:text-lg @min-[624px]/mix-news-item:tracking-[0%]">
            {title}
          </h6>
          <p className="hidden @min-[624px]/mix-news-item:block text-xsm leading-[160%] tracking-[0%] text-gray-700 mt-2.5 line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};
