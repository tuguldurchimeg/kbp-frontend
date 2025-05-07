import { Noto_Sans, Roboto } from "next/font/google";

export const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  variable: "--font-roboto",
});

export const notoSans = Noto_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-noto-sans",
});
