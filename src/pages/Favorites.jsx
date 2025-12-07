import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavs);
  }, []);

  const clearFavorites = () => {
    if(window.confirm("Are you sure you want to clear all favorites?")) {
        localStorage.removeItem('favorites');
        setFavorites([]);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
       <div className="flex justify-between items-center mb-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold border-b-4 border-pink-600 pb-2">My Favorites</h1>
        <div className="space-x-4">
            {favorites.length > 0 && (
                <button onClick={clearFavorites} className="text-red-400 hover:text-red-300">Clear All</button>
            )}
            <Link to="/" className="text-blue-400 hover:underline">Back to Search</Link>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center mt-20">
            <p className="text-2xl text-gray-500">No favorites added yet.</p>
            <Link to="/" className="mt-4 inline-block text-blue-500 hover:underline">Go search for movies</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {favorites.map(movie => <MovieCard key={movie.imdbID} movie={movie} />)}
        </div>
      )}
    </div>
  );
};

export default Favorites;