import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col h-full">
      <img 
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"} 
        alt={movie.Title} 
        className="w-full h-96 object-cover"
      />
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-xl font-bold truncate" title={movie.Title}>{movie.Title}</h3>
          <p className="text-gray-400 text-sm mt-1">{movie.Year} • <span className="uppercase">{movie.Type}</span></p>
        </div>
        <Link 
          to={`/movie/${movie.imdbID}`} 
          className="mt-4 text-center bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition w-full block"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;   