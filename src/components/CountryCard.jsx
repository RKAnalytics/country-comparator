export default function CountryCard({ country, onRemove }) {
  const languages = Object.values(country.languages || {}).join(", ");
  const currencies = Object.values(country.currencies || {})
    .map(c => `${c.name} (${c.symbol})`)
    .join(", ");

  return (
    <div className="border rounded-xl p-4 shadow relative">
      <button onClick={onRemove} className="absolute top-2 right-2 text-red-400">✕</button>
      <img src={country.flags.svg} alt={country.name.common} className="w-full h-32 object-cover rounded mb-3" />
      <h2 className="text-xl font-bold">{country.name.common}</h2>
      <p className="text-sm text-gray-500">{country.region}</p>
      <div className="mt-3 space-y-1 text-sm">
        <p><span className="font-semibold">Capital:</span> {country.capital?.[0] ?? "N/A"}</p>
        <p><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</p>
        <p><span className="font-semibold">Area:</span> {country.area.toLocaleString()} km²</p>
        <p><span className="font-semibold">Languages:</span> {languages || "N/A"}</p>
        <p><span className="font-semibold">Currency:</span> {currencies || "N/A"}</p>
      </div>
    </div>
  );
}