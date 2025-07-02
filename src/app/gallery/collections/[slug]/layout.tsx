import PrimaryLayout from "@/coms/MasterLayout/PrimaryLayout";

const GalleryCollectionLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <PrimaryLayout>{children}</PrimaryLayout>;
};

export default GalleryCollectionLayout;
