import { cleanSlug, isOn, stripHtml } from "@/lib/utils";
import PostService from "@/service/post";
import { ArticleProps, CategoryProps } from "@/type/article";
import dayjs from "@/lib/dayjs";
import DOMPurify from "isomorphic-dompurify";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  try {
    let { slug } = await params;
    slug = cleanSlug(slug);
    if (!slug) throw new Error("Slug is required");

    // Fetch category information
    const post = await PostService.getPostFromSlug(slug);

    if (post) return { title: post.name, description: post.description };
  } catch (error) {
    return {
      title: "Báo Hải Quân Việt Nam",
      description: "Chuyên Trang Báo Chính Thức Của Hải Quân Nhân Dân Việt Nam",
    };
  }
}

const TinTucPage = async ({ params }: PageProps) => {
  let { slug } = await params;
  let post: ArticleProps | null = null;
  let cat: CategoryProps | null = null;
  try {
    slug = cleanSlug(slug);
    if (!slug) throw new Error("Slug is required");

    post = await PostService.getPostFromSlug(slug);
    cat = await PostService.getCategoryOfPost(slug);
  } catch (error) {}

  return (
    <div className="p-6">
      <div className="mx-auto max-w-[860px]">
        <div className="max-w-[660px] text-center mx-auto pt-6 pb-12">
          {isOn(cat) && <span className="uppercase text-sm">{cat?.name}</span>}
          {post && (
            <>
              <h1 className="text-5xl mt-5 mb-6 font-bold">
                {stripHtml(post?.name)}
              </h1>
              <p>
                <span className="font-semibold">{post.author_name}</span> •{" "}
                <span className="capitalize opacity-80">
                  {dayjs(post.published_at).format("dddd, DD/MM/YYYY HH:mm")}
                </span>
              </p>
            </>
          )}
        </div>
        {post?.content && (
          <div
            className="article-wrapper"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.content),
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TinTucPage;
