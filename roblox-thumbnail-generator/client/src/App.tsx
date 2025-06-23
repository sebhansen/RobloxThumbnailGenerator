import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';
import Success from './pages/Success';

const App: React.FC = () => (
  <Router>
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="text-xl font-bold text-white">Roblox Thumbnail Generator</div>
          <div>
            <span className="text-sm text-purple-400 bg-purple-900/50 px-2 py-1 rounded-md mr-4">Beta</span>
            <button className="bg-white text-gray-900 font-semibold py-2 px-4 rounded-md hover:bg-gray-200">
              Sign In
            </button>
          </div>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </main>
    </div>
  </Router>
);

export default App;
