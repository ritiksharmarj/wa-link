import type { Metadata } from "next";
import { geistSans } from "@/assets/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "WhatsApp Link Generator",
  description: "Generate WhatsApp links with pre-filled messages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} scroll-smooth antialiased`}>
        {children}
      </body>
    </html>
  );
}
