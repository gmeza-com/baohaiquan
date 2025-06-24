import { ArticleProps } from "@/type/article";
import ArticleRankItem from "./ArticleRankItem";
import DecorTitle from "./DecorTitle";

interface TrendingNewsBoxProps {
  posts: ArticleProps[];
}

const TrendingNewsBox: React.FC<TrendingNewsBoxProps> = ({ posts }) => {
  return (
    <div className="@container/trending-news-box">
      <DecorTitle
        title="Tin đọc nhiều"
        textClassName="@max-[250px]/trending-news-box:text-lg"
      />
      <ol className="flex flex-col mt-2 xl:mt-8">
        {posts.map((item, index) => (
          <ArticleRankItem
            key={item?.id}
            number={index + 1}
            title={item?.name}
            slug={item?.slug}
          />
        ))}
      </ol>
    </div>
  );
};

export default TrendingNewsBox;
