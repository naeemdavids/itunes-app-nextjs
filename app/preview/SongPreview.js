"use client";
import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FavoriteButton from "../components/FavoriteButton";

function SongPreview() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const song = {
    trackName: searchParams.get("trackName"),
    artistName: searchParams.get("artistName"),
    artworkUrl100: searchParams.get("artworkUrl100"),
    previewUrl: searchParams.get("previewUrl"),
    kind: searchParams.get("kind"),
  };

  if (!song.trackName || !song.artistName) {
    return (
      <div className="max-w-4xl mx-auto mt-6 px-4 sm:px-6 lg:px-8 text-center p-3 border border-light rounded">
        <h1 className="text-white text-2xl md:text-4xl font-bold mb-3">
          Track details are missing!
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-6 px-4 sm:px-6 lg:px-8 text-center p-3 border border-light rounded">
      {/* Title and Artwork Section */}
      <div className="flex flex-col lg:flex-row items-center gap-8 mb-6 justify-between">
        <div className="flex flex-col items-center text-center lg:text-left">
          {/* Track Name */}
          <h1
            className="text-white text-2xl md:text-4xl font-bold mb-3"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}
          >
            {song.trackName}
          </h1>

          {/* Artist Name */}
          <h2
            className="text-white text-lg md:text-2xl font-light mb-3"
            style={{ textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)" }}
          >
            Author: {song.artistName}
          </h2>
        </div>

        {/* Artwork */}
        <div className="shadow-lg rounded overflow-hidden border border-white max-w-xs">
          <img
            src={song.artworkUrl100}
            alt="artwork"
            className="w-full object-cover"
          />
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-gray-800 p-1 rounded-lg mb-6">
        {song.kind === "song" ? (
          <audio controls autoPlay className="w-full rounded-lg">
            <source src={song.previewUrl} type="audio/mp4" />
          </audio>
        ) : (
          <div className="aspect-w-16 aspect-h-9">
            <video controls autoPlay className="w-full rounded-lg">
              <source src={song.previewUrl} type="video/mp4" />
              Your browser does not support this video.
            </video>
          </div>
        )}
      </div>

      {/* Navigation Button */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => router.back()}
          className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
        >
          Back to Search List
        </button>

        <FavoriteButton
          trackName={song?.trackName}
          artistName={song?.artistName}
          artworkUrl100={song?.artworkUrl100}
          previewUrl={song?.previewUrl}
        />
      </div>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SongPreview />
    </Suspense>
  );
}
