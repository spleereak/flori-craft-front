import type { Metadata, Viewport } from "next";

import React from "react";

import Script from "next/script";

import "@/src/app/styles/globals.css";

import ClientLayout from "./(main)/ClientLayout";
import { ConditionalRootMobileHeader } from "./ConditionalRootMobileHeader";

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
    icon: "/icon.png",
    apple: "/apple-icon.png",
    shortcut: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const YANDEX_METRIKA_ID = 106881811;
  const MAIL_RU_COUNTER_ID = "3746023";

  return (
    <html lang="en">
      <body>
        <Script id="botfaqtor-ab-id" strategy="beforeInteractive">
          {`window._ab_id_=170255;`}
        </Script>
        <Script
          id="botfaqtor-one"
          src="https://cdn.botfaqtor.ru/one.js"
          strategy="beforeInteractive"
        />
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
        <Script
          id="mail-ru-counter"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var _tmr = window._tmr || (window._tmr = []);
              _tmr.push({id: "${MAIL_RU_COUNTER_ID}", type: "pageView", start: (new Date()).getTime()});
              (function (d, w, id) {
                if (d.getElementById(id)) return;
                var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
                ts.src = "https://top-fwz1.mail.ru/js/code.js";
                var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
                if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
              })(document, window, "tmr-code");
            `,
          }}
        />
        <noscript>
          <div>
            <img
              src={`https://top-fwz1.mail.ru/counter?id=${MAIL_RU_COUNTER_ID};js=na`}
              style={{ position: "absolute", left: -9999 }}
              alt="Top.Mail.Ru"
            />
          </div>
        </noscript>
        <ClientLayout>
          <ConditionalRootMobileHeader />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
