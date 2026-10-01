import React from "react";
import "./Search.css";
function Search({ searchInput, search }) {
  return (
    <form className="search-form" onSubmit={search}>
      <input
        type="search"
        placeholder="Search for movie.."
        className="search"
        onChange={searchInput}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default Search;
