import clsx from "clsx";

interface HighlightArticleCardProps {
  className?: string;
}

const HighlightArticleCard: React.FC<HighlightArticleCardProps> = ({
  className,
}) => {
  return (
    <div className={clsx("flex flex-col gap-4 lg:gap-6", className)}>
      <img
        src="https://picsum.photos/300/200"
        alt="test"
        className="w-full object-cover aspect-video md:rounded-[8px]"
      />
      <div className="px-4 lg:px-6 flex flex-col gap-2.5 lg:gap-4">
        <h2 className="text-xl font-bold leading-[140%] text-gray-900 tracking-[-1%] lg:text-[2rem] lg:leading-[130%]">
          Khối thi đua số 2, Vùng 3: Hội nghị sơ kết công tác thi đua khen
          thưởng 6 tháng đầu năm 2025
        </h2>
        <p className="text-[15px] font-normal leading-[160%] text-gray-700 tracking-[0%]">
          Sáng 26/5, tại Lữ đoàn 172 (Đà Nẵng) khối thi đua số 2 (khối cấp
          trung, lữ đoàn và tương đương) Vùng 3 Hải quân tổ chức Hội nghị sơ kết
          công tác thi đua khen thưởng (TĐKT) và phong trào thi đua quyết thắng
          (TĐQT) 6 tháng đầu năm 2025. Đại tá Vũ Đình Hiển, Phó Tư lệnh, Tham
          mưu trưởng Vùng 3 dự, chỉ đạo.
        </p>
      </div>
    </div>
  );
};

export default HighlightArticleCard;
