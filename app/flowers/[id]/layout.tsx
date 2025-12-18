import { Metadata } from "next";

import React from "react";

import ClientLayout from "@/app/(main)/ClientLayout";
import "@/src/app/styles/globals.css";
import { CartToast } from "@/src/shared/ui/Toast";
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
        <ClientLayout>
          <Header className="desktop:flex hidden" />
          <main className="desktop:pt-232 desktop:px-90 desktop:pb-160 pb-110">
            {children}
            <CartToast />
          </main>
          <Footer className="max-desktop:hidden" />
        </ClientLayout>
      </body>
    </html>
  );
}
