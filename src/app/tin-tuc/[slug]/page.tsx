import {
  cleanSlug,
  formatNumberWithSeparator,
  isOn,
  stripHtml,
} from "@/lib/utils";
import PostService from "@/service/post";
import { ArticleProps, CategoryProps } from "@/type/article";
import DOMPurify from "isomorphic-dompurify";
import { ResolvingMetadata } from "next";
import ShareList from "@/coms/Article/ShareList";
import RelativeArticle from "@/coms/Article/RelativeArticle";
import PostDetailRightSide from "@/coms/Article/PostDetailRightSide";

import dayjs from "@/lib/dayjs";
import { IconEye, IconMailBox } from "@/coms/Icon/light";
import Link from "next/link";
import navigateService from "@/lib/router";
import { notoSerif } from "@/app/font";

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
    else {
      throw new Error("Post not found");
    }
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

    const postId = await PostService.getPostIdFromSlug(slug);

    console.log("postId", postId);

    // increment view count
    if (postId) {
      await PostService.increaseViewCount(postId);
    }

    post = await PostService.getPostFromSlug(slug);
    cat = await PostService.getCategoryOfPost(slug);
  } catch (error) {}

  return (
    <div className={`${notoSerif.variable}`}>
      <div className="bg-yellow-50">
        <div className="container grid gird-cols-1 md:grid-cols-12 xl:grid-cols-4 gap-6 lg:gap-12">
          <div className="mx-auto w-full overflow-hidden md:col-span-8 xl:col-span-3 pt-6 xl:pt-12 ">
            <div className="font-noto-serif text-gray-900 w-full">
              <div className="flex items-center flex-wrap gap-1 xl:gap-4 text-sm md:text-base xl:text-lg font-medium text-[#696969] ">
                {isOn(cat?.id) && (
                  <>
                    <Link
                      href={navigateService.getPostCollection(cat?.slug || "")}
                      className="uppercase hover:underline"
                    >
                      {cat?.name}
                    </Link>
                    <span>|</span>
                  </>
                )}
                <p className="uppercase">
                  {post?.published_at
                    ? dayjs(post.published_at).format(
                        "dddd, [ngày] D/M/YYYY • HH:mm"
                      )
                    : ""}
                </p>
                <span>|</span>
                <div className="flex items-center gap-2">
                  <IconEye />
                  <span>
                    {formatNumberWithSeparator(post?.view_count || 0)}
                  </span>
                </div>
              </div>

              {post?.name && (
                <h1 className="text-3xl md:text-4xl xl:text-5xl mt-5 font-bold leading-[125%] tracking-[-1%] text-gray-900">
                  {stripHtml(post?.name)}
                </h1>
              )}

              {post?.quote && (
                <div className="text-justify mt-3 text-base xl:text-lg italic text-gray-900">
                  <p>
                    {post?.prefix && (
                      <span className="float-left font-bold me-1.5">
                        {post?.prefix} -
                      </span>
                    )}
                    <span
                      className="quote-wrapper"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(post.quote),
                      }}
                    />
                  </p>
                </div>
              )}

              {post?.content && (
                <div
                  className="article-wrapper mt-7 xl:mt-12"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post.content),
                  }}
                />
              )}

              {post?.note && (
                <div className="article-wrapper">
                  <blockquote
                    className=""
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(post.note),
                    }}
                  />
                </div>
              )}

              <div className="flex flex-col items-center gap-2 pt-7 pb-14 border-y border-yellow-200">
                <IconMailBox size={48} />
                <p className="text-center">
                  Bài viết, video, hình ảnh đóng góp cho chuyên mục vui lòng gửi
                  về
                  <br />
                  <a
                    href="mailto:bhqdt@baohaiquanvietnam.vn"
                    className="underline font-bold"
                  >
                    bhqdt@baohaiquanvietnam.vn
                  </a>
                </p>
              </div>
            </div>

            <div className="py-7 max-w-[720px] mx-auto">
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

          <PostDetailRightSide />
        </div>
      </div>
    </div>
  );
};

export default TinTucPage;
