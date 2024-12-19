"use client";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import "./App.css";
import Header from "./components/Header";
import SearchBox from "./components/SearchBox";
import HomePage from "./components/HomePage";
import SongPreview from "./components/SongPreview";
import FavoritesPage from "./components/FavoritesPage";
import FavoritesPreview from "./components/FavoritesPreview";
import Footer from "./components/Footer";

export default function Home() {
  const [songs, setSongs] = useState([]); //Stores the results from the api in the state.
  const [count, setCount] = useState(0); //State for How much items where found.
  const [update, setUpdate] = useState([]); //State for re-rendering the Songs List after the user puts something in the search bar and presses enter.
  let resultsGet;

  //Makes sure that the data is always updated in the homepage/searchpage.
  useEffect(() => {
    getData();
  }, [update]);

  //Function for getting the data from the API on load and storing it in the state.
  const getData = () => {
    //Default Values.
    let term = "batman";
    let entity = "movie";
    let limit = 20;

    fetch(
      `https://itunes.apple.com/search?term=${term}&entity=${entity}&limit=${limit}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCount(data.resultCount);
        setSongs(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Function that gets the information typed in the search bar and sends it to the API when the user presses the search button.
  const searchSong = async (params) => {
    let { term, entity, limit } = params;

    try {
      const sendData = await fetch(
        `https://itunes.apple.com/search?term=${term}&entity=${entity}&limit=${limit}`
      )
        .then((res) => res.json())
        .then((results) => {
          resultsGet = results;
          setCount(resultsGet.resultCount);
          setSongs(resultsGet.results);
          console.log(resultsGet, "resutls here");
        });
      console.log("Data sent successfully first");
      // If the Post to the API is successfull, this code tells the state to re-render again.
      if (sendData.ok) {
        console.log("Data sent successfully seconed");

        setTimeout(() => {
          setUpdate(resultsGet); //Update the page.
        }, 2000);
      } else {
        console.log("Failed to send data:", sendData.statusText);
      }
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  return (
    <div id="root">
      <div className="App container bg-dark bg-opacity-75">
        <Header />
        <SearchBox searchSong={searchSong} />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<HomePage songs={songs} count={count} />}
            />
            <Route path="/preview" element={<SongPreview />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/favoritesPreview" element={<FavoritesPreview />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}
