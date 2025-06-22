import { ArticleProps } from "@/type/article";
import Link from "next/link";
import Image from "next/image";

const ArticleHorizontal: React.FC<{
  post: ArticleProps;
  showDesc?: boolean;
  className?: string;
}> = ({ post }) => {
  const { name, thumbnail, slug } = post;
  return (
    <div className="grid grid-cols-7 gap-4">
      <Link href={`/tin-tuc/${slug}`} className="col-span-3">
        <Image
          src={thumbnail}
          alt={name}
          width={400}
          height={300}
          loading="lazy"
          className="rounded w-full h-auto object-cover"
        />
      </Link>
      <h3 className="font-bold col-span-4">
        <Link
          href={`/tin-tuc/${slug}`}
          className="hover:underline hover:text-blue-700 line-clamp-3 transition-colors duration-200"
        >
          {name}
        </Link>
      </h3>
    </div>
  );
};

export default ArticleHorizontal;
