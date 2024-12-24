"use client";
import SongPreview from "./SongPreview";
import React from "react";
import Header from "../components/Header";

export default function PreviewPage() {
  return (
    <div className="App container bg-dark bg-opacity-75">
      <Header />
      <SongPreview />
    </div>
  );
}
