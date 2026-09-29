import ReactPlayer from "react-player";
import movieTrailer from "movie-trailer";
import { useState } from "react";

function App() {
  const [video, setVideo] = useState("inception");

  const [videoURL,setVideoURL] = useState(
    "https://www.youtube.com/watch?v=sa91-dTv9Gk&feature=youtu.be",
  );
function handleSearch() {
  movieTrailer(video)
    .then((res) => {
      if (res) setVideoURL(res);
    })
    .catch(() => {
      setVideoURL("");
    });
}
  return (
    <div className="App">
      <div className="search box">
        <label htmlFor="">search for any movies/shows:{""}</label>
        <input
          type="text"
          onChange={(e) => {
            setVideo(e.target.value);
          }}
        />
        <button onClick={()=>{handleSearch()}}>search</button>
      </div>
      <ReactPlayer url={videoURL} controls={true}></ReactPlayer>
    </div>
  );
}

export default App;
