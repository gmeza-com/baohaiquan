import Pagination from "@/coms/common/Pagination";
import AudioCard from "@/coms/Gallery/AudioCard";
import NewspaperCard from "@/coms/Gallery/NewspaperCard";
import NewspaperListener from "@/coms/Gallery/NewspaperListener";
import DecorTitle from "@/coms/Home/DecorTitle";
import { IconPlay2 } from "@/coms/Icon/fill";
import PrimaryLayout from "@/coms/MasterLayout/PrimaryLayout";
import navigateService from "@/lib/router";
import {
  cleanSlug,
  formatNumberWithSeparator,
  formatRelativeTime,
} from "@/lib/utils";
import CategoryService from "@/service/category";
import PostService from "@/service/post";
import { IGalleryCollectionList } from "@/type/article";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

const ITEM_PER_PAGE = 12;

export async function generateMetadata({ params }: PageProps) {
  try {
    let { slug } = await params;
    slug = cleanSlug(slug);
    if (!slug) throw new Error("Slug is required");

    // Fetch category information
    const cat = await CategoryService.getGalleryCategory(slug);

    if (cat)
      return {
        title: cat.name,
        description:
          "Chuyên Trang Báo Chính Thức Của Hải Quân Nhân Dân Việt Nam",
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

const GalleryCollectionPage = async ({ params, searchParams }: PageProps) => {
  const { slug } = await params;
  const { page } = await searchParams;

  const cat = await CategoryService.getGalleryCategory(slug);

  if (!cat) {
    notFound();
  }

  const currentPage = page ? Number(page) : 1;

  const posts = await PostService.getGalleryCollectionWithPagination(
    cat?.id,
    ITEM_PER_PAGE,
    currentPage
  );

  const totalPage = Math.ceil(posts?.total / ITEM_PER_PAGE);

  const renderItem = (item: IGalleryCollectionList) => {
    switch (item?.type) {
      case "video":
        return (
          <VideoCard
            key={item?.id}
            data={item}
            href={navigateService.getGalleryDetails(slug, item?.slug)}
          />
        );

      case "audio":
        return (
          <AudioCard
            key={item?.id}
            data={item}
            href={navigateService.getGalleryDetails(slug, item?.slug)}
          />
        );

      case "album":
        return <NewspaperCard key={item?.id} item={item} catId={cat?.id} />;

      default:
        return (
          <VideoCard
            key={item?.id}
            data={item}
            href={navigateService.getGalleryDetails(slug, item?.slug)}
            isNormal={true}
          />
        );
    }
  };

  return (
    <PrimaryLayout>
      <div className="container mx-auto">
        <div className="pt-6 xl:pt-8 pb-16">
          <DecorTitle title={cat?.name} />
          <div className="mt-6 xl:mt-9">
            {posts?.total <= 0 ? (
              <div className="flex items-center justify-center h-[300px]">
                <p className="text-gray-700 text-lg leading-[160%] tracking-[0%]">
                  Không có bài viết nào
                </p>
              </div>
            ) : (
              <ul className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 xl:gap-x-7 gap-y-6 xl:gap-y-10">
                {posts?.data?.map(renderItem)}
              </ul>
            )}
            {totalPage > 1 && (
              <Pagination
                url={navigateService.getGalleryCollection(slug)}
                currentPage={currentPage}
                totalPage={totalPage}
                className="mt-14 md:mt-16"
              />
            )}
          </div>
        </div>
      </div>
      <NewspaperListener catId={cat?.id} />
    </PrimaryLayout>
  );
};

export default GalleryCollectionPage;

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
