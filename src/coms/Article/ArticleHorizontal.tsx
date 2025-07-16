import { ArticleProps } from "@/type/article";
import Link from "next/link";
import Image from "next/image";

const ArticleHorizontal: React.FC<{
  post: ArticleProps;
  showDesc?: boolean;
}> = ({ post, showDesc = false }) => {
  const { name, thumbnail, slug, description } = post;
  return (
    <div className="grid grid-cols-7 gap-4">
      <Link href={`/tin-tuc/${slug}`} className="col-span-3">
        <img
          src={thumbnail}
          alt={name}
          width={400}
          height={300}
          loading="lazy"
          className="rounded w-full h-auto object-cover bg-accent"
        />
      </Link>
      <div className="col-span-4 flex flex-col gap-4">
        <h3 className="font-bold col-span-4">
          <Link
            href={`/tin-tuc/${slug}`}
            className="hover:underline hover:text-blue-700 line-clamp-3 transition-colors duration-200"
          >
            {name}
          </Link>
        </h3>
        {showDesc && (
          <p className="line-clamp-3 md:line-clamp-none">{description}</p>
        )}
      </div>
    </div>
  );
};

export default ArticleHorizontal;
