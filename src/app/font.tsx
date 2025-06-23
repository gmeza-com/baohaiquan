import { Roboto, Anton, Oswald, Playfair_Display } from "next/font/google";

export const roboto = Roboto({
  weight: ["300", "400", "500", "600", "700", "900"],
  variable: "--font-roboto",
  subsets: ["latin", "vietnamese"],
});

// export const robotoMono = Roboto_Mono({
//   weight: ["300", "400", "500", "600", "700"],
//   variable: "--font-roboto-mono",
//   subsets: ["latin", "vietnamese"],
// });

export const oswald = Oswald({
  weight: ["400", "500"],
  variable: "--font-oswald",
  subsets: ["latin", "vietnamese"],
});

export const anton = Anton({
  weight: ["400"],
  variable: "--font-anton",
  subsets: ["latin", "vietnamese"],
});

export const playfairDisplay = Playfair_Display({
  weight: ["900", "400"],
  variable: "--font-playfair-display",
  subsets: ["latin", "vietnamese"],
});
