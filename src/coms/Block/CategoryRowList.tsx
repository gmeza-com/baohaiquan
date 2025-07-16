import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shadcn/ui/carousel";
import DecorTitle from "@/coms/Home/DecorTitle";
import { isOn } from "@/lib/utils";
import Image from "next/image";

const CategoryRowList: React.FC<{ posts: any[] }> = ({ posts }) => {
  let categories: any = [];
  posts.length > 0 &&
    posts.forEach((post, idx) => {
      if (!isOn(categories[post.category_id])) {
        categories[post.category_id] = {
          name: post.category,
          id: post.category_id,
          slug: post.category_slug,
          posts: [post],
        };

        // console.log(categories[post.category_id], post);
      } else categories[post.category_id].posts.push(post);
    });

  const Posts: React.FC<{ items: any[] }> = ({ items }) => {
    return (
      <div>
        {isOn(items[0]) && (
          <div className="border-b border-dashed border-b-blue-200">
            <a href={`/tin-tuc/${items[0].slug}`}>
              <img
                src={items[0].thumbnail}
                alt={items[0].name}
                width={400}
                height={300}
                loading="lazy"
                className="rounded-lg w-full h-auto object-cover bg-accent"
              />
            </a>
            <a
              href={`/tin-tuc/${items[0].slug}`}
              className="font-bold my-3 line-clamp-2"
            >
              {items[0].name}
            </a>
          </div>
        )}
        <ul className="my-3 flex flex-col gap-4">
          {items.slice(1, 4).map((post, idx) => (
            <li
              key={idx}
              className={`${
                idx < 2 ? "border-b border-dashed border-b-blue-200" : ""
              } pb-3`}
            >
              <a
                href={`/tin-tuc/${post.slug}`}
                className="line-clamp-2 font-medium"
              >
                {post.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <Carousel>
        <div className="flex justify-between mb-9 items-end">
          <DecorTitle title="Chuyên Mục Khác" />
          <div className="flex gap-2 relative">
            <CarouselPrevious className="static translate-0" />
            <CarouselNext className="static translate-0" />
          </div>
        </div>

        <CarouselContent>
          {categories.map((cat: any, index: number) => (
            <CarouselItem
              key={index}
              className="basis-1/1 md:basis-1/2 lg:basis-1/5"
            >
              <div className="p-1">
                <h5 className="truncate mb-6 text-lg font-bold text-blue-700 border-l-4 border-l-blue-400 leading-4 pl-3">
                  <a href={`/danh-muc/${cat.slug}`}>{cat.name}</a>
                </h5>
                <Posts items={cat.posts} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CategoryRowList;
