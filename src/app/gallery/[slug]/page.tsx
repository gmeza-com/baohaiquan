import VideoPlayer from "@/coms/Home/VideoPlayer";
import { IconClock, IconSignificantTV } from "@/coms/Icon/light";
import { cleanSlug, formatNumberWithSeparator } from "@/lib/utils";
import PostService from "@/service/post";
import { CategoryProps, GalleryProps } from "@/type/article";
import DOMPurify from "isomorphic-dompurify";
import ShareList from "@/coms/Article/ShareList";
import MostViewArticles from "@/coms/Gallery/MostViewArticles";
import dayjs from "dayjs";
import RelativeVideoVertical from "@/coms/Gallery/RelativeVideoVertical";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  try {
    let { slug } = await params;
    slug = cleanSlug(slug);
    if (!slug) throw new Error("Slug is required");

    // Fetch category information
    const post = await PostService.getGalleryFromSlug(slug);

    if (post)
      return {
        title: post.name,
        description: post.description,
        icons: { icon: "/favicon.ico" },
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

  const videoUrl = post?.content?.link;
  const videoThumbnail = post?.thumbnail as string;

  const content = post?.content?.content;
  const description = post?.description;

  return (
    <div>
      <div className="w-full bg-gray-950 xl:pb-15 pb-6">
        <div className="container mx-auto grid lg:grid-cols-12 gap-4 md:gap-10 lg:gap-6 xl:gap-12">
          <div className="xl:col-span-8 lg:col-span-9 pt-3">
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
                <ShareList />
              </div>

              <div className="w-full flex items-center justify-center mt-7 gap-2">
                <IconClock size={22} className="text-gray-700" />
                <span className="text-gray-600 text-xsm">
                  Thứ năm, 29/5/2025 05:23 (GMT+7)
                </span>
              </div>
            </div>
          </div>

          <div className="xl:col-span-4 lg:col-span-3 pt-3 md:w-full md:max-w-[568px] md:mx-auto">
            <RelativeVideoVertical slug={slug} categorySlug={cat?.slug || ""} />
          </div>
        </div>
      </div>
      <div className="bg-white">
        <MostViewArticles />
      </div>
    </div>
  );
};

export default GalleryDetailPage;
