import { StrapiImage } from "@/src/shared/api/strapi-client";

export interface FeatureItem {
  id: number;
  title: string;
  description: string | null;
  image: StrapiImage | null;
}

export interface FeatureResponse {
  id: number;
  documentId: string;
  items: FeatureItem[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
