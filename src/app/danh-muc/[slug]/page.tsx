const DanhMucPage = ({ params }: { params: { slug: string } }) => {
  try {
    const { slug } = params;
  } catch (error) {}

  return (
    <div className="container">
      <h1 className="text-xl font-black">Danh Mục</h1>
    </div>
  );
};

export default DanhMucPage;
