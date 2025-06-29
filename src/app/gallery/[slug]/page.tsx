import VideoPlayer from "@/coms/Home/VideoPlayer";
import { IconClock, IconSignificantTV } from "@/coms/Icon/light";
import { cleanSlug } from "@/lib/utils";
import PostService from "@/service/post";
import { CategoryProps, GalleryProps } from "@/type/article";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import ShareList from "@/coms/Article/ShareList";
import RelativeVideos from "@/coms/Gallery/RelativeVideos";
import MostViewArticles from "@/coms/Gallery/MostViewArticles";

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

  return (
    <div>
      <div className="w-full bg-gray-950 pb-15">
        <div className="w-full max-w-[660px] mx-auto flex flex-col items-center py-10 px-4 lg:py-16 lg:px-[1.375rem] gap-7">
          <div className="flex items-center gap-3.5 bg-gray-900 rounded-2xl py-1.5 px-3.5">
            <IconSignificantTV size={44} />
            <Link
              href={`/gallery/collection/${cat?.slug}`}
              className="uppercase text-[#EDEDED] text-xl lg:text-[1.75rem] font-myriad-pro"
            >
              {cat?.name}
            </Link>
          </div>

          <h1 className="text-white font-bold text-3xl lg:text-5xl text-center leading-[125%] tracking-[-1%]">
            {post?.name}
          </h1>
        </div>
        <VideoPlayer url={videoUrl} thumbnail={videoThumbnail} />
        {!!content && (
          <div
            className="article-wrapper text-white px-4 md:px-0"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(content),
            }}
          />
        )}
        <div className="max-w-[568px] mx-auto px-4 md:px-0 py-7">
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
      <div className="bg-white">
        <RelativeVideos slug={slug} />
        <div className="container mx-auto">
          <div className="w-full h-[1px] bg-stroke-light" />
        </div>
        <MostViewArticles />
      </div>
    </div>
  );
};

export default GalleryDetailPage;
