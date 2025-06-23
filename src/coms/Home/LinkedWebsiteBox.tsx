import DecorTitle from "./DecorTitle";

const linkedWebsites = [
  {
    name: "An ninh Hải phòng",
    image: "/images/home/an-ninh-hai-phong-logo.png",
    link: "#",
  },
  {
    name: "ỦY BAN THỦY ĐẠC VIỆT NAM",
    image: "/images/home/thuy-dac-viet-nam-logo.png",
    link: "#",
  },
  {
    name: "QUÂN ĐỘI NHÂN DÂN VIỆT NAM",
    image: "/images/home/quan-doi-nhan-dan-logo.png",
    link: "#",
  },
  {
    name: "VNExpress",
    image: "/images/home/vn-express-logo.png",
    link: "#",
  },
  {
    name: "Công Ty Tnhh CNV Holdings",
    image: "/images/home/cnvcdp-logo.png",
    link: "#",
  },
  {
    name: "24h",
    image: "/images/home/24h-logo.png",
    link: "#",
  },
];

const LinkedWebsiteBox = () => {
  return (
    <div className="@container/linked-website-box">
      <DecorTitle title="Liên kết website" textClassName="@max-[250px]/linked-website-box:text-lg" />
      <div className="mt-8">
        <div className="pb-5 border-b border-blue-200 border-dashed">
          <img
            src="/images/home/cong-tin-dien-tu.webp"
            alt="Cổng thông tin điện tử"
            className="w-full rounded-[12px] shadow-[0_4px_12px_rgba(0,71,141,0.06),_0_2px_4px_rgba(0,0,0,0.02)]"
          />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-1.5 p-2 bg-blue-50 rounded-2xl">
          {linkedWebsites.map((website) => (
            <div
              key={website.name}
              className="bg-white border border-blue-100 flex items-center justify-center px-2 aspect-[139/80] overflow-hidden rounded-[12px] py-4"
            >
              <img
                src={website.image}
                alt={website.name}
                className="size-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LinkedWebsiteBox;
