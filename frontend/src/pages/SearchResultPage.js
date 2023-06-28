import React from "react";
import Navbar from "../features/navbar/Navbar";
import SearchResult from "../features/search/SearchResult"

export default function SearchResultPage() {
  
  return (
    <div>
      <Navbar>
        <SearchResult />
      </Navbar>
    </div>
  );
}
