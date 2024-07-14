import { useEffect, useRef } from "react";
import { useKey } from "../useKey";

export default function Search({ query, setQuery }) {
  // BAD WAY OF DOING IT
  // useEffect(function() {
  //   const el = document.querySelector('.search');
  //   console.log(el);
  //   el.focus();
  // }, [])

  // GOOD WAY OF DOING IT
  const inputEl = useRef(null);

  useKey("Enter", function() {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
