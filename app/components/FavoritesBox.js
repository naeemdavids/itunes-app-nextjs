"use client";
import React from "react";
import { Link } from "react-router-dom";
import FavoritesDelete from "./FavoritesDelete";

// Helper function to update artwork URL size.
const getLargerArtworkUrl = (url, size = 600) => {
  return url.replace(/\/\d+x\d+bb.jpg$/, `/${size}x${size}bb.jpg`);
};

//This component gets the data for each item of the favorites array from the FavoritesPage component via props, and displays each items unique data and information.
function FavoritesBox(props) {
  const { favorites, onDelete } = props;
  const largerArtworkUrl = getLargerArtworkUrl(favorites?.artworkUrl100); // Use larger image.

  return (
    <div>
      <Link to="/favoritesPreview" state={favorites}>
        <div
          className="bg-default text-primary my-3 p-3"
          style={{ border: "solid 1px #CCC", boxShadow: "7px 7px 5px grey" }}
        >
          {/*Data from props is displayed here in jsx*/}
          <div>
            <h4 className="text-white">{favorites.trackName}</h4>
            <div>
              <img src={largerArtworkUrl} alt="trackArtwork" />
            </div>
            <div className="text-white">Author: {favorites.artistName}</div>
          </div>

          <div className="songButtons mt-2">
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
