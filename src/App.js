import { useEffect, useState } from "react";
import { useMovies } from "./useMovies";

import {
  Box,
  ErrorMessage,
  Loader,
  Main,
  MovieDetails,
  MovieList,
  Navbar,
  NumResults,
  Search,
  WatchedMovieList,
  WatchedSummary,
} from "./components/Index";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export const KEY = "4a1f7dc";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const { movies, isLoading, error } = useMovies(query);

  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    return storedValue ? JSON.parse(storedValue) : [];
  });

  function handleSelectedMovie(id) {
    setSelectedMovieId((selectedMovieId) =>
      id === selectedMovieId ? null : id
    );
  }

  function handleCloseMovie() {
    setSelectedMovieId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);

    // Working with local storage and storing movies into it. (BADD WAY OF DOING IT)
    // localStorage.setItem('watched', JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  // Using useEffect to work with localStorage and storing movies into it. (GOOD WAY OF DOING IT)
  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        {/* COMPONENT COMPOSITION OF FIXING PROP DRILLING*/}
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectedMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedMovieId ? (
            <MovieDetails
              selectedMovieId={selectedMovieId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />{" "}
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
