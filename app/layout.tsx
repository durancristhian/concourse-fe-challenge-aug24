import { setDefaultOptions } from "date-fns";
import { enUS } from "date-fns/locale";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "tippy.js/dist/tippy.css";
import "./globals.css";

setDefaultOptions({ locale: enUS });

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Concourse FE Challenge",
  description: "Project developed by Cristhian Duran",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
