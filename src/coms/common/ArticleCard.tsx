import clsx from "clsx";

export interface ArticleCardProps {
  title: string;
  description: string;
  image: string;
  className?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  description,
  image,
  className,
}) => {
  return (
    <div className={clsx("@container/card", className)}>
      <div className="flex flex-col @min-[800px]/card:flex-row-reverse @min-[800px]/card:bg-blue-50 @min-[800px]/card:py-4 @min-[800px]/card:px-6 @min-[800px]/card:rounded-[12px] @min-[800px]/card:gap-7 pb-5">
        <img
          src={image}
          alt={title}
          className="w-full aspect-video object-cover rounded-[6px] @min-[800px]/card:aspect-[480/360] @min-[800px]/card:w-3/5 @min-[800px]/card:rounded-[4px]"
        />
        <div className="mt-4 @min-[800px]/card:mt-0 @min-[800px]/card:flex-1">
          <p className="text-gray-900 text-lg font-bold leading-[150%] tracking-[-1%] @min-[800px]/card:text-[1.375rem] @min-[800px]/card:leading-[140%]">
            {title}
          </p>
          <p className="mt-1.5 line-clamp-4 text-xsm font-normal text-gray-700 leading-[160%] tracking-[0%] @min-[800px]/card:mt-3">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
