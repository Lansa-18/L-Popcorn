import { useEffect } from "react";

export default function Search({ query, setQuery }) {
  useEffect(function() {
    const el = document.querySelector('.search');
    console.log(el);
    el.focus();
  }, [])

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={e => setQuery(e.target.value)}
    />
  );
}
