"use client";

import React, { useState, useEffect } from "react";
import FavoritesBox from "../components/FavoritesBox";
import Link from "next/link";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]); // Data from sessionStorage is stored in state.

  // Ensures that the Favorites page is always updated only on the client side.
  useEffect(() => {
    if (typeof window !== "undefined") {
      getData();
    }
  }, []); // Run only once on component mount

  // This function receives the data from sessionStorage, and stores it in the state.
  const getData = () => {
    const storedFavorites = sessionStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  };

  // Delete handler to remove an item and update the state.
  const handleDelete = (trackName) => {
    const updatedFavorites = favorites.filter(
      (track) => track.trackName !== trackName
    );

    // Update sessionStorage and state.
    if (typeof window !== "undefined") {
      sessionStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
    setFavorites(updatedFavorites);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6 gap-2">
        <Link href="/">
          <button className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-600">
            Back To List
          </button>
        </Link>
        <h2 className="text-yellow-500 text-lg font-bold">
          Favorites Found: {favorites.length}
        </h2>
      </div>

      {/* Favorites List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {favorites.map((favorite, id) => (
          <div
            key={id}
            className="bg-gray-800 text-white rounded shadow-md p-4 flex flex-col"
          >
            {/* Render the FavoritesBox component */}
            <FavoritesBox favorites={favorite} onDelete={handleDelete} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;
