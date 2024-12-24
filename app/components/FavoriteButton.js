"use client";

import React, { useEffect, useState } from "react";

function FavoriteButton(props) {
  const [favoritesScan, setFavoritesScan] = useState([]); // State to track favorites.

  // Load favorites from sessionStorage only on the client side.
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFavorites = sessionStorage.getItem("favorites");
      if (storedFavorites) {
        setFavoritesScan(JSON.parse(storedFavorites));
      }
    }
  }, []); // Run only once on component mount

  const { trackName, artistName, artworkUrl100, previewUrl } = props;

  // Add a track to the favorites list in sessionStorage.
  const addToFav = (e) => {
    e.preventDefault();

    const favorite = {
      trackName,
      artistName,
      artworkUrl100,
      previewUrl,
    };

    // Check if the track already exists in favorites.
    if (favoritesScan.find((song) => song.trackName === favorite.trackName)) {
      console.log("This is already in the basket");
      alert("This is already in your Favorites List!");
    } else {
      // Add the new track to favorites.
      const updatedFavorites = [...favoritesScan, favorite];
      setFavoritesScan(updatedFavorites);

      // Update sessionStorage.
      if (typeof window !== "undefined") {
        sessionStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      }

      console.log("New Favorite Added");
      alert(`${favorite.trackName} has been added to your Favorites List`);
    }
  };

  return (
    <div>
      <button
        className="px-4 py-2 bg-yellow-500 text-white rounded shadow hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        onClick={addToFav}
      >
        Add To Favorites
      </button>
    </div>
  );
}

export default FavoriteButton;
