import { HomeClient } from "../components/HomeClient/ui";
import { fetchData } from "../model/index.model";

export default async function HomePage() {
  const categories = await fetchData();

  return <HomeClient catalog={categories} />;
}
