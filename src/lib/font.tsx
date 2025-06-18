import { Roboto, Roboto_Mono } from "next/font/google";

export const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "vietnamese"],
});

export const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin", "vietnamese"],
});
