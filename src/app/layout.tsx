"use client";
import Head from "next/head";
import { roboto } from "@/app/font";
import Bootstrap from "@/coms/App/Bootstrap";
import Toaster from "@/coms/common/Toaster";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body className={`${roboto.variable} antialiased`}>
        <Bootstrap>{children}</Bootstrap>
        <Toaster />
      </body>
    </html>
  );
}
