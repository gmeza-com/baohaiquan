"use client";

import Image from "next/image";

const SHARE_BRAND = [
  {
    key: "facebook",
    icon: "/icon/facebook-brand.webp",
    name: "Facebook",
  },
  {
    key: "x",
    icon: "/icon/brand-twitter.png",
    name: "X",
  },
  {
    key: "linkedin",
    icon: "/icon/brand-linkedin.png",
    name: "Linkedin",
  },
];

interface ShareListProps {
  url: string;
  title?: string;
  description?: string;
}

const ShareList: React.FC<ShareListProps> = ({
  url,
  title = "",
  description = "",
}) => {
  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description);

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "x":
        shareUrl = `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&description=${encodedDescription}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
        break;

      default:
        return;
    }

    // Open share dialog in a new window
    if (shareUrl) {
      window.open(
        shareUrl,
        "_blank",
        "width=600,height=400,scrollbars=yes,resizable=yes"
      );
    }
  };

  return (
    <div className="flex items-center gap-3">
      {SHARE_BRAND.map((item) => (
        <button
          key={item.key}
          className="transition-transform hover:scale-110 focus:outline-none"
          onClick={() => handleShare(item.key)}
          aria-label={`Share on ${item.name}`}
        >
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
