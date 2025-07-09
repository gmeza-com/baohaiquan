import { NextRequest } from "next/server";

const navigateService = {
  getGalleryCollection: (slug: string) => `/${slug}`,
  getGalleryDetails: (catSlug: string, postSlug: string) =>
    `/${catSlug}/${postSlug}`,
};

export default navigateService;
