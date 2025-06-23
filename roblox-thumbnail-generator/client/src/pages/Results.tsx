import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import ThumbnailGallery from '../components/ThumbnailGallery';

const Results: React.FC = () => {
  const location = useLocation();
  const { results } = location.state || { results: [] };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Your AI Thumbnails are Ready!</h1>
        <p className="text-xl text-gray-300">Select your favorite and unlock the full resolution version.</p>
      </div>
      
      <ThumbnailGallery thumbnails={results} />

      <div className="text-center mt-12">
        <Link to="/" className="text-gray-400 hover:text-white transition-colors">
          &larr; Go back and try another prompt
        </Link>
      </div>
    </div>
  );
};

export default Results;
