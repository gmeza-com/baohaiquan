import ArticleRankItem from "./ArticleRankItem";
import DecorTitle from "./DecorTitle";

const TrendingNewsBox = () => {
  return (
    <div className="@container/trending-news-box">
      <DecorTitle title="Tin đọc nhiều" textClassName="@max-[250px]/trending-news-box:text-lg" />
      <div className="flex flex-col mt-2 xl:mt-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <ArticleRankItem
            key={index}
            number={index + 1}
            title="Cảnh giác thủ đoạn dụ dỗ tham gia đầu tư tài chính, chứng khoán, tiền ảo trên không gian mạng"
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingNewsBox;
