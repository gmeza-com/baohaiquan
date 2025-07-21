import { CategoryTree } from "@/type/category";
import clsx from "clsx";
import Link from "next/link";
import ExpandableCategory from "./ExpandableCategory";
import { isOn } from "@/lib/utils";
import { useMemo } from "react";

interface Options {
  province: string;
  ward: string;
  site_address: string;
  site_email: string;
  site_phone: string;
  social_facebook: string;
  social_youtube: string;
  social_zalo: string;
}

interface FooterProps {
  categories: CategoryTree[];
  options: Options;
}

const Footer: React.FC<FooterProps> = ({ categories, options }) => {
  const socialIcons = useMemo(() => {
    return [
      {
        icon: "/icon/zalo-icon.svg",
        href: options?.social_zalo,
        alt: "Zalo",
      },
      {
        icon: "/icon/facebook-icon.svg",
        href: options?.social_facebook,
        alt: "Facebook",
      },
      {
        icon: "/icon/youtube-icon.svg",
        href: options?.social_youtube,
        alt: "Youtube",
      },
    ];
  }, [options]);

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
      value: `${options?.site_address}, ${options?.ward}, ${options?.province}`,
      key: "main_office",
    },
    {
      label: "Liên hệ",
      value: `${options?.site_phone}\n${options?.site_email}`,
      key: "contact",
    },
  ];

  return (
    <footer className="bg-blue-50 pt-9 xl:pt-16">
      <div className="container ">
        <ul className="flex gap-4 flex-col md:hidden">
          {isOn(categories) &&
            categories.map((category) => (
              <ExpandableCategory key={category.id} category={category} />
            ))}
        </ul>
        <ul className="hidden md:grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10 pb-16">
          {isOn(categories) &&
            categories.map((category) => (
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
              <img src="/red-logo.svg" alt="Logo" className="w-[212px]" />
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
            <SocialIcons
              className="lg:row-start-2 lg:col-start-4 xl:col-start-5"
              data={socialIcons}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

interface SocialIconProps {
  className?: string;
  data: Record<string, string>[];
}

const SocialIcons: React.FC<SocialIconProps> = ({ className, data }) => {
  return (
    <div className={clsx("flex gap-1", className)}>
      {data?.map((item, idx) => (
        <Link
          key={idx}
          href={item.href}
          target="_blank"
          className="size-7 rounded-full"
        >
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
