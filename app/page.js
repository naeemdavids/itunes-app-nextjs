"use client";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchBox from "./components/SearchBox";
import HomePage from "./components/HomePage";

export default function Home() {
  const [songs, setSongs] = useState([]); // Stores the search results.
  const [count, setCount] = useState(0); // Tracks the total number of search results.

  // This effect runs on the initial render and when the `update` state changes.
  useEffect(() => {
    // Check if a previous search exists in localStorage.
    const storedSearch = localStorage.getItem("lastSearch");
    if (storedSearch) {
      // If a previous search exists, parse it and fetch the corresponding data.
      const { term, entity, limit } = JSON.parse(storedSearch);
      fetchData(term, entity, limit);
    } else {
      // If no previous search exists, fetch the default data (e.g., Batman movies).
      getData();
    }
  }, []);

  /**
   * Function to fetch data from the iTunes API with given search parameters.
   * @param {string} term - The search keyword.
   * @param {string} entity - The type of media (e.g., song, movie).
   * @param {number} limit - The maximum number of results to fetch.
   */
  const fetchData = (term, entity, limit) => {
    fetch(
      `https://itunes.apple.com/search?term=${term}&entity=${entity}&limit=${limit}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCount(data.resultCount); // Update the count of results.
        setSongs(data.results); // Update the list of results.
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  /**
   * Function to fetch default data for the home page (e.g., "Batman movies").
   */
  const getData = () => {
    const term = "batman"; // Default search term.
    const entity = "movie"; // Default type of media.
    const limit = 20; // Default number of results.
    fetchData(term, entity, limit); // Fetch default data.
  };

  /**
   * Function triggered when the user searches for a new item.
   * @param {Object} params - The search parameters entered by the user.
   */
  const searchSong = async (params) => {
    const { term, entity, limit } = params;

    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${term}&entity=${entity}&limit=${limit}`
      );
      const data = await response.json();

      // Update the state with the new search results.
      setCount(data.resultCount);
      setSongs(data.results);

      // Save the search parameters in localStorage for persistence.
      localStorage.setItem(
        "lastSearch",
        JSON.stringify({ term, entity, limit })
      );
    } catch (err) {
      console.error("Error fetching search results:", err);
    }
  };

  return (
    <div>
      <div className="App container bg-dark bg-opacity-75">
        {/* Header component */}
        <Header />

        {/* SearchBox component */}
        <SearchBox searchSong={searchSong} />

        {/* HomePage component to display the search results */}
        <HomePage songs={songs} count={count} />
      </div>
    </div>
  );
}
