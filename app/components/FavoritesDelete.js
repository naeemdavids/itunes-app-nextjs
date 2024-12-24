"use client";

import React from "react";

function FavoritesDelete({ trackName, onDelete }) {
  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up.
    e.preventDefault(); // Prevent default behavior, if any.

    // Ensure the code runs only on the client side.
    if (typeof window !== "undefined") {
      const storedFavorites = sessionStorage.getItem("favorites");

      if (storedFavorites) {
        const favoritesList = JSON.parse(storedFavorites);

        // Filter out the track with the given trackName.
        const updatedFavorites = favoritesList.filter(
          (track) => track.trackName !== trackName
        );

        // Update sessionStorage with the filtered list.
        sessionStorage.setItem("favorites", JSON.stringify(updatedFavorites));

        // Call the parent delete handler.
        onDelete(trackName);

        console.log(`${trackName} has been removed from favorites.`);
        alert(`${trackName} has been removed from your Favorites List`);
      } else {
        console.log("No favorites found in sessionStorage.");
      }
    }
  };

  return (
    <button
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition duration-300"
      onClick={handleDelete}
    >
      Delete
    </button>
  );
}

export default FavoritesDelete;
