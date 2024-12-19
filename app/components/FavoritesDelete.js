"use client";
import React from "react";

//This component is for the delete button in the favorites list.
function FavoritesDelete(props) {
  const { trackName, onDelete } = props;

  const deleteButton = (e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up to the Link.
    e.preventDefault(); // Prevent any default behavior of the Link.

    // Get the current favorites from sessionStorage
    const storedFavorites = sessionStorage.getItem("favorites");

    if (storedFavorites) {
      // Parse the stored favorites into an array.
      const favoritesList = JSON.parse(storedFavorites);

      // Filter out the track with the given trackName.
      const updatedFavorites = favoritesList.filter(
        (track) => track.trackName !== trackName
      );

      // Update sessionStorage with the filtered list.
      sessionStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      // Activate the handleDelete() on the Parent page FavoritesPage.
      onDelete(trackName);

      console.log(`${trackName} has been removed from favorites.`);
      alert(`${trackName} has been removed from your Favorites List`);
    }
  };

  return (
    <button className="btn btn-md btn-outline-warning" onClick={deleteButton}>
      Delete
    </button>
  );
}

export default FavoritesDelete;
