import type { Metadata } from "next";

import React from "react";

import "@/src/app/styles/globals.css";
import { Footer } from "@/src/widgets/footer/ui";
import { Header } from "@/src/widgets/header/ui";

import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "Flori Craft",
  description: "Цветочный магазин Flori Craft",
  icons: {
    icon: "/icons/logo-shortcut.png",
    shortcut: "/icons/logo-shortcut.png",
    apple: "/icons/logo-shortcut.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ClientLayout>
          <Header />
          <main className="desktop:pt-142 pt-74 relative">{children}</main>
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
