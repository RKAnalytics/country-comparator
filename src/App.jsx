import { useState } from "react";
import { searchCountry } from "./api/countries";
import SearchBar from "./components/SearchBar";
import CountryCard from "./components/CountryCard";
import ErrorMessage from "./components/ErrorMessage";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    if (countries.length >= 4) {
      setError("You can compare up to 4 countries. Remove one first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const country = await searchCountry(query);

      // Prevent duplicates
      if (countries.some(c => c.name.common === country.name.common)) {
        setError(`${country.name.common} is already in the comparison.`);
        return;
      }

      setCountries(prev => [...prev, country]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeCountry = (name) => {
    setCountries(prev => prev.filter(c => c.name.common !== name));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">🌍 Country Comparator</h1>
      <p className="text-gray-500 mb-6">Search and compare up to 4 countries side by side.</p>

      <SearchBar onSearch={handleSearch} loading={loading} />
      {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}

      {countries.length === 0 && !loading && (
        <p className="text-center text-gray-400 mt-20">Search a country above to start comparing.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {countries.map(c => (
          <CountryCard key={c.name.common} country={c} onRemove={() => removeCountry(c.name.common)} />
        ))}
      </div>
    </div>
  );
}