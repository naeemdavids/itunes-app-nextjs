"use client";
import React from "react";
import FavoritesPreview from "./FavoritesPreview";
import Header from "../components/Header";

function page() {
  return (
    <div className="App container bg-dark bg-opacity-75">
      <Header />
      <FavoritesPreview />
    </div>
  );
}

export default page;
