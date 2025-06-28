import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export interface ArticleCardProps {
  title: string;
  description: string;
  image: string;
  className?: string;
  slug: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  description,
  image,
  className,
  slug,
}) => {
  return (
    <Link
      href={`/tin-tuc/${slug}`}
      className={clsx("@container/card cursor-pointer", className)}
    >
      <div className="flex flex-col @min-[750px]/card:flex-row-reverse @min-[750px]/card:bg-blue-50 @min-[750px]/card:p-4 @min-[750px]/card:rounded-[12px] @min-[750px]/card:gap-7 pb-5">
        <Image
          src={image}
          alt={title}
          className="w-full aspect-video object-cover rounded-[6px] @min-[750px]/card:aspect-[480/360] @min-[750px]/card:w-3/5 @min-[750px]/card:rounded-[4px]"
          width={480}
          height={360}
          loading="lazy"
        />
        <div className="mt-4 @min-[750px]/card:mt-0 @min-[750px]/card:flex-1">
          <p className="hover:underline hover:text-blue-700 text-gray-900 text-lg font-bold leading-[150%] tracking-[-1%] @min-[750px]/card:text-[1.375rem] @min-[750px]/card:leading-[140%]">
            {title}
          </p>
          <p className="mt-1.5 line-clamp-4 text-xsm font-normal text-gray-700 leading-[160%] tracking-[0%] @min-[750px]/card:mt-3">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
