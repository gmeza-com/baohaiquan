import { ArticleProps } from "@/type/article";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

interface HighlightArticleCardProps {
  className?: string;
  data: ArticleProps;
}

const HighlightArticleCard: React.FC<HighlightArticleCardProps> = ({
  className,
  data,
}) => {
  return (
    <Link
      href={`tin-tuc/${data?.slug}`}
      className={clsx("group flex flex-col gap-4 lg:gap-6", className)}
    >
      <img
        src={data?.thumbnail}
        alt={data?.name}
        className="w-full object-cover aspect-video md:rounded-[8px]"
        width={636}
        height={375}
      />
      <div className="px-4 lg:px-6 flex flex-col gap-2.5 lg:gap-4">
        <h4 className="group-hover:underline group-hover:text-blue-700 text-xl font-bold leading-[140%] text-gray-900 tracking-[-1%] lg:text-[2rem] lg:leading-[130%]">
          {data?.name}
        </h4>
        <p className="text-[15px] font-normal leading-[160%] text-gray-700 tracking-[0%]">
          {data?.description}
        </p>
      </div>
    </Link>
  );
};

export default HighlightArticleCard;
