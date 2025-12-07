import React, { useState, useEffect } from 'react';
import { searchMovies } from '../services/api';
import MovieCard from '../components/MovieCard';

const Home = () => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchMovies = async () => {
    if (!query) return;
    setLoading(true);
    setError('');
    setHasSearched(true);
    
    const data = await searchMovies(query, type, page);
    
    if (data.Response === "True") {
      setMovies(data.Search);
      setTotalResults(parseInt(data.totalResults, 10));
    } else {
      setMovies([]);
      setError(data.Error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (query && hasSearched) {
      fetchMovies();
    }
  }, [page]); 

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchMovies();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      
      <div 
        className={`flex flex-col transition-all duration-500 ease-in-out ${
          hasSearched ? 'justify-start mt-4 mb-8' : 'justify-center h-[80vh]'
        }`}
      >
        
        <div 
          className={`w-full max-w-4xl mx-auto rounded-xl transition-all duration-500 ${
            hasSearched 
              ? 'bg-transparent p-0' 
              : 'bg-white shadow-2xl p-10'
          }`}
        >
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 justify-center items-center">
            
            {/* Input Field */}
            <input
              type="text"
              placeholder="Search for movies..."
              className={`p-4 rounded w-full text-black border focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-colors ${
                 hasSearched ? 'bg-gray-100 border-transparent' : 'bg-gray-50 border-gray-300'
              }`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            
            {/* Filter Dropdown */}
            <select 
              className={`p-4 rounded text-black border focus:outline-none focus:ring-2 shadow-sm cursor-pointer transition-colors ${
                hasSearched ? 'bg-gray-100 border-transparent' : 'bg-gray-50 border-gray-300'
             }`}
              value={type} 
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="movie">Movies</option>
              <option value="series">Series</option>
              <option value="episode">Episodes</option>
            </select>

            {/* Search Button */}
            <button type="submit" className="bg-red-600 px-8 py-4 rounded font-bold hover:bg-red-700 transition shadow-lg w-full md:w-auto text-white uppercase tracking-wider">
              Search
            </button>
          </form>
        </div>

      </div>

      {/* Loading & Error Messages */}
      {loading && <div className="text-center mt-10"><div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div></div>}
      {error && <p className="text-center text-red-400 text-xl font-semibold mt-10">{error}</p>}

      {/* Movie Grid */}
      {movies.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fadeIn max-w-7xl mx-auto">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>

          {/* Pagination */}
          {totalResults > 10 && (
            <div className="flex justify-center items-center gap-4 mt-10 pb-10">
              <button 
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-lg">Page {page}</span>
              <button 
                disabled={page >= Math.ceil(totalResults / 10)} 
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;