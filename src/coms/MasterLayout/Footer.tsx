import { CategoryTree } from "@/type/category";
import clsx from "clsx";
import Link from "next/link";
import ExpandableCategory from "./ExpandableCategory";

const FOOTER_CONTACT_DATA = [
  {
    label: "Tổng biên tập",
    value: "Thượng tá CAO VĂN DÂN",
    key: "total_editor",
  },
  {
    label: "Phó tổng biên tập",
    value: "Thượng tá NGUYỄN TRỌNG THIẾT",
    key: "deputy_editor",
    className: "md:col-start-1 md:row-start-2 xl:col-start-2",
  },
  {
    label: "Giấy phép số",
    value: "Giấy phép số259/GP - BTTTT ngày 12-5-2021",
    key: "license_number",
  },
  {
    label: "Trụ sở chính",
    value: "Số 3B Trần Hưng Đạo, quận Hồng Bàng, thành phố Hải Phòng",
    key: "main_office",
  },
  {
    label: "Liên hệ",
    value: "069815562 - 02253747490\nbhqdt@baohaiquanvietnam.vn",
    key: "contact",
  },
];

// TODO: Add social icons url
const SOCIAL_ICONS = [
  {
    icon: "/icon/zalo-icon.svg",
    href: "https://zalo.me/069815562",
    alt: "Zalo",
  },
  {
    icon: "/icon/facebook-icon.svg",
    href: "https://www.facebook.com/baohaiquanvietnam",
    alt: "Facebook",
  },
  {
    icon: "/icon/youtube-icon.svg",
    href: "https://www.youtube.com/channel/UC_00000000000000000000000000000000",
    alt: "Youtube",
  },
];

interface FooterProps {
  categories: CategoryTree[];
}

const Footer: React.FC<FooterProps> = ({ categories }) => {
  return (
    <footer className="bg-blue-50 pt-9 xl:pt-16">
      <div className="container ">
        <ul className="flex gap-4 flex-col md:hidden">
          {categories.map((category) => (
            <ExpandableCategory key={category.id} category={category} />
          ))}
        </ul>
        <ul className="hidden md:grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10 pb-16">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/danh-muc/${category.slug}`}
                className="text-lg font-semibold text-gray-900 leading-[150%] tracking-[-1%]"
              >
                {category.name}
              </Link>
              <ul className="mt-2 flex flex-col gap-3">
                {category?.children?.map((item) => (
                  <li key={item.id}>
                    <Link
                      className="text-gray-900 text-[15px] leading-[150%] tracking-[0%] font-normal"
                      href={`/danh-muc/${item.slug}`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="pt-7 pb-7 md:border-t border-blue-200">
          <Link href="/">
            <img
              src="/red-logo.svg"
              alt="Logo"
              className="w-[212px] mx-auto xl:hidden"
            />
          </Link>
          <table className="mt-8 md:hidden">
            <tbody>
              {FOOTER_CONTACT_DATA.map((item) => (
                <tr key={item.key}>
                  <td className="pe-2 py-2 flex items-start">
                    <span className="whitespace-nowrap text-[13px] font-medium leading-[150%] tracking-[-1%] text-gray-900">
                      {item.label}
                    </span>
                  </td>
                  <td className="text-[#5D5D5D] text-[13px] leading-[150%] tracking-[0%] py-2">
                    {item.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="md:grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:grid-rows-2 pt-7 gap-4 hidden">
            <Link href="/" className="hidden xl:block row-span-2">
              <img
                src="/red-logo.svg"
                alt="Logo"
                className="w-[212px]"
              />
            </Link>

            {FOOTER_CONTACT_DATA?.map((item) => (
              <div
                key={item.key}
                className={clsx("flex flex-col gap-2", item?.className)}
              >
                <span className="text-[13px] font-medium leading-[150%] tracking-[-1%] text-gray-900">
                  {item.label}
                </span>
                <span className="text-[#5D5D5D] text-[13px] leading-[150%] tracking-[0%]">
                  {item.value}
                </span>
              </div>
            ))}
            <SocialIcons className="lg:row-start-2 lg:col-start-4 xl:col-start-5" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

interface SocialIconProps {
  className?: string;
}

const SocialIcons: React.FC<SocialIconProps> = ({ className }) => {
  return (
    <div className={clsx("flex gap-1", className)}>
      {SOCIAL_ICONS?.map((item) => (
        <Link href={item.href} target="_blank" className="size-7 rounded-full">
          <img
            src={item.icon}
            alt={item.alt}
            className="size-full object-cover"
          />
        </Link>
      ))}
    </div>
  );
};
