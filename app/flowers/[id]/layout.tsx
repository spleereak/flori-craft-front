import { Metadata } from "next";

import React from "react";

import ClientLayout from "@/app/(main)/ClientLayout";
import "@/src/app/styles/globals.css";
import { CartToast } from "@/src/shared/ui/Toast";
import { Footer } from "@/src/widgets/footer/ui";
import { Header } from "@/src/widgets/header/ui";

export const metadata: Metadata = {
  title: "FloriCraft",
  icons: {
    icon: "/icons/logo-shortcut.png",
    shortcut: "/icons/logo-shortcut.png",
    apple: "/icons/logo-shortcut.png",
  },
};

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ClientLayout>
        <Header className="max-desktop:hidden" />
        <main className="desktop:pt-232 desktop:px-90 desktop:pb-160 pb-110">
          {children}
          <CartToast />
        </main>
        <Footer className="max-desktop:hidden" />
      </ClientLayout>
    </>
  );
}
