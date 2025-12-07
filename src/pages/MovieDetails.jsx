import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails } from '../services/api';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await getMovieDetails(id);
      setMovie(data);
      setLoading(false);
    };
    fetchDetails();
  }, [id]);

  const addToFavorites = () => {
    const existingFavs = JSON.parse(localStorage.getItem('favorites')) || [];
    // Check if movie is already in favorites
    if (!existingFavs.some((fav) => fav.imdbID === movie.imdbID)) {
      const newFavs = [...existingFavs, movie];
      localStorage.setItem('favorites', JSON.stringify(newFavs));
      alert(`${movie.Title} added to favorites!`);
    } else {
      alert("This movie is already in your favorites.");
    }
  };

  if (loading) return <div className="text-white text-center mt-20 text-xl">Loading Movie Details...</div>;
  if (!movie) return <div className="text-white text-center mt-20 text-xl">Movie not found.</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <Link to="/" className="text-blue-400 mb-6 inline-block hover:underline text-lg">← Back to Search</Link>
      
      <div className="flex flex-col md:flex-row gap-8 bg-gray-800 p-6 md:p-10 rounded-xl shadow-2xl max-w-6xl mx-auto">
        <img 
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"} 
          alt={movie.Title} 
          className="rounded-lg w-full md:w-96 object-cover shadow-lg" 
        />
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">{movie.Title}</h1>
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="bg-gray-700 px-3 py-1 rounded">{movie.Year}</span>
            <span className="bg-blue-600 px-3 py-1 rounded">{movie.Genre}</span>
            <span className="bg-yellow-600 px-3 py-1 rounded font-bold text-black">IMDb: {movie.imdbRating}</span>
          </div>
          
          <p className="text-lg leading-relaxed text-gray-300">{movie.Plot}</p>
          
          <div className="pt-4 border-t border-gray-700 space-y-2">
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Cast:</strong> {movie.Actors}</p>
            <p><strong>Runtime:</strong> {movie.Runtime}</p>
          </div>

          <button 
            onClick={addToFavorites}
            className="mt-6 bg-pink-600 px-8 py-3 rounded-lg font-bold hover:bg-pink-700 transition shadow-lg transform active:scale-95"
          >
            Add to Favorites ❤️
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;