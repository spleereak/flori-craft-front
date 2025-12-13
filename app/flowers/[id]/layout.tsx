import { Metadata } from "next";

import React from "react";

import "@/src/app/styles/globals.css";
import { Footer } from "@/src/widgets/footer/ui";
import { Header } from "@/src/widgets/header/ui";

export const metadata: Metadata = {
  title: "Flori Craft",
};

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Header className="desktop:flex hidden" />
        <main className="desktop:pt-232 desktop:px-90 desktop:pb-160 pb-110">
          {children}
        </main>
        <Footer className="max-desktop:hidden" />
      </body>
    </html>
  );
}
