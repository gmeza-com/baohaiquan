interface ArticleRankItemProps {
  number: number;
  title: string;
}

const ArticleRankItem: React.FC<ArticleRankItemProps> = ({ number, title }) => {
  return (
    <div className="pt-3 pb-4 pe-1 flex items-center gap-7">
      <span className="font-playfair-display text-7xl -mt-5">
        <div className="w-8 flex justify-center items-center text-[#A5C5E6]">
          {number}
        </div>
      </span>
      <p className="font-semibold text-gray-900 tracking-[-1%] leading-[150%] lg:text-xsm line-clamp-3">
        {title}
      </p>
    </div>
  );
};

export default ArticleRankItem;
