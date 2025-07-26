import { cleanSlug } from "@/lib/utils";
import PostService from "@/service/post";
import { CategoryProps, GalleryProps } from "@/type/article";

import GalleryDetailLayout from "@/coms/MasterLayout/GalleryDetailLayout";
import { notFound } from "next/navigation";

import { ResolvingMetadata } from "next";
import VideoDetailView from "@/coms/Gallery/VideoDetailView";
import AudioDetailsView from "@/coms/Gallery/AudioDetailsView";
import CategoryService from "@/service/category";
import LongformDetailView from "@/coms/Gallery/LongformDetailView";
import ContentDetailView from "@/coms/Gallery/ContentDetailView";

type PageProps = { params: Promise<{ postSlug: string; slug: string }> };

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
) {
  try {
    let { postSlug, slug } = await params;
    postSlug = cleanSlug(postSlug);
    if (!postSlug) throw new Error("Slug is required");

    const cat = await CategoryService.getGalleryCategory(slug);

    if (!cat) throw new Error("Category not found");

    // Fetch category information
    const post = await PostService.getGalleryFromSlug(postSlug, cat.id);

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || [];

    if (post)
      return {
        title: post.name,
        description: post.description,
        icons: { icon: "/favicon.ico" },
        openGraph: {
          images: [post?.thumbnail, ...previousImages],
        },
      };
  } catch (error) {
    return {
      title: "Báo Hải Quân Việt Nam",
      description: "Chuyên Trang Báo Chính Thức Của Hải Quân Nhân Dân Việt Nam",
      icons: { icon: "/favicon.ico" },
    };
  }
}

const GalleryDetailPage = async ({ params }: PageProps) => {
  let { postSlug, slug } = await params;
  let post: GalleryProps | null = null;
  let cat: Omit<CategoryProps, "description"> | null = null;
  try {
    postSlug = cleanSlug(postSlug);
    if (!postSlug) throw new Error("Slug is required");

    cat = await CategoryService.getGalleryCategory(slug);

    if (!cat) throw new Error("Category not found");

    const postId = await PostService.getGalleryIdFromSlug(postSlug, cat?.id);

    // *: increment view count
    if (postId) {
      await PostService.increaseViewCount(postId, true);
    }

    post = await PostService.getGalleryFromSlug(postSlug, cat.id);

    if (!post) throw new Error("Post not found");
  } catch (error) {
    console.error("GalleryDetailPage:", error);
    notFound();
  }

  return (
    <GalleryDetailLayout category={cat} postName={post?.name}>
      {post?.type === "video" && <VideoDetailView post={post} cat={cat} />}
      {post?.type === "audio" && <AudioDetailsView post={post} cat={cat} />}
      {post?.type === "longform" && (
        <LongformDetailView post={post} cat={cat} />
      )}
      {post?.type === "content" && <ContentDetailView post={post} cat={cat} />}
    </GalleryDetailLayout>
  );
};

export default GalleryDetailPage;
