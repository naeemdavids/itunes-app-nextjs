"use client";
import React, { useState } from "react";

//This component is for the search box. Information that the user types here is sent to the App component.
function SearchBox(props) {
  const [term, setTerm] = useState("Batman"); //Stores the term to be searched in the state.
  const [entity, setEntity] = useState("movie"); //Stores the entity to be searched in the state.
  const [limit, setLimit] = useState(20); //Stores the limit to be searched in the state.

  //Function activates when the user presses the search button. It gets the information stored in the state and sends it to the searchSong() function in the App component.
  const searchHandler = (event) => {
    event.preventDefault();
    if (term === "" || entity === "") {
      alert("Please enter search Data");
      return;
    }

    const params = {
      term: term,
      entity: entity,
      limit: limit,
    };
    props.searchSong(params);
  };

  return (
    <form
      className="searchBox d-flex flex-wrap justify-content-center gap-3 p-1"
      onSubmit={searchHandler}
    >
      <div className="searchBox-item">
        <label className="text-white mx-2 fw-bold fs-3">Search: </label>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>

      <div className="searchBox-item">
        <label className="text-white mx-2 fw-bold fs-3">Content Type: </label>
        <select value={entity} onChange={(e) => setEntity(e.target.value)}>
          <option value="movie">Movie</option>
          <option value="musicVideo">Music Video</option>
          <option value="musicTrack">Music Audio</option>
          <option value="podcast">Podcast</option>
          <option value="audiobook">Audio Book</option>
          <option value="shortFilm">Short Film</option>
          <option value="tvSeason">TV Show(Season)</option>
          <option value="tvEpisode">TV Show(Episode)</option>
          <option value="software">Software</option>
          <option value="ebook">eBook</option>
          <option value="	movie, album, allArtist, podcast, musicVideo, mix, audiobook, tvSeason, allTrack">
            All
          </option>
        </select>
      </div>

      <div className="searchBox-item">
        <label className="text-white mx-2 fw-bold fs-3">Limit: </label>
        <input
          type="number"
          min={1}
          max={200}
          placeholder="20"
          onChange={(e) => setLimit(e.target.value)}
        />
      </div>

      <div className="searchBox-item">
        <input
          type="submit"
          value="Search"
          className="btn btn-outline-light fw-bold fs-5"
        />
      </div>
    </form>
  );
}

export default SearchBox;
