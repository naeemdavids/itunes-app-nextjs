"use client";
import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function FavoritesPreviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract query parameters
  const song = {
    trackName: searchParams.get("trackName") || "Unknown Track",
    artistName: searchParams.get("artistName") || "Unknown Artist",
    artworkUrl100: searchParams.get("artworkUrl100") || "/default-artwork.jpg",
    previewUrl: searchParams.get("previewUrl") || "#",
  };

  // Handle missing data gracefully
  if (
    !song.trackName ||
    !song.artistName ||
    !song.artworkUrl100 ||
    !song.previewUrl
  ) {
    return (
      <div className="w-full mx-auto mt-6 text-center border border-red-500 rounded-lg p-6 bg-red-800 shadow-lg">
        <h1 className="text-white text-xl font-bold">Error</h1>
        <p className="text-white">Missing required data. Please try again.</p>
        <button
          className="mt-4 px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition duration-300"
          onClick={() => router.back()}
        >
          Go Back
        </button>
      </div>
    );
  }

  console.log(song); // Inspect data passed to FavoritesBox
  console.log(searchParams.toString()); // Inspect query parameters

  return (
    <div className="w-full mx-auto mt-6 text-center border border-gray-500 rounded-lg p-6 shadow-lg">
      <div className="flex flex-col items-center mb-6">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {/* Track and Artist Name */}
          <div>
            <h1 className="text-white font-bold mb-4 text-3xl md:text-5xl shadow-md">
              {song.trackName}
            </h1>
            <h2 className="text-gray-300 font-light mb-4 text-xl md:text-3xl">
              Author: {song.artistName}
            </h2>
          </div>

          {/* Artwork */}
          <div className="m-4">
            <img
              src={song.artworkUrl100}
              alt="Artwork"
              className="rounded shadow-lg border border-white w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Audio or Video Player */}
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

      {/* Back Button */}
      <div>
        <button
          className="px-6 py-2 bg-gray-900 text-white rounded hover:bg-gray-600 transition duration-300"
          onClick={() => router.back()}
        >
          Back to Favorites List
        </button>
      </div>
    </div>
  );
}

export default function FavoritesPreview() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FavoritesPreviewContent />
    </Suspense>
  );
}
