import { Roboto, Playfair_Display, Noto_Serif } from "next/font/google";

export const roboto = Roboto({
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-roboto",
  subsets: ["latin", "vietnamese"],
});

export const playfairDisplay = Playfair_Display({
  weight: ["900", "400"],
  variable: "--font-playfair-display",
  subsets: ["latin", "vietnamese"],
});

export const notoSerif = Noto_Serif({
  weight: ["400", "700"],
  variable: "--font-noto-serif",
  subsets: ["latin", "vietnamese"],
});
