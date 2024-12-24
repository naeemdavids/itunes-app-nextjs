"use client";
import React from "react";
import FavoritesPage from "./FavoritesPage";
import Header from "../components/Header";

export default function Favorites() {
  return (
    <div className="App container bg-dark bg-opacity-75">
      <Header />
      <FavoritesPage />
    </div>
  );
}
