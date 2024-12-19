"use client";
import React, { useState, useEffect } from "react";
import FavoritesBox from "./FavoritesBox";
import { Link } from "react-router-dom";

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
    <div>
      <div className="d-flex resultsFoundBox m-2">
        <Link to="/">
          <button className="btn btn-lg btn-outline-light">Back To List</button>
        </Link>
        <h2 className="text-warning border border-warning rounded m-1 p-1">
          Favorites Found: {favorites.length}
        </h2>
      </div>

      <div className="row g-4">
        {/* This map method maps through the array received from the state. In this case the favorites list */}
        {favorites.map((favorites, id) => (
          <div key={id} className="col-12 col-sm-6 col-md-4">
            <div className="song-card h-100 d-flex flex-column">
              {/* Ensure all cards have the same height */}
              <FavoritesBox favorites={favorites} onDelete={handleDelete} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;
