import GalleryDetailLayoutComponent from "@/coms/MasterLayout/GalleryDetailLayout";

const GalleryDetailLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <GalleryDetailLayoutComponent>{children}</GalleryDetailLayoutComponent>
  );
};

export default GalleryDetailLayout;
