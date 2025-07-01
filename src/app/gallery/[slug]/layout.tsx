import GalleryDetailLayoutComponent from "@/coms/MasterLayout/GalleryDetailLayout";
import PostService from "@/service/post";
import { notFound } from "next/navigation";

const GalleryDetailLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const cat = await PostService.getCategoryOfGallery(slug);

  if (!cat) {
    notFound();
  }

  return (
    <GalleryDetailLayoutComponent category={cat}>
      {children}
    </GalleryDetailLayoutComponent>
  );
};

export default GalleryDetailLayout;
