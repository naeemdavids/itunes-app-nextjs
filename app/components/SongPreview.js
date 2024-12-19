"use client";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";

function SongPreview(props) {
  const location = useLocation();
  const song = location.state;
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
              {song.trackName}
            </h1>

            {/* Artist Name */}
            <h2
              className="text-white font-weight-light mb-3 text-sm md:text-4xl"
              style={{
                textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
              }}
            >
              Author: {song.artistName}
            </h2>
          </div>

          {/* Artwork */}
          <div className="m-2">
            <img
              src={song.artworkUrl100}
              alt="artwork"
              className="img-fluid shadow-lg"
              style={{ maxWidth: "200px", border: "1px solid #fff" }}
            />
          </div>
        </div>
      </div>

      <div className="border border-light rounded mb-3">
        {/* This code makes the video responsive */}
        {song.kind === "song" ? (
          <audio controls="controls" autoPlay="autoPlay" className="w-100">
            <source src={song.previewUrl} type="audio/mp4" />
          </audio>
        ) : (
          <div className="ratio ratio-16x9">
            <video controls="controls" className="w-100" autoPlay="autoPlay">
              <source src={song.previewUrl} type="video/mp4" />
              Your browser does not support this video.
            </video>
          </div>
        )}
      </div>

      <div className="d-flex justify-content-center">
        <button
          className="btn btn-outline-light mx-3"
          onClick={() => navigate(-1)}
        >
          Back to Search list
        </button>

        <FavoriteButton
          trackName={song?.trackName}
          artistName={song?.artistName}
          trackPrice={song?.trackPrice}
          currency={song?.currency}
          artworkUrl100={song?.artworkUrl100}
          previewUrl={song?.previewUrl}
        />
      </div>
    </div>
  );
}

export default SongPreview;
