import Link from "next/link";

interface ArticleRankItemProps {
  number: number;
  title: string;
  slug: string;
}

const ArticleRankItem: React.FC<ArticleRankItemProps> = ({
  number,
  title,
  slug,
}) => {
  return (
    <li>
      <Link
        href={`/tin-tuc/${slug}`}
        className="pt-3 pb-4 pe-1 flex items-center gap-7 group"
      >
        <span className="font-playfair-display text-7xl -mt-5">
          <div className="w-8 flex justify-center items-center text-[#A5C5E6]">
            {number}
          </div>
        </span>
        <h6 className="group-hover:underline group-focus:text-blue-700 group-hover:text-blue-700 font-semibold text-gray-900 tracking-[-1%] leading-[150%] lg:text-xsm line-clamp-3">
          {title}
        </h6>
      </Link>
    </li>
  );
};

export default ArticleRankItem;
