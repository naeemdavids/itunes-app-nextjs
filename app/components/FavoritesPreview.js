"use client";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

//This is the preview component for the users favorites items. The data of the chosen favorite item is passed here via props and displayed here once again.
function FavoritesPreview(props) {
  const location = useLocation();
  const getFavorites = location.state;
  const navigate = useNavigate();

  return (
    <div className="w-100 mx-auto mt-3 text-center border border-light rounded p-3">
      <div className="d-flex flex-column align-items-center mb-4">
        <div className="d-flex gap-5">
          <div>
            {/* Track Name */}
            <h1
              className="text-white font-weight-bold mb-3 text-base md:text-5xl"
              style={{
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
              }}
            >
              {getFavorites.trackName}
            </h1>

            {/* Artist Name */}
            <h2
              className="text-white font-weight-light mb-3 text-sm md:text-4xl"
              style={{
                textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
              }}
            >
              Author: {getFavorites.artistName}
            </h2>
          </div>

          {/* Artwork */}
          <div className="m-2">
            <img
              src={getFavorites.artworkUrl100}
              alt="artwork"
              className="img-fluid shadow-lg"
              style={{ maxWidth: "200px", border: "1px solid #fff" }}
            />
          </div>
        </div>
      </div>

      <div className="border border-light rounded mb-3">
        {/* This code makes the video responsive */}
        {getFavorites.kind === "getFavorites" ? (
          <audio controls="controls" autoPlay="autoPlay" className="w-100">
            <source src={getFavorites.previewUrl} type="audio/mp4" />
          </audio>
        ) : (
          <div className="ratio ratio-16x9">
            <video controls="controls" className="w-100" autoPlay="autoPlay">
              <source src={getFavorites.previewUrl} type="video/mp4" />
              Your browser does not support this video.
            </video>
          </div>
        )}
      </div>

      <div>
        <button
          className="btn btn-outline-light m-2"
          onClick={() => navigate(-1)}
        >
          Back to Favorites list
        </button>
      </div>
    </div>
  );
}

export default FavoritesPreview;
