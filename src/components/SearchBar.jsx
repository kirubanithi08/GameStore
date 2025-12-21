import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="searchBar">
      <input
        type="text"
        value={query}
        placeholder="🔍 Search games..."
        className="searchInput"
        onChange={handleChange}
      />
    </div>
  );
}
