import { formatNumberWithSeparator, formatRelativeTime } from "@/lib/utils";
import { IGalleryCollectionList } from "@/type/article";
import Image from "next/image";
import Link from "next/link";
import { IconPlay2 } from "../Icon/fill";

interface AudioCardProps {
  data: IGalleryCollectionList;
  href: string;
}

const AudioCard: React.FC<AudioCardProps> = ({ data, href }) => {
  return (
    <li key={data?.id} className="w-full cursor-pointer">
      <Link href={href} className="group">
        <div className="w-full aspect-video rounded-[6px] overflow-hidden relative bg-blue-100 flex items-center justify-center">
          <div className="size-32 border-3 border-white shadow rounded-lg overflow-hidden">
            <img
              src={data?.thumbnail}
              alt={data?.name}
              width={128}
              height={128}
              className="size-full object-cover"
            />
          </div>
          <div className="z-10 cursor-pointer absolute size-10 shadow-2xl rounded-full bg-white backdrop-blur-2xl bottom-3 left-3 flex items-center justify-center">
            <IconPlay2 size={15} className="text-blue-800" />
          </div>
        </div>
        <div className="mt-2.5">
          <h6 className="text-gray-900 group-focus:text-blue-700 group-hover:underline leading-[150%] tracking-[-1%] font-semibold text-lg">
            {data?.name}
          </h6>
          <span className="mt-1.5 text-xsm text-gray-700 leading-[160%] tracking-[0%]">
            {formatNumberWithSeparator(data?.view_count)} lượt phát •{" "}
            {formatRelativeTime(data?.published_at)}
          </span>
        </div>
      </Link>
    </li>
  );
};

export default AudioCard;
