// You need to get your own API keys for these services!
const OPENWEATHER_API_KEY = 'd489a9d7743754c40ab84dc6be4e5aca';

export async function getWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Weather API error');
  return res.json();
}

export async function getElevation(lat, lon) {
  // Example using Open-Elevation (no API key, but limited)
  const url = `https://api.open-elevation.com/api/v1/lookup?locations=${lat},${lon}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Elevation API error');
  const data = await res.json();
  return data.results[0].elevation;
}

export async function getPlaceInfo(lat, lon) {
  // OpenStreetMap Nominatim reverse geocoding
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Place info API error');
  return res.json();
}
