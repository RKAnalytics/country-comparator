export default function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState("");

  const handleSubmit = () => {
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <div className="flex gap-2">
      <input
        className="border rounded px-3 py-2 flex-1"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleSubmit()}
        placeholder="Search a country..."
        disabled={loading}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={handleSubmit}
        disabled={loading || !query.trim()}
      >
        {loading ? "Searching…" : "Add"}
      </button>
    </div>
  );
}