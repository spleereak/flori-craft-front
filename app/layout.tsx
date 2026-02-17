import type { Metadata, Viewport } from "next";

import React from "react";

import Script from "next/script";

import "@/src/app/styles/globals.css";
import { Header } from "@/src/widgets/header/ui";

import ClientLayout from "./(main)/ClientLayout";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

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
  const YANDEX_METRIKA_ID = 106881811;

  return (
    <html lang="en">
      <body>
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRIKA_ID}', 'ym');
              ym(${YANDEX_METRIKA_ID}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
            `,
          }}
        />
        <noscript>
          <div>
            <img
              src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
              style={{ position: "absolute", left: -9999 }}
              alt=""
            />
          </div>
        </noscript>
        <ClientLayout>
          <Header className="desktop:hidden" />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
