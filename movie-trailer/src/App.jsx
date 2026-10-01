import ReactPlayer from "react-player";
import movieTrailer from "movie-trailer";
import { useState } from "react";

function App() {
  const [video, setVideo] = useState("inception");
  const [videoURL, setVideoURL] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSearch(event) {
    event.preventDefault();
    const query = video.trim();

    if (!query) {
      setMessage("Enter a movie or show title.");
      return;
    }

    setIsLoading(true);
    setMessage("");
    setVideoURL("");

    let timeoutId;
    try {
      const timeout = new Promise((_, reject) => {
        timeoutId = setTimeout(
          () => reject(new Error("Trailer lookup timed out")),
          12000,
        );
      });
      const result = await Promise.race([movieTrailer(query), timeout]);
      if (result) {
        setVideoURL(result);
      } else {
        setMessage(
          "Trailer lookup failed. Check your connection or search YouTube directly.",
        );
      }
    } catch {
      setMessage(
        "Trailer lookup failed. Check your connection or search YouTube directly.",
      );
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  }

  return (
    <div className="App">
      <form className="search box" onSubmit={handleSearch}>
        <label htmlFor="movie-search">Search for a movie or show:</label>
        <input
          id="movie-search"
          type="text"
          value={video}
          onChange={(event) => setVideo(event.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>
      {message && (
        <p role="status">
          {message}{" "}
          {video.trim() && (
            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${video.trim()} trailer`)}`}
              target="_blank"
              rel="noreferrer"
            >
              Search YouTube
            </a>
          )}
        </p>
      )}
      {videoURL && (
        <ReactPlayer
          src={videoURL}
          controls
          onError={() =>
            setMessage(
              "This video is unavailable to embed. Search YouTube for another trailer.",
            )
          }
        />
      )}
    </div>
  );
}

export default App;
