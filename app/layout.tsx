import type { Metadata } from "next";

import React from "react";

import "@/src/app/styles/globals.css";
import { Header } from "@/src/widgets/header/ui";

import ClientLayout from "./(main)/ClientLayout";

export const metadata: Metadata = {
  title: "FloriCraft",
  description: "Цветочный магазин FloriCraft",
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
      <body>
        <ClientLayout>
          <Header className="desktop:hidden" />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
