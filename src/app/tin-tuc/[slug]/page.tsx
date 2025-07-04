import { cleanSlug, isOn, stripHtml } from "@/lib/utils";
import PostService from "@/service/post";
import { ArticleProps, CategoryProps } from "@/type/article";
import dayjs from "@/lib/dayjs";
import DOMPurify from "isomorphic-dompurify";
import { ResolvingMetadata } from "next";
import ShareList from "@/coms/Article/ShareList";
import { IconClock } from "@/coms/Icon/light";
import RelativeArticle from "@/coms/Article/RelativeArticle";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
) {
  try {
    let { slug } = await params;
    slug = cleanSlug(slug);
    if (!slug) throw new Error("Slug is required");

    // Fetch category information
    const post = await PostService.getPostFromSlug(slug);

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || [];

    if (post)
      return {
        title: post.name,
        description: post.description,
        icons: { icon: "/favicon.ico" },
        openGraph: {
          images: [post?.thumbnail, ...previousImages],
        },
      };
  } catch (error) {
    return {
      title: "Báo Hải Quân Việt Nam",
      description: "Chuyên Trang Báo Chính Thức Của Hải Quân Nhân Dân Việt Nam",
      icons: { icon: "/favicon.ico" },
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

    // increment view count
    if (post && post.id) {
      await PostService.increaseViewCount(post.id);
    }
  } catch (error) {}

  return (
    <div className="p-6">
      <div className="mx-auto max-w-[860px]">
        <div className="max-w-[660px] text-center mx-auto pt-6 pb-12">
          {isOn(cat) && (
            <a
              href={`/danh-muc/${cat?.slug}`}
              className="uppercase text-sm hover:underline"
            >
              {cat?.name}
            </a>
          )}
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

        <div className="max-w-[568px] mx-auto py-7">
          <div className="flex w-full items-center justify-between p-3 bg-yellow-100 rounded-[0.75rem]">
            <span className="text-gray-900 font-normal text-lg leading-[150%] tracking-[0%]">
              Chia sẻ
            </span>
            <ShareList url={`${process.env.NEXT_PUBLIC_APP}/tin-tuc/${slug}`} />
          </div>

          <div className="w-full flex items-center justify-center mt-7 gap-2">
            <IconClock size={22} className="text-gray-800" />
            <span className="text-gray-900 text-xsm capitalize">
              {dayjs(post?.published_at).format("dddd, DD/MM/YYYY HH:mm")}
            </span>
          </div>
        </div>

        <RelativeArticle slug={slug} catSlug={cat?.slug || ""} />
      </div>
    </div>
  );
};

export default TinTucPage;
