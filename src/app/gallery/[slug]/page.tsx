import VideoPlayer from "@/coms/Home/VideoPlayer";
import { IconClock } from "@/coms/Icon/light";
import { cleanSlug, formatNumberWithSeparator } from "@/lib/utils";
import PostService from "@/service/post";
import { CategoryProps, GalleryProps } from "@/type/article";
import DOMPurify from "isomorphic-dompurify";
import ShareList from "@/coms/Article/ShareList";
import MostViewArticles from "@/coms/Gallery/MostViewArticles";
import RelativeVideoVertical from "@/coms/Gallery/RelativeVideoVertical";
import GalleryDetailLayout from "@/coms/MasterLayout/GalleryDetailLayout";
import { notFound } from "next/navigation";
import clsx from "clsx";
import dayjs from "@/lib/dayjs";

import AudioPlayer from "@/coms/Gallery/AudioPlayer";
import RelativePodcast from "@/coms/Gallery/RelativePodcast";
import { ResolvingMetadata } from "next";

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
    const post = await PostService.getGalleryFromSlug(slug);

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

const GalleryDetailPage = async ({ params }: PageProps) => {
  let { slug } = await params;
  let post: GalleryProps | null = null;
  let cat: Omit<CategoryProps, "description"> | null = null;
  try {
    slug = cleanSlug(slug);
    if (!slug) throw new Error("Slug is required");

    post = await PostService.getGalleryFromSlug(slug);
    cat = await PostService.getCategoryOfGallery(slug);

    // TODO: increment view count
    // if (post && post.id) {
    //   await PostService.increaseViewCount(post.id);
    // }
  } catch (error) {}

  if (!cat || !post) {
    notFound();
  }

  const videoUrl = post?.content?.link;
  const videoThumbnail = post?.thumbnail as string;

  const content = post?.content?.content;
  const description = post?.description;

  return (
    <GalleryDetailLayout category={cat}>
      <div className="w-full bg-gray-950 xl:pb-15 pb-6">
        <div className="container mx-auto grid lg:grid-cols-12 gap-4 md:gap-10 lg:gap-6 xl:gap-12">
          <div
            className={clsx(
              "pt-3",
              post?.type === "video"
                ? "xl:col-span-8 lg:col-span-9"
                : "lg:col-span-12"
            )}
          >
            {post?.type === "video" && (
              <>
                <VideoPlayer
                  url={videoUrl}
                  thumbnail={videoThumbnail}
                  className="rounded-[6px]"
                />
                <h1 className="text-white font-bold text-3xl xl:text-[2rem] text-start leading-[130%] tracking-[-1%] mt-3 lg:mt-4 xl:mt-5">
                  {post?.name}
                </h1>

                <div className="w-full bg-gray-900 rounded-2xl xl:mt-6 mt-3 lg:mt-5 lg:pt-3 lg:pb-4 xl:px-5 px-4 pt-2 pb-3">
                  <p className="lg:text-base xl:text-lg font-semibold mt-1.5 text-gray-200 leading-[160%] tracking-[0%]">
                    {formatNumberWithSeparator(post?.view_count || 0)} lượt xem
                    <span className="text-gray-600"> • </span>
                    Ngày {dayjs(post?.published_at).format("DD/MM/YYYY")}
                  </p>

                  <p className="lg:text-base xl:text-lg font-normal mt-1.5 text-gray-200 leading-[160%] tracking-[0%]">
                    {cat?.name}
                    <br />
                    {post?.author_name}
                  </p>
                </div>

                {!!description && (
                  <p className="max-w-[568px] mx-auto w-full text-base md:text-lg lg:text-xl xl:text-[1.375rem] leading-[160%] tracking-[-1%] text-white md:mt-12 mt-8">
                    {description}
                  </p>
                )}

                <hr className="w-full max-w-[568px] mx-auto mt-8 border-white/25" />
              </>
            )}

            {post?.type === "audio" && (
              <>
                <div className="pt-6 xl:pt-16 pb-6 xl:pb-9">
                  <h1 className="max-w-[616px] text-4xl md:text-5xl font-bold text-center w-full mx-auto text-white leading-[125%] tracking-[-1%]">
                    {post?.name}
                  </h1>
                </div>
                <div className="w-full max-w-[568px] mx-auto pt-4 pb-9 text-white text-lg xl:text-[1.375rem] leading-[160%] tracking-[-1%]">
                  <p>{post?.description}</p>
                </div>
                <AudioPlayer
                  src={post?.content?.link || ""}
                  thumbnail={post?.thumbnail as string}
                  title={post?.name || ""}
                />

                <div className="text-white w-full max-w-[568px] mx-auto mt-6 xl:mt-8 pb-11 border-b border-white/25">
                  <p className="mt-4 text-base xl:text-lg font-semibold">
                    {formatNumberWithSeparator(post?.view_count || 0)} lượt phát
                    • Ngày {dayjs(post?.published_at).format("DD/MM/YYYY")}
                  </p>
                </div>
              </>
            )}

            {!!content && (
              <div
                className="article-wrapper text-white "
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(content),
                }}
              />
            )}
            <div className="max-w-[568px] mx-auto py-7">
              <div className="flex w-full items-center justify-between p-3 bg-white/10 rounded-[0.75rem]">
                <span className="text-white font-normal text-lg leading-[150%] tracking-[0%]">
                  Chia sẻ
                </span>
                <ShareList
                  url={`${process.env.NEXT_PUBLIC_APP}/gallery/${slug}`}
                />
              </div>

              <div className="w-full flex items-center justify-center mt-7 gap-2">
                <IconClock size={22} className="text-gray-700" />
                <span className="text-gray-600 text-xsm capitalize">
                  {dayjs(post.published_at).format("dddd, DD/MM/YYYY HH:mm")}
                </span>
              </div>
            </div>
          </div>

          {post?.type === "video" && (
            <div className="xl:col-span-4 lg:col-span-3 pt-3 md:w-full md:max-w-[568px] md:mx-auto">
              <RelativeVideoVertical
                slug={slug}
                categorySlug={cat?.slug || ""}
              />
            </div>
          )}
        </div>
      </div>
      <div className="bg-white">
        {post.type === "audio" && (
          <>
            <RelativePodcast slug={slug} />
            <hr className="w-full bg-blue-200 container mx-auto !p-0" />
          </>
        )}
        <MostViewArticles />
      </div>
    </GalleryDetailLayout>
  );
};

export default GalleryDetailPage;
