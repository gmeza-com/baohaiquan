import Pagination from "@/coms/common/Pagination";
import AudioCard from "@/coms/Gallery/AudioCard";
import NewspaperCard from "@/coms/Gallery/NewspaperCard";
import NewspaperListener from "@/coms/Gallery/NewspaperListener";
import VideoCard from "@/coms/Gallery/VideoCard";
import DecorTitle from "@/coms/Home/DecorTitle";
import TabButton from "@/coms/Home/TabButton";
import PrimaryLayout from "@/coms/MasterLayout/PrimaryLayout";
import { GalleryCategory } from "@/data/category";
import navigateService from "@/lib/router";
import { cleanSlug } from "@/lib/utils";
import CategoryService from "@/service/category";
import PostService from "@/service/post";
import { CategoryProps, IGalleryCollectionList } from "@/type/article";

type PageProps = {
  params: Promise<{}>;
  searchParams: Promise<{ page?: string }>;
};

const ITEM_PER_PAGE = 4;

export async function generateMetadata({ params }: PageProps) {
  return {
    title: "Đa phương tiện",
    description: "Chuyên Trang Báo Chính Thức Của Hải Quân Nhân Dân Việt Nam",
    icons: { icon: "/favicon.ico" },
  };
}

const CATEGORY_LIST_IDS = [
  GalleryCategory.LONGFORM,
  GalleryCategory.INFOGRAPHIC,
  GalleryCategory.HQ_PODCAST,
  GalleryCategory.PHONG_SU_ANH,
];

const fetchData = async (
  catId: string
): Promise<{
  cat: Omit<CategoryProps, "description">;
  galleries: {
    data: IGalleryCollectionList[];
    currentPage: number;
    total: number;
  };
}> => {
  const cat = await CategoryService.getGalleryCategory(catId, true);

  console.log("cat", catId, cat);

  if (!cat) {
    throw new Error("Category not found");
  }

  const galleries = await PostService.getGalleryCollectionWithPagination(
    catId as any,
    ITEM_PER_PAGE,
    1
  );

  return { cat, galleries };
};

const DaPhuongTienPage = async () => {
  const cats = await Promise.all(
    CATEGORY_LIST_IDS.map((item) => fetchData(String(item)))
  );

  const renderItem = (
    item: IGalleryCollectionList,
    cat: Omit<CategoryProps, "description">
  ) => {
    switch (item?.type) {
      case "video":
        return (
          <VideoCard
            key={item?.id}
            data={item}
            href={navigateService.getGalleryDetails(cat?.slug, item?.slug)}
          />
        );

      case "audio":
        return (
          <AudioCard
            key={item?.id}
            data={item}
            href={navigateService.getGalleryDetails(cat?.slug, item?.slug)}
          />
        );

      case "album":
        return <NewspaperCard key={item?.id} item={item} catId={cat?.id} />;

      default:
        return (
          <VideoCard
            key={item?.id}
            data={item}
            href={navigateService.getGalleryDetails(cat?.slug, item?.slug)}
            isNormal={true}
          />
        );
    }
  };

  return (
    <PrimaryLayout>
      <div className="container mx-auto">
        <div className="pt-6 xl:pt-8 pb-16 flex flex-col gap-10">
          {cats?.map((item) => {
            const hasMore = item?.galleries?.total > ITEM_PER_PAGE;

            return (
              <div key={item?.cat?.id}>
                <div className="flex items-center justify-between">
                  <DecorTitle title={item?.cat?.name} />
                  {hasMore && (
                    <div>
                      <TabButton
                        className="hidden md:block h-fit py-0.5"
                        title="Xem thêm"
                        link={navigateService.getGalleryCollection(
                          item?.cat?.slug
                        )}
                      />
                    </div>
                  )}
                </div>
                <div className="mt-6 xl:mt-9">
                  {item?.galleries?.total <= 0 ? (
                    <div className="flex items-center justify-center h-[300px]">
                      <p className="text-gray-700 text-lg leading-[160%] tracking-[0%]">
                        Không có bài viết nào
                      </p>
                    </div>
                  ) : (
                    <ul className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 xl:gap-x-7 gap-y-6 xl:gap-y-10">
                      {item?.galleries?.data?.map((gallery) =>
                        renderItem(gallery, item?.cat)
                      )}
                    </ul>
                  )}

                  {hasMore && (
                    <TabButton
                      className="w-full mt-4 md:hidden"
                      title="Xem thêm"
                      link={navigateService.getGalleryCollection(
                        item?.cat?.slug
                      )}
                    />
                  )}
                </div>

                <NewspaperListener catId={item?.cat?.id} />
              </div>
            );
          })}
        </div>
      </div>
    </PrimaryLayout>
  );
};

export default DaPhuongTienPage;
