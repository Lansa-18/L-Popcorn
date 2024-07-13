import { useEffect, useRef } from "react";

export default function Search({ query, setQuery }) {
  // BAD WAY OF DOING IT
  // useEffect(function() {
  //   const el = document.querySelector('.search');
  //   console.log(el);
  //   el.focus();
  // }, [])

  // GOOD WAY OF DOING IT
  const inputEl = useRef(null);

  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Enter") {
          if (document.activeElement === inputEl.current) return;

          inputEl.current.focus();
          setQuery("");
        }
      }

      document.addEventListener("keydown", callback);
      return () => document.removeEventListener("keydown", callback);
    },
    [setQuery]
  );

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
