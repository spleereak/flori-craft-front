import dynamic from "next/dynamic";

import { fetchData } from "../model/index.model";

const HomeClient = dynamic(
  () =>
    import("../components/HomeClient/ui").then(mod => ({
      default: mod.HomeClient,
    })),
  {
    loading: () => (
      <div className="desktop:gap-106 gap-50 desktop:pb-160 desktop:pt-28 pb-100 flex min-h-screen w-full flex-col pt-40">
        <div className="desktop:px-90 px-16">
          <div className="desktop:h-335 h-145 desktop:rounded-2xl w-full animate-pulse rounded-md bg-gray-200" />
        </div>
        <div className="flex flex-col items-center">
          <div className="h-10 w-32 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    ),
  }
);

export default async function HomePage() {
  const categories = await fetchData();
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/feature?populate[block][populate]=*`
  );

  const feature = await data.json();
  const { text, title, image, color, mobile_image } = feature.data.block;
  const hero_data = { text, title, image, color, mobile_image };

  return <HomeClient catalog={categories} hero_data={hero_data} />;
}
