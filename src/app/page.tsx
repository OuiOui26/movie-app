"use client";
 
import React, { useCallback } from "react";
import Movie from '@/types/movies';
import Genre from '@/types/genre';
import { useEffect, useMemo, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import GenreFilter from "../components/GenreFilter"; 
import MovieModal from "@/components/MovieDetails";
const apiKey = "136d55d9c6878da748d19b6aa4870c86";
const baseURL = 'https://api.themoviedb.org/3/';



export default function Home() {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  
  const [searchInput, setSearchInput] = useState('');

  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [showGenres, setShowGenres] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleShowGenres = useCallback(() => {
    setShowGenres(prev => !prev);
  }, []);


  const handleSearch = async () => {
  if (!searchInput.trim()) return;
  const res = await fetch(`${baseURL}search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchInput)}&language=en-US`);
  const data = await res.json();
  setMovies(data.results);
  };

  useEffect(() => {
    async function fetchGenres() {
      try {
        const [genreRes] = await Promise.all([
          fetch(`${baseURL}genre/movie/list?api_key=${apiKey}&language=en-US`),
        ]);
        const genreData = await genreRes.json();
        setGenres(genreData.genres);
      } catch (err) {
        console.error("Failed to fetch movies or genres:", err);
      }
    }
    fetchGenres();
  }, []);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchGenre =
        selectedGenres.length === 0 ||
        movie.genre_ids?.some((id) => selectedGenres.includes(id));

      const matchDate =
        (!startDate || movie.release_date >= startDate) &&
        (!endDate || movie.release_date <= endDate);

      return matchGenre && matchDate;
      
    });
  }, [movies, selectedGenres, startDate, endDate]);
  
  return (
  <>
    <h1 className="w-[80%] mx-auto text-center text-7xl my-10">Movie App</h1>
    <div className="w-[80%] mx-auto p-10">
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="Search movies..."
        className="border p-2 rounded w-full"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />

      <button onClick={handleSearch} className="bg-blue-500 text-white px-4 rounded">
        Search
      </button>
      
    </div>
          <div className="my-4">
          <button className="bg-blue-500 p-3 rounded-lg text-lg" onClick={handleShowGenres}>Filter</button>
      </div>
      {showGenres && (
        <GenreFilter
          genres={genres}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/noImage.jpg"
              }
              alt={movie.title}
              className="w-full h-[400px] object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800 line-clamp-1">{movie.title}</h2>
              <p className="text-sm text-gray-500 mb-2">
                {new Date(movie.release_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-sm text-gray-600 line-clamp-3">{movie.overview}</p>
              <button
                onClick={() => openModal(movie)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4 w-full text-sm font-medium transition"
              >
                More Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <MovieModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          movie={selectedMovie}
        />
      )}
    </div>
    
  </>

  );
}
