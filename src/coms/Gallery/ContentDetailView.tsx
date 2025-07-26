import navigateService from "@/lib/router";
import ShareList from "../Article/ShareList";
import { CategoryProps, GalleryProps } from "@/type/article";
import { IconClock } from "../Icon/light";
import vietnamDayjs from "@/lib/dayjs";
import MostViewArticles from "./MostViewArticles";
import DOMPurify from "isomorphic-dompurify";
import QuoteBlock from "../Longform/QuoteBlock";

interface ContentDetailViewProps {
  post: GalleryProps;
  cat: Omit<CategoryProps, "description">;
}

const ContentDetailView: React.FC<ContentDetailViewProps> = ({ post, cat }) => {
  return (
    <div className="bg-white w-full flex flex-col gap-3">
      <div className="w-full max-w-[616px] px-4 md:px-0 md:pt-12 xl:pt-16 pt-10 pb-0 mx-auto">
        <h1 className="text-center font-bold text-3xl lg:text-4xl xl:text-5xl leading-[125%] tracking-[-1%]">
          {post?.name}
        </h1>
      </div>

      {post?.quote && (
        <div className="longform-wrapper text-justify">
          <p>
            {post?.prefix && (
              <span className="float-left font-bold me-1.5">
                {post?.prefix} -
              </span>
            )}
            <span
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.quote),
              }}
            />
          </p>
        </div>
      )}

      {post?.post_content && (
        <div
          className="longform-wrapper"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.post_content),
          }}
        />
      )}

      {post?.note && (
        <div className="max-w-[960px] mx-auto w-full px-4 xl:px-0 pb-6 lg:pb-10 xl:pb-16">
          <QuoteBlock text={post?.note} />
        </div>
      )}

      <div className="max-w-[568px] mx-auto py-7 w-full px-4 md:px-0">
        <div className="flex w-full items-center justify-between p-3 bg-blue-50 rounded-[0.75rem]">
          <span className="text-gray-900 font-normal text-lg leading-[150%] tracking-[0%]">
            Chia sẻ
          </span>
          <ShareList
            url={`${
              process.env.NEXT_PUBLIC_APP
            }${navigateService.getGalleryDetails(cat?.slug, post?.slug)}`}
          />
        </div>

        <div className="w-full flex items-center justify-center mt-7 gap-2">
          <IconClock size={22} className="text-gray-800" />
          <span className="text-gray-900 text-xsm capitalize">
            {vietnamDayjs(post?.published_at).format("dddd, DD/MM/YYYY HH:mm")}
          </span>
        </div>
      </div>
      <div className="mt-14">
        <div className="w-full h-px container mx-auto bg-stroke-light !p-0" />

        <MostViewArticles />
      </div>
    </div>
  );
};

export default ContentDetailView;
