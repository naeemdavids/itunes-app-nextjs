"use client";

import React from "react";
import Link from "next/link";
import FavoritesDelete from "./FavoritesDelete";

// Helper function to update artwork URL size.
const getLargerArtworkUrl = (url, size = 600) => {
  return url.replace(/\/\d+x\d+bb.jpg$/, `/${size}x${size}bb.jpg`);
};

// This component gets the data for each item of the favorites array from the FavoritesPage component via props and displays each item's unique data and information.
function FavoritesBox({ favorites, onDelete }) {
  const getFavorites = favorites;
  const largerArtworkUrl = getLargerArtworkUrl(getFavorites?.artworkUrl100); // Use larger image.

  const sanitizedFavorites = {
    trackName: favorites.trackName,
    artistName: favorites.artistName,
    artworkUrl100: largerArtworkUrl,
    previewUrl: favorites.previewUrl,
  };

  return (
    <div className="my-3">
      <Link
        href={{
          pathname: "/favoritespreview",
          query: sanitizedFavorites,
        }}
      >
        <div className="bg-gray-800 text-white p-4 rounded shadow-lg hover:shadow-xl transition-shadow">
          {/* Display data from props */}
          <div>
            <h4 className="text-lg font-bold mb-2">{favorites.trackName}</h4>
            <div className="mb-3">
              <img
                src={largerArtworkUrl}
                alt="Track Artwork"
                className="w-full max-w-xs mx-auto rounded"
              />
            </div>
            <div className="text-sm text-gray-300">
              Author: {favorites.artistName}
            </div>
          </div>

          <div className="mt-3">
            <FavoritesDelete
              trackName={favorites.trackName}
              onDelete={onDelete}
            />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default FavoritesBox;

/*
        href={{
          pathname: "/favoritespreview",
          query: sanitizedFavorites,
        }}
*/
