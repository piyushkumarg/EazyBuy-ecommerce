import React from "react";
import Navbar from "../features/navbar/Navbar";
import SearchResult from "../features/search/SearchResult"
import Footer from "../features/footer/Footer";

export default function SearchResultPage() {
  
  return (
    <div>
      <Navbar>
        <SearchResult />
      </Navbar>
      <Footer />
    </div>
  );
}
