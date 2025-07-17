import { ArticleProps } from "@/type/article";
import Link from "next/link";

const ArticleNumeric: React.FC<{ post: ArticleProps; num: number }> = ({
  post,
  num,
}) => {
  return (
    <div className="flex items-center gap-7">
      <div className="font-playfair-display text-7xl -mt-5">
        <span className="w-8 flex justify-center items-center text-[#A5C5E6]">
          {num}
        </span>
      </div>
      <Link
        href={`/tin-tuc/${post.slug}`}
        className="font-semibold text-gray-900 focus:text-blue-700 tracking-[-1%] leading-[150%] lg:text-xsm line-clamp-4"
      >
        {post.name}
      </Link>
    </div>
  );
};

export default ArticleNumeric;
