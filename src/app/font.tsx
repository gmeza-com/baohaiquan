import { Roboto, Playfair_Display } from "next/font/google";

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
