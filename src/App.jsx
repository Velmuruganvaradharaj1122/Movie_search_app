import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';

function App() {
  return (
    <Router>
      <nav className="bg-gray-800 p-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white hover:text-black transition">
             MovieSearch
          </Link>
          <div className="space-x-4">
             <Link to="/" className="bg-gray-700 px-4 py-2 rounded-lg text-white hover:text-black hover:bg-gray-600 transition">Home</Link>
             <Link to="/favorites" className="bg-gray-700 px-4 py-2 rounded-lg text-white hover:text-black hover:bg-gray-600 transition">Favorites</Link>
          </div>
        </div>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}

export default App;