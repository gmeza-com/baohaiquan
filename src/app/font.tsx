import { Roboto, Roboto_Mono, Anton } from "next/font/google";

export const roboto = Roboto({
  weight: ["300", "400", "500", "600", "700", "900"],
  variable: "--font-roboto",
  subsets: ["latin", "vietnamese"],
});

export const robotoMono = Roboto_Mono({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-roboto-mono",
  subsets: ["latin", "vietnamese"],
});

export const anton = Anton({
  weight: ["400"],
  variable: "--font-anton",
  subsets: ["latin", "vietnamese"],
});