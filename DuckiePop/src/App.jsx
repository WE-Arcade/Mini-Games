import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DuckieGame from "./DuckieGame";
import Wheel from "./Wheel";
import Home from "./Home";
import Categories from "./Categories";
import TwoPlayer from "./TwoPlayer";
import DailyWord from "./DailyWord";
import "./App.css"; 


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/wheel" element={<Wheel />} />
          <Route path="/game" element={<DuckieGame />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/TwoPlayer" element={<TwoPlayer />} />
          <Route path="/DailyWord" element={<DailyWord />} />
        </Routes>
    </Router>
  );
}

export default App;
