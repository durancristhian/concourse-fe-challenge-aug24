import { setDefaultOptions } from "date-fns";
import { enUS } from "date-fns/locale";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
/* Default tooltip styles. If we want to create our own custom way of looking of them, we can remove this CSS and handle styles on our own. */
import "tippy.js/dist/tippy.css";
/* Default css. It just contains Tailwind initialization stuff. */
import "./globals.css";

/* We configure date-fns to use enUS as the default locale. */
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
