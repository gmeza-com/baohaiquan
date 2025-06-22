import { isOn } from "@/lib/utils";
import { ArticleProps } from "@/type/article";
import ArticleVerticle from "@/coms/Article/ArticleVerticle";
import ArticleHorizontal from "@/coms/Article/ArticleHorizontal";

const CategoryFeature: React.FC<{ posts: ArticleProps[] }> = ({ posts }) => {
  return (
    <div className="grid grid-cols-4 gap-6 my-3 pb-21 border-b border-b-blue-200">
      <div className="lg:col-span-2 col-span-4">
        {isOn(posts[0]) && (
          <ArticleVerticle
            post={posts[0]}
            showDesc={true}
            className="text-3xl font-bold"
          />
        )}
      </div>
      <div className="col-span-4 md:col-span-2 lg:col-span-1 border-b border-b-slate-300 md:border-b-0">
        {posts.length >= 3 && (
          <ul>
            {posts.slice(1, 3).map((post, idx) => (
              <li
                key={post.id}
                className={`mb-6 ${
                  idx < 1 ? "border-b border-b-blue-200 border-dashed pb-5" : ""
                }`}
              >
                <ArticleVerticle post={post} showDesc={false} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-span-4 md:col-span-2 lg:col-span-1">
        {posts.length >= 4 && (
          <ul>
            {posts.slice(3, 8).map((post, idx) => (
              <li
                key={post.id}
                className={`mb-5 ${
                  idx < 4 ? "border-b border-b-blue-200 border-dashed pb-4" : ""
                }`}
              >
                <ArticleHorizontal post={post} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CategoryFeature;
