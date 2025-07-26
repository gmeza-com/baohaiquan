import { cleanSlug, isOn, stripHtml } from "@/lib/utils";
import PostService from "@/service/post";
import { ArticleProps, CategoryProps } from "@/type/article";
import DOMPurify from "isomorphic-dompurify";
import { ResolvingMetadata } from "next";
import ShareList from "@/coms/Article/ShareList";
import RelativeArticle from "@/coms/Article/RelativeArticle";
import MixBox from "@/coms/Article/MixBox";

import PostDetailRightSide from "@/coms/Article/PostDetailRightSide";
import MenuService from "@/service/menu";
import { IMenuItem } from "@/type/menu";
import dayjs from "@/lib/dayjs";

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
  let menu: IMenuItem[] = [];
  try {
    slug = cleanSlug(slug);
    if (!slug) throw new Error("Slug is required");

    post = await PostService.getPostFromSlug(slug);
    cat = await PostService.getCategoryOfPost(slug);
    menu = await MenuService.getMenuItems();

    // increment view count
    if (post && post.id) {
      await PostService.increaseViewCount(post.id);
    }
  } catch (error) {}

  return (
    <div>
      <div className="bg-yellow-50">
        <div className="container grid gird-cols-1 md:grid-cols-12 xl:grid-cols-4 gap-6 lg:gap-12">
          <div className="mx-auto w-full overflow-hidden md:col-span-8 xl:col-span-3">
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
                    <span className="capitalize opacity-80">
                      {dayjs(post.published_at).format(
                        "dddd, DD/MM/YYYY HH:mm"
                      )}
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

            <div className="py-7">
              <div className="flex w-full items-center justify-between p-3 bg-yellow-100 rounded-[0.75rem]">
                <span className="text-gray-900 font-normal text-lg leading-[150%] tracking-[0%]">
                  Chia sẻ
                </span>
                <ShareList
                  url={`${process.env.NEXT_PUBLIC_APP}/tin-tuc/${slug}`}
                />
              </div>
            </div>

            <RelativeArticle slug={slug} catSlug={cat?.slug || ""} />
          </div>
          <PostDetailRightSide menuData={menu} currentCategory={cat?.id || 0} />
        </div>
      </div>
    </div>
  );
};

export default TinTucPage;
