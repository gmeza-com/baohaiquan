import { CategoryProps, GalleryProps } from "@/type/article";
import clsx from "clsx";
import VideoPlayer from "../Home/VideoPlayer";
import DOMPurify from "isomorphic-dompurify";
import { formatNumberWithSeparator } from "@/lib/utils";
import dayjs from "dayjs";
import ShareList from "../Article/ShareList";
import navigateService from "@/lib/router";
import { IconClock } from "../Icon/light";
import RelativeVideoVertical from "./RelativeVideoVertical";
import MostViewArticles from "./MostViewArticles";

interface VideoDetailViewProps {
  post: GalleryProps;
  cat: Omit<CategoryProps, "description">;
}

const VideoDetailView: React.FC<VideoDetailViewProps> = ({ post, cat }) => {
  const videoUrl = post?.content?.link;
  const videoThumbnail = post?.thumbnail as string;
  const description = post?.description;
  const content = post?.content?.content;

  return (
    <>
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
                <ShareList
                  url={`${
                    process.env.NEXT_PUBLIC_APP
                  }${navigateService.getGalleryDetails(cat?.slug, post?.slug)}`}
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

          <div className="xl:col-span-4 lg:col-span-3 pt-3 md:w-full md:max-w-[568px] md:mx-auto">
            <RelativeVideoVertical
              slug={post?.slug}
              categorySlug={cat?.slug || ""}
            />
          </div>
        </div>
      </div>
      <div className="bg-white">
        <MostViewArticles />
      </div>
    </>
  );
};

export default VideoDetailView;
