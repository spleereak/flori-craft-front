import { StrapiResponse, strapiApi } from "@/src/shared/api/strapi-client";

import { FeatureResponse } from "../model/feature.types";

export const featureApi = {
  getFeatures: () =>
    strapiApi.get<StrapiResponse<FeatureResponse>>("/feature", {
      params: { populate: "*" },
      revalidate: 60,
    }),
};
