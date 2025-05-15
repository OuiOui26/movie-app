import React from "react";
import { MovieModalProps } from "@/types/movieModal";

export default function MovieModal ({isOpen, onClose, movie}: MovieModalProps) {
    if (!isOpen) return null;
    return(
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center">
        <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-4xl p-6 relative flex flex-col md:flex-row gap-6 overflow-y-auto max-h-[90vh]">
            <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
            >
            ✖
            </button>
            <img
            src={
                movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/noImage.jpg"
            }
            alt={movie.title}
            className="rounded w-full md:w-1/3 h-auto"
            />
            <div className="flex flex-col justify-start w-full">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{movie.title}</h2>
            <p className="text-sm text-gray-500 mb-4">
                {new Date(movie.release_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                })}
            </p>
            <p className="text-gray-700 mb-2">
                Popularity: <span className="font-semibold">{movie.popularity}</span>
            </p>
            <p className="text-gray-700">Overview: {movie.overview}</p>
            </div>
        </div>
        </div>

    );

}

