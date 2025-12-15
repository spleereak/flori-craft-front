"use client";

import React from "react";

import { useCartHydration } from "@/src/shared/hooks/use-cart-hydration";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useCartHydration();

  return <>{children}</>;
}
