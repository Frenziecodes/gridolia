import React, { useState, useEffect } from 'react';

const Header = ({ onRecoverData }) => {
  const [isStorageExists, setIsStorageExists] = useState(false);

  useEffect(() => {
    setIsStorageExists(localStorage.getItem('saver_data') !== null);
  }, []);

  const handleRecoverClick = () => {
    if (isStorageExists) {
      const data = localStorage.getItem('saver_data').split(',');
      onRecoverData(data);
    }
  };

  const handleDeleteClick = () => {
    localStorage.clear();
    window.location.reload();
  };

  return isStorageExists ? (
    <header className="flex items-center px-4 py-2 bg-gray-300">
      <h1>Do you want to recover your data?</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-5 mr-5"
        onClick={handleRecoverClick}
      >
        Recover
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleDeleteClick}
      >
        Delete
      </button>
    </header>
  ) : null;
};

export default Header;
