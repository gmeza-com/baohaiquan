import Image from "next/image";

const SHARE_BRAND = [
  {
    key: "zalo",
    icon: "/icon/brand-zalo.png",
    name: "Zalo",
  },
  {
    key: "facebook",
    icon: "/icon/facebook-brand.webp",
    name: "Facebook",
  },
  {
    key: "messenger",
    icon: "/icon/brand-messenger.webp",
    name: "Messenger",
  },
  {
    key: "youtube",
    icon: "/icon/brand-youtube.png",
    name: "Youtube",
  },
];

const ShareList = () => {
  return (
    <div className="flex items-center gap-3">
      {SHARE_BRAND.map((item) => (
        <button key={item.key} className="">
          <Image
            src={item.icon}
            alt={item.name}
            width={40}
            height={40}
            className="w-10 aspect-square object-contain"
          />
        </button>
      ))}
    </div>
  );
};

export default ShareList;
