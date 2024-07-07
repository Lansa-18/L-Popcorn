import { useEffect, useState } from 'react';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import Navbar from './components/Navbar';
import Search from './components/Search';
import NumResults from './components/NumResults';
import Box from './components/Box';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import WatchedSummary from './components/WatchedSummary';
import WatchedMovieList from './components/WatchedMovieList';
import Main from './components/Main';

export const average = arr =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export const KEY = '4a1f7dc';

export default function App() {
  const [query, setQuery] = useState('Inception');
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  // useEffect(function() {
  //   console.log('After the initial Render');
  // }, [])

  // useEffect(function() {
  //   console.log('After every Render');
  // })

  // useEffect(function() {
  //   console.log('D');
  // }, [query])

  // console.log('During Render');

  function handleSelectedMovie(id) {
    setSelectedMovieId(selectedMovieId => (id === selectedMovieId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedMovieId(null);
  }

  function handleAddWatched(movie) {
    setWatched(watched => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id));
  }

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError('');
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );

          if (!res.ok)
            throw new Error('Something went wrong with fetching movies');

          const data = await res.json();

          if (data.Response === 'False') throw new Error('Movie not found');

          setMovies(data.Search);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError('');
        return;
      }

      fetchMovies();
    },
    [query]
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
              />{' '}
            </>
          )}
        </Box>
      </Main>
    </>
  );
}











