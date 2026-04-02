"use client";

import { usePathname } from "next/navigation";

import { Header } from "@/src/widgets/header/ui";

const isFlowerProductPath = (pathname: string) =>
  /^\/flowers\/[^/]+\/?$/.test(pathname);

export function ConditionalRootMobileHeader() {
  const pathname = usePathname();
  if (pathname != null && isFlowerProductPath(pathname)) {
    return null;
  }
  return <Header />;
}
