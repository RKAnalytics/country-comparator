const BASE_URL = "https://restcountries.com/v3.1";

export async function searchCountry(name) {
  if (!name || name.trim().length < 2) {
    throw new Error("Please enter at least 2 characters.");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000); // 8s timeout

  try {
    const res = await fetch(
      `${BASE_URL}/name/${encodeURIComponent(name.trim())}?fields=name,flags,population,area,capital,region,languages,currencies,borders`,
      { signal: controller.signal }
    );
    clearTimeout(timeout);

    if (res.status === 404) throw new Error(`No country found for "${name}".`);
    if (!res.ok) throw new Error(`API error: ${res.status}`);

    const data = await res.json();
    return data[0]; // return best match
  } catch (err) {
    if (err.name === "AbortError") throw new Error("Request timed out. Check your connection.");
    throw err;
  }
}