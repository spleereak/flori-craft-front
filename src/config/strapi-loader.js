"use client";

export default function strapiImageLoader({ src, quality }) {
  return `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${src}?q=${quality || 100}`;
}
