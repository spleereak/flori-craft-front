const YA_API_KEY = process.env.NEXT_PUBLIC_YMAPS_API_KEY;
const YA_GEOCODER_URL = process.env.NEXT_PUBLIC_YGEO_API_URL;

export interface Coordinates {
  coordX: number;
  coordY: number;
}

export async function getCoordsByAddress(
  address: string
): Promise<Coordinates> {
  if (!address.trim()) {
    throw new Error("Адрес не может быть пустым");
  }

  const params = new URLSearchParams({
    apikey: YA_API_KEY!,
    geocode: address,
    format: "json",
  });

  const response = await fetch(`${YA_GEOCODER_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status}`);
  }

  const data = await response.json();

  const members = data?.response?.GeoObjectCollection?.featureMember ?? [];

  if (!members.length) {
    throw new Error("Ничего не найдено по этому адресу");
  }

  const pos = members[0]?.GeoObject?.Point?.pos;

  if (!pos) {
    throw new Error("Не удалось прочитать координаты");
  }

  const [lonStr, latStr] = pos.split(" ");
  const coordX = parseFloat(latStr);
  const coordY = parseFloat(lonStr);

  if (Number.isNaN(coordX) || Number.isNaN(coordY)) {
    throw new Error("Некорректный формат координат");
  }

  return { coordX, coordY };
}
