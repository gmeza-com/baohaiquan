import { CategoryProps, GalleryProps } from "@/type/article";
import ImageBlock from "../Longform/ImageBlock";
import ParagraphBlock from "../Longform/ParagraphBlock";
import HeaderBlock from "../Longform/HeaderBlock";
import DelimiterBlock from "../Longform/DelimiterBlock";
import ColumnsBlock from "../Longform/ColumnsBlock";
import ShareList from "../Article/ShareList";
import navigateService from "@/lib/router";
import { IconClock } from "../Icon/light";
import dayjs from "@/lib/dayjs";
import MostViewArticles from "./MostViewArticles";
import QuoteBlock from "../Longform/QuoteBlock";

interface LongformDetailViewProps {
  post: GalleryProps;
  cat: Omit<CategoryProps, "description">;
}

const LongformDetailView = ({ post, cat }: LongformDetailViewProps) => {
  const content = JSON.parse(post?.content?.[0] || "{}");

  const renderBlock = (block: any, index: number) => {
    switch (block.type) {
      case "paragraph":
        return <ParagraphBlock key={block.id} {...block.data} />;
      case "header":
        return <HeaderBlock key={block.id} {...block.data} />;
      case "list":
        return (
          <ul>
            {block.data.items.map((item: any) => (
              <li>{item}</li>
            ))}
          </ul>
        );
      case "delimiter":
        return <DelimiterBlock key={block.id} {...block.data} />;
      case "image":
        return (
          <ImageBlock
            key={block.id}
            {...block.data}
            className={index === 0 ? "!pt-0" : "!py-4"}
          />
        );
      case "columns":
        return <ColumnsBlock key={block.id} {...block.data} />;
      case "quote":
        return <QuoteBlock key={block.id} {...block.data} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white w-full flex flex-col gap-3">
      {content?.blocks?.map(renderBlock)}
      <div className="max-w-[568px] mx-auto py-7 w-full">
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
            {dayjs(post?.published_at).format("dddd, DD/MM/YYYY HH:mm")}
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

export default LongformDetailView;
