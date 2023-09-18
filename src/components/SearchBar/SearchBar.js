import CloseIcon from "../icons/CloseIcon";
import SearchIcon from "../icons/SearchIcon";
import "./searchBar.css";
import React, { useState } from "react";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const isURL = (str) => {
    const urlRegex =
      /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/;
    return urlRegex.test(str);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isURL(searchQuery)) {
      window.location.href = `http://${searchQuery}`;
    } else {
      // Search using Google
      const googleSearchURL = `https://www.google.com/search?q=${encodeURIComponent(
        searchQuery
      )}`;
      window.location.href = googleSearchURL;
    }
  };
  const handleClick = () => {
    setSearchQuery("");
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="searchbar">
          <div className="search-icon">
            <SearchIcon width={18} height={18} fill={"#5f6368"} />
          </div>
          <input
            type="text"
            placeholder="Buscar en Google o escribir una URL"
            value={searchQuery}
            onChange={handleChange}
            required
            className="input"
          />
          {searchQuery && (
            <div className="close" name="close" onClick={handleClick}>
              <CloseIcon width={28} height={28} fill={"#5f6368"} />
            </div>
          )}
        </div>
      </form>
    </>
  );
}

export default SearchBar;
