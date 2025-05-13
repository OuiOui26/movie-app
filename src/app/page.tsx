"use client";
 
import React, { useCallback } from "react";
import { useEffect, useMemo, useState } from "react";


const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const baseURL = 'https://api.themoviedb.org/3/';

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date:string;
};
type Genre = {
  id:number;
  name:string;
};

export default function Home() {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [genresMap, setGenresMap] = useState<{ [key: number]: string }>({});
  const [showGenres, setShowGenres] = useState(false);



  const handleShowGenres = useCallback(() => {
    setShowGenres(prev => !prev);
  }, []);

 useEffect(() => {
    async function fetchData() {
      try {
        const [movieRes, genreRes] = await Promise.all([
          fetch(`${baseURL}movie/popular?api_key=${apiKey}&language=en-US`),
          fetch(`${baseURL}genre/movie/list?api_key=${apiKey}&language=en-US`),
        ]);

        const movieData = await movieRes.json();
        const genreData = await genreRes.json();

        setMovies(movieData.results);
        setGenres(genreData.genres);
      } catch (err) {
        console.error("Failed to fetch movies or genres:", err);
      }
    }

    fetchData();
  }, []);


   const GenreFilter = useMemo(() => {
    if (!showGenres) return null;
    return (
      <div className="grid grid-cols-4 gap-2 my-4">
        {genres.map((genre) => (
          <label key={genre.id} className="flex items-center gap-2">
            <input type="checkbox" value={genre.id} />
            {genre.name}
          </label>
        ))}
      </div>
    );
  }, [showGenres, genres]);

  
  return (
  <>
    <h1 className="w-[80%] mx-auto text-center text-7xl my-10">Movie App</h1>
    <div className="w-[80%] mx-auto p-10">
      <div className="p-4">
          <button className="bg-blue-500 p-3 rounded-lg text-lg" onClick={handleShowGenres}>Filter</button>
      </div>

      {GenreFilter}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white shadow rounded p-2">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto rounded"
            />
            <h2 className="text-lg font-semibold mt-2 text-black">{movie.title}</h2>
            <h2 className="text-lg font-semibold mt-2 text-black"> {movie.release_date}</h2>
            <p className="text-sm text-gray-600">{movie.overview.slice(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  </>

  );
}
