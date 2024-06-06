import React, { useState, useRef, useEffect } from "react";
import "./App.css"

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleClick = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle video events (play/pause) to update isPlaying state
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    videoElement.addEventListener("play", handlePlay);
    videoElement.addEventListener("pause", handlePause);

    // Cleanup function to remove event listeners on unmount
    return () => {
      videoElement.removeEventListener("play", handlePlay);
      videoElement.removeEventListener("pause", handlePause);
    };
  }, [videoRef]);

  return (
    <div>
      <video ref={videoRef} src="stock.mov" type="video/mp4" controls={!isPlaying} width="640" height="480" />
      <button onClick={handleClick}>{isPlaying ? "Pause" : "Play"}</button>
    </div>
  );
};

export default App;

