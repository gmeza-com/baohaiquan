import { IGalleryCollectionList } from "@/type/article";
import Link from "next/link";
import { IconPlay2 } from "../Icon/fill";
import { formatNumberWithSeparator, formatRelativeTime } from "@/lib/utils";

interface VideoCardProps {
  data: IGalleryCollectionList;
  isNormal?: boolean;
  href: string;
}

const VideoCard = ({ data, isNormal = false, href }: VideoCardProps) => {
  return (
    <li key={data?.id} className="w-full group cursor-pointer overflow-hidden">
      <Link href={href} className="group">
        <div className="w-full aspect-video rounded-[6px] overflow-hidden relative">
          <img
            src={data?.thumbnail}
            alt={data?.name}
            width={312}
            height={175}
            className="size-full object-cover group-focus:scale-105 transition-transform"
          />
          {!isNormal && (
            <div className="z-10 cursor-pointer absolute size-10 rounded-full bg-white/25 backdrop-blur-2xl bottom-3 left-3 flex items-center justify-center">
              <IconPlay2 size={15} className="text-white" />
            </div>
          )}
        </div>
        <div className="mt-2.5">
          <h6 className="text-gray-900 group-focus:text-blue-700 group-hover:underline leading-[150%] tracking-[-1%] font-semibold text-lg">
            {data?.name}
          </h6>
          {!isNormal ? (
            <span className="mt-1.5 text-xsm text-gray-700 leading-[160%] tracking-[0%]">
              {formatNumberWithSeparator(data?.view_count)} lượt xem •{" "}
              {formatRelativeTime(data?.published_at)}
            </span>
          ) : (
            <p className="mt-1.5 text-xsm text-gray-700 leading-[160%] tracking-[0%]">
              {data?.description}
            </p>
          )}
        </div>
      </Link>
    </li>
  );
};

export default VideoCard;
