import React from 'react';

export default function MovieCard({ movie }) {
  return (
    <div className="relative group rounded overflow-hidden shadow-lg">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white text-center p-4">
        <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
        <p className="text-sm">{movie.overview || '설명이 없습니다.'}</p>
      </div>
    </div>
  );
}
