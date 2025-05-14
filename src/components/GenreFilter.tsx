"use client";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Genre = {
  id: number;
  name: string;
};

interface GenreFilterProps {
  genres: Genre[];
  selectedGenres: number[];
  endDate: string;
  startDate: string;
  setSelectedGenres: React.Dispatch<React.SetStateAction<number[]>>;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
}

export default function GenreFilter({
  genres,
  selectedGenres,
  setSelectedGenres,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: GenreFilterProps) {
  return (
    <>
    <div className="flex flex-col md:flex-row md:items-end gap-4 my-6">
        <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">Start Date</label>
        <DatePicker
            selected={startDate ? new Date(startDate) : null}
            onChange={(date) => {
            if (date) {
                setStartDate(date.toISOString().split("T")[0]);
            }
            }}
            className="border border-gray-300 p-2 rounded w-full"
            placeholderText="Select start date"
        />
        </div>

        <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">End Date</label>
        <DatePicker
            selected={endDate ? new Date(endDate) : null}
            onChange={(date) => {
            if (date) {
                setEndDate(date.toISOString().split("T")[0]);
            }
            }}
            className="border border-gray-300 p-2 rounded w-full"
            placeholderText="Select end date"
        />
        </div>

        <button
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
        onClick={() => {
            setSelectedGenres([]);
            setStartDate('');
            setEndDate('');
        }}
        >
        Clear Filters
        </button>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 bg-white p-4 rounded-lg shadow">
        {genres.map((genre) => (
        <label key={genre.id} className="flex items-center gap-2 text-gray-800">
            <input
            type="checkbox"
            checked={selectedGenres.includes(genre.id)}
            value={genre.id}
            onChange={(e) => {
                const id = parseInt(e.target.value);
                setSelectedGenres((prev) =>
                e.target.checked ? [...prev, id] : prev.filter((g) => g !== id)
                );
            }}
            className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span className="text-sm">{genre.name}</span>
        </label>
        ))}
    </div>
    </>
  );
}