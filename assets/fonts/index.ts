import fs from "fs/promises";
import { Geist } from "next/font/google";
import path from "path";
import * as React from "react";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const getGeistRegular = React.cache(async () => {
  return await fs.readFile(
    path.join(process.cwd(), "assets/fonts/Geist-Regular.ttf"),
  );
});

export const getGeistSemiBold = React.cache(async () => {
  return await fs.readFile(
    path.join(process.cwd(), "assets/fonts/Geist-SemiBold.ttf"),
  );
});
