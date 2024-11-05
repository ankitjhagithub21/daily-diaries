
import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to Daily Diaries</h1>
      <p className="text-lg text-gray-600 mb-6">
        Capture your thoughts, moments, and memories each day.
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow"
        onClick={() => navigate('/add')}
      >
        Start Writing
      </button>
    </div>
  );
};

export default WelcomePage;
