import React from "react";
import "./Search.css";
function Search({ searchInput, search }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search for movie.."
        className="search"
        onChange={searchInput}
        onKeyPress={search}
      />
    </div>
  );
}

export default Search;
