import { IconArticle, IconMagnifyingGlass, IconVideo } from "@/coms/Icon/light";
import ResultList from "@/coms/Search/ResultList";
import SearchService from "@/service/search";
import { Metadata } from "next";

type SearchPageProps = {
  searchParams: Promise<{ type: "bai-viet" | "video" | ""; keyword: string }>;
};

export const metadata: Metadata = {
  title: "Tìm Kiếm - Báo Hải Quân Việt Nam",
  description: "Chuyên Trang Báo Chính Thức Của Hải Quân Nhân Dân Việt Nam",
  icons: { icon: "/favicon.ico" },
};

const TimKiemPage = async ({ searchParams }: SearchPageProps) => {
  const { type, keyword } = await searchParams;
  let results: any = [];
  try {
    results =
      type !== "video"
        ? await SearchService.articles(keyword)
        : await SearchService.videos(keyword);
  } catch (error) {}
  return (
    <div>
      <form method="get" action="/tim-kiem">
        <div className="relative border rounded-md">
          <input
            type="text"
            name="keyword"
            className="border-0 p-3 w-full h-full font-medium text-lg"
            defaultValue={keyword}
            placeholder="Nhập từ khóa"
          />
          <button
            type="submit"
            className="absolute cursor-pointer right-0 top-0 bottom-0 items-center px-3"
          >
            <IconMagnifyingGlass size={20} />
          </button>
        </div>

        <div className="border-b-2 border-b-gray-200 mt-6">
          <div className="-mb-0.5 flex items-end gap-6">
            <button
              className={`${
                type !== "video" ? "border-b-blue-600" : "border-b-transparent"
              } py-1 font-medium flex items-center gap-1 hover:text-blue-700 cursor-pointer border-b-2 hover:border-b-blue-600`}
              name="type"
              value="bai-viet"
              type="submit"
            >
              <IconArticle size={20} />
              Bài viết
            </button>
            <button
              className={`${
                type == "video" ? "border-b-blue-600" : "border-b-transparent"
              } py-1 font-medium flex items-center gap-1 hover:text-blue-700 cursor-pointer border-b-2 hover:border-b-blue-600`}
              name="type"
              value="video"
              type="submit"
            >
              <IconVideo size={20} />
              Video
            </button>
          </div>
        </div>
      </form>
      {keyword && (
        <>
          <p className="mt-6">
            <b className="text-blue-700">{results.count.toLocaleString()}</b>{" "}
            kết quả phù hợp
          </p>
          <ResultList items={results?.items} keyword={keyword} type={type} />
        </>
      )}
    </div>
  );
};

export default TimKiemPage;
