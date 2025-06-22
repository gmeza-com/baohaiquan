import { ArticleProps } from "@/type/article";
import Link from "next/link";
import Image from "next/image";

const ArticleVerticle: React.FC<{
  post: ArticleProps;
  showDesc?: boolean;
  className?: string;
}> = ({ post, showDesc = false, className = "font-bold" }) => {
  const { name, thumbnail, description, slug } = post;
  return (
    <div className="flex flex-col gap-6">
      <Link href={`/tin-tuc/${slug}`}>
        <Image
          src={thumbnail}
          alt={name}
          width={800}
          height={600}
          loading="lazy"
          className="rounded w-full h-auto"
        />
      </Link>
      <div className={`${showDesc ? "md:px-6" : ""} gap-6 flex flex-col`}>
        <h3 className={className}>
          <Link
            href={`/tin-tuc/${slug}`}
            className="hover:underline hover:text-blue-700 transition-colors duration-200 line-clamp-4"
          >
            {name}
          </Link>
        </h3>
        {showDesc && <p>{description}</p>}
      </div>
    </div>
  );
};

export default ArticleVerticle;
