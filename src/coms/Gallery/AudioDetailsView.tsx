import clsx from "clsx";
import { CategoryProps, GalleryProps } from "@/type/article";
import dayjs from "dayjs";
import AudioPlayer from "./AudioPlayer";
import { formatNumberWithSeparator } from "@/lib/utils";
import DOMPurify from "isomorphic-dompurify";
import ShareList from "../Article/ShareList";
import navigateService from "@/lib/router";
import { IconClock } from "../Icon/light";
import RelativePodcast from "./RelativePodcast";
import MostViewArticles from "./MostViewArticles";

interface AudioDetailsViewProps {
  post: GalleryProps;
  cat: Omit<CategoryProps, "description">;
}

const AudioDetailsView: React.FC<AudioDetailsViewProps> = ({ post, cat }) => {
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
                {formatNumberWithSeparator(post?.view_count || 0)} lượt phát •
                Ngày {dayjs(post?.published_at).format("DD/MM/YYYY")}
              </p>
            </div>

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
        </div>
      </div>
      <div className="bg-white">
        <RelativePodcast slug={post?.slug} />

        <MostViewArticles />
      </div>
    </>
  );
};

export default AudioDetailsView;
