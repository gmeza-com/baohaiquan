import AudioCard from "@/coms/Gallery/AudioCard";
import DecorTitle from "@/coms/Home/DecorTitle";
import { IconPlay2 } from "@/coms/Icon/fill";
import {
  cleanSlug,
  formatNumberWithSeparator,
  formatRelativeTime,
} from "@/lib/utils";
import CategoryService from "@/service/category";
import PostService from "@/service/post";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shadcn/ui/pagination";
import { IGalleryCollectionList } from "@/type/article";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

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

const ITEM_PER_PAGE = 12;

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

  return (
    <div className="container mx-auto">
      <div className="pt-6 xl:pt-8 pb-16">
        <DecorTitle title={cat?.name} />
        <div className="mt-6 xl:mt-9">
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 xl:gap-x-7 gap-y-6 xl:gap-y-10">
            {posts?.data?.map((item) =>
              item?.type === "video" ? (
                <VideoCard data={item} />
              ) : item?.type === "audio" ? (
                <AudioCard data={item} />
              ) : (
                <VideoCard data={item} isNormal />
              )
            )}
          </ul>
          {totalPage > 1 && (
            <PaginationComponent
              slug={slug}
              currentPage={currentPage}
              totalPage={totalPage}
              className="mt-14 md:mt-16"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryCollectionPage;

interface PaginationComponentProps {
  slug: string;
  currentPage: number;
  totalPage: number;
  className?: string;
}

const PaginationComponent = ({
  slug,
  currentPage,
  totalPage,
  className,
}: PaginationComponentProps) => {
  // Logic to determine pagination sections
  const getPaginationSections = () => {
    const firstSection: number[] = [];
    const secondSection: number[] = [];
    let isShowEllipsis = false;

    if (totalPage <= 7) {
      // If total pages <= 7, show all pages without ellipsis
      for (let i = 1; i <= totalPage; i++) {
        firstSection.push(i);
      }
    } else {
      // Smart pagination logic for more than 7 pages
      if (currentPage <= 4) {
        // Current page is in the beginning
        for (let i = 1; i <= 5; i++) {
          firstSection.push(i);
        }
        if (totalPage > 6) {
          secondSection.push(totalPage);
          isShowEllipsis = true;
        }
      } else if (currentPage >= totalPage - 3) {
        // Current page is near the end
        firstSection.push(1);
        isShowEllipsis = true;
        for (let i = totalPage - 4; i <= totalPage; i++) {
          secondSection.push(i);
        }
      } else {
        // Current page is in the middle
        firstSection.push(1);
        isShowEllipsis = true;
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          secondSection.push(i);
        }
        if (currentPage + 2 < totalPage) {
          isShowEllipsis = true;
        }
        if (currentPage + 2 < totalPage) {
          secondSection.push(totalPage);
        }
      }
    }

    return { firstSection, secondSection, isShowEllipsis };
  };

  const { firstSection, secondSection, isShowEllipsis } =
    getPaginationSections();

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`/gallery/collections/${slug}?page=${currentPage - 1}`}
            className={clsx(
              currentPage === 1 &&
                "pointer-events-none opacity-50 cursor-not-allowed"
            )}
          />
        </PaginationItem>

        {/* First Section */}
        {firstSection.map((pageNum) => (
          <PaginationItem key={pageNum}>
            <PaginationLink
              href={`/gallery/collections/${slug}?page=${pageNum}`}
              className={clsx(
                currentPage === pageNum && "bg-primary text-primary-foreground"
              )}
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Ellipsis */}
        {isShowEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Second Section */}
        {secondSection.map((pageNum) => (
          <PaginationItem key={pageNum}>
            <PaginationLink
              href={`/gallery/collections/${slug}?page=${pageNum}`}
              className={clsx(
                currentPage === pageNum && "bg-primary text-primary-foreground"
              )}
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={`/gallery/collections/${slug}?page=${currentPage + 1}`}
            className={clsx(
              currentPage === totalPage &&
                "pointer-events-none opacity-50 cursor-not-allowed"
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

interface VideoCardProps {
  data: IGalleryCollectionList;
  isNormal?: boolean;
}

const VideoCard = ({ data, isNormal = false }: VideoCardProps) => {
  return (
    <li key={data?.id} className="w-full group cursor-pointer">
      <Link href={`/gallery/${data?.slug}`}>
        <div className="w-full aspect-video rounded-[6px] overflow-hidden relative">
          <Image
            src={data?.thumbnail}
            alt={data?.name}
            width={312}
            height={175}
            className="size-full object-cover"
          />
          {!isNormal && (
            <div className="z-10 cursor-pointer absolute size-10 rounded-full bg-white/25 backdrop-blur-2xl bottom-3 left-3 flex items-center justify-center">
              <IconPlay2 size={15} className="text-white" />
            </div>
          )}
        </div>
        <div className="mt-2.5">
          <h6 className="text-gray-900 group-hover:underline leading-[150%] tracking-[-1%] font-semibold text-lg">
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
