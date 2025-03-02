import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DuckieGame from "./DuckieGame";
import Wheel from "./Wheel";
import Home from "./Home";
import Categories from "./Categories";
import TwoPlayer from "./TwoPlayer";
import DailyWord from "./DailyWord";
import { MusicProvider } from "./MusicContext";
import "./App.css";

function App() {
  useEffect(() => {
    // Set the favicon globally when the app is loaded
    const link = document.querySelector("link[rel~='icon']");
    if (link) {
      link.href = '/icons/favicon.jpg'; // Set the favicon path to the one in your public folder
    }

    // Cleanup on unmount
    return () => {
      link.href = '/icons/favicon.jpg';  // Reset favicon if necessary
    };
  }, []);

  return (
    <MusicProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wheel" element={<Wheel />} />
          <Route path="/game" element={<DuckieGame />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/TwoPlayer" element={<TwoPlayer />} />
          <Route path="/DailyWord" element={<DailyWord />} />
        </Routes>
      </Router>
    </MusicProvider>
  );
}

export default App;
