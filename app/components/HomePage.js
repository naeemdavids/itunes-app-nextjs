"use client";
import React, { useEffect, useState } from "react";
import Song from "./Song";
import { Link } from "react-router-dom";

function HomePage(props) {
  const [musicList, setMusicList] = useState(props.songs);
  let count = props.count;

  useEffect(() => {
    setMusicList(props.songs);
  }, [props.songs]);

  return (
    <div>
      <div className="d-flex resultsFoundBox m-2">
        <h2 className="text-white border border-light rounded m-1 p-1">
          Results Found: {count}
        </h2>
        <Link to="/favorites">
          <button className="btn btn-lg btn-outline-warning">Favorites</button>
        </Link>
      </div>

      <div className="row g-4">
        {musicList.map((song, id) => (
          <div key={id} className="col-12 col-sm-6 col-md-4">
            <div className="song-card h-100 d-flex flex-column">
              {/* Ensure all cards have the same height */}
              <Song song={song} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
