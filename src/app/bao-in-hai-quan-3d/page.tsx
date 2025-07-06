import Pagination from "@/coms/common/Pagination";
import NewspaperCard from "@/coms/Gallery/NewspaperCard";
import DecorTitle from "@/coms/Home/DecorTitle";
import CategoryService from "@/service/category";
import PostService from "@/service/post";

import { notFound } from "next/navigation";

type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata() {
  try {
    // Fetch category information
    const cat = await CategoryService.getGalleryCategory("bao-in");

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

const BaoInHaiQuan3DPage = async ({ searchParams }: PageProps) => {
  const { page } = await searchParams;

  const cat = await CategoryService.getGalleryCategory("bao-in");

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
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 xl:gap-x-7 gap-y-6 xl:gap-y-10">
            {posts?.data?.map((item) => (
              <NewspaperCard key={item?.id} item={item} />
            ))}
          </ul>
          {totalPage > 1 && (
            <Pagination
              url={`/bao-in-hai-quan-3d`}
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

export default BaoInHaiQuan3DPage;
