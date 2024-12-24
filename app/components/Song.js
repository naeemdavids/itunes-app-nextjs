"use client";
import React from "react";
import Link from "next/link";

// Helper function to update artwork URL size.
const getLargerArtworkUrl = (url, size = 600) => {
  return url.replace(/\/\d+x\d+bb.jpg$/, `/${size}x${size}bb.jpg`);
};

function Song(props) {
  const song = props.song;
  const largerArtworkUrl = getLargerArtworkUrl(song?.artworkUrl100); // Use larger image.

  return (
    <div>
      <Link
        href={{
          pathname: "/preview",
          query: {
            trackName: song.trackName,
            artistName: song.artistName,
            artworkUrl100: largerArtworkUrl,
            previewUrl: song.previewUrl,
            kind: song.kind,
          },
        }}
      >
        <div
          className="bg-default text-primary my-3 p-3 rounded"
          style={{ border: "solid 1px #CCC", boxShadow: "7px 7px 5px grey" }}
        >
          <div>
            <h4 className="text-white text-center">{song?.trackName}</h4>
            <div className="mx-1">
              <img
                src={largerArtworkUrl} // Use the larger image URL.
                alt="trackArtwork"
                width="100%"
              />
            </div>
            <div className="text-white">Author: {song?.artistName}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Song;
