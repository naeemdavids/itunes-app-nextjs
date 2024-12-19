"use client";
import React, { useEffect, useState } from "react";

// Component for adding an item/track to the favorites list using sessionStorage.
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

  const {
    trackName,
    artistName,
    trackPrice,
    currency,
    artworkUrl100,
    previewUrl,
  } = props;

  // Add a track to the favorites list in sessionStorage.
  const addToFav = (e) => {
    e.preventDefault();

    const favorite = {
      trackName,
      artistName,
      trackPrice,
      currency,
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
      <button className="btn btn-md btn-outline-warning" onClick={addToFav}>
        Add To Favorites
      </button>
    </div>
  );
}

export default FavoriteButton;
