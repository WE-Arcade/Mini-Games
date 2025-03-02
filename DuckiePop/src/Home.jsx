
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MusicButton from "./MusicButton";

const Home = () => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    // Retrieve last visit date and set up a timer
    const lastVisitDate = localStorage.getItem("lastVisitDate");
    const today = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD format

    if (lastVisitDate === today) {
      // If already visited today, calculate the time left
      const lastVisitTime = new Date(localStorage.getItem("lastVisitTime"));
      const now = new Date();
      const timeRemaining = 24 * 60 * 60 * 1000 - (now - lastVisitTime); // 24 hours - time passed

      if (timeRemaining > 0) {
        // Update time left every second
        const timer = setInterval(() => {
          const newTimeLeft = timeRemaining - (new Date() - lastVisitTime);
          if (newTimeLeft <= 0) {
            clearInterval(timer);  // Stop the interval when time is up
            setTimeLeft(0);  // Set timeLeft to 0 when time's up
          } else {
            setTimeLeft(newTimeLeft);
          }
        }, 1000);

        // Cleanup interval when the component is unmounted
        return () => clearInterval(timer);
      } else {
        // If more than 24 hours passed, reset timer
        setTimeLeft(0);
      }
    } else {
      // Reset time left if it's a new day
      setTimeLeft(0);
    }
  }, []);

  const handleDailyWordClick = () => {
    const lastVisitDate = localStorage.getItem("lastVisitDate");
    const today = new Date().toISOString().split("T")[0]; // Current date

    if (lastVisitDate === today) {
      // Set last visit time
      localStorage.setItem("lastVisitTime", new Date().toISOString());
      alert("You've already visited the Daily Word today. Come back tomorrow!");
    } else {
      // Set the last visit date
      localStorage.setItem("lastVisitDate", today);
      localStorage.setItem("lastVisitTime", new Date().toISOString());
    }
  };

  const formatTimeLeft = (ms) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="home-container p-8 h-screen bg-[#FBE6C2]">
      <div className="relative wall border-8 border-[#A67C52] h-full">
        {/* Background Image */}
        <img
          src="public/icons/home-duckie.webp"
          alt="Game Logo"
          className="absolute inset-0 w-full h-full object-cover blur-md opacity-25"
        />

        {/* Game Box */}
        <div className="game-box flex flex-col items-center justify-center h-full space-y-10">
          {/* Logo */}
          <img
            src="public/icons/logo.png"
            alt="Game Title"
            className="w-1/2 mb-6"
          />
          
          {/* Play Button */}
          <div className="play-btn">
            <Link to="/categories">
              <button className="bg-[#94B49F] text-white text-4xl px-16 py-6 rounded-full shadow-xl hover:scale-110 hover:shadow-2xl transition transform duration-300 ease-in-out">
                <img
                  src="public/icons/play.ico"
                  alt="Play Icon"
                  className="inline-block w-10 mr-3"
                />
                Play
              </button>
            </Link>
          </div>

          {/* Other Options */}
          <div className="other-options flex space-x-6">
            <Link to="/DailyWord" onClick={handleDailyWordClick}>
              {/* Daily Word Button */}
              <button
                className="bg-[#A67C52] text-white text-2xl px-12 py-4 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition transform duration-300 ease-in-out"
                disabled={timeLeft > 0} // Disable the button if there's still time left
              >
                {timeLeft > 0 ? `Try Again in ${formatTimeLeft(timeLeft)}` : "Daily Word"}
              </button>
            </Link>

            {/* 2 Player Button */}
            <Link to="/TwoPlayer">
              <button className="bg-[#A67C52] text-white text-2xl px-12 py-4 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition transform duration-300 ease-in-out flex items-center">
                DuckieDuel
              </button>
            </Link>
          </div>
        </div>

        {/* Spinning Wheel Button */}
        <div className="fixed bottom-24 right-24 m-0 w-[200px] h-[200px] flex flex-col items-center">
          <Link to="/wheel" className="flex flex-col items-center">
            {/* Spinning Wheel Icon */}
            <img
              src="https://img.icons8.com/fluency/48/roulette.png"
              alt="Spinning Wheel Icon"
              className="w-[120px] h-[120px] transition-transform duration-500 ease-in-out hover:rotate-180"
            />

            {/* Spin the Wheel Text */}
            <p className="mt-2 text-lg font-semibold text-[#A67C52] bg-[#FBE6C2] px-4 py-2 rounded-full shadow-md">
              Spin N Win
            </p>
          </Link>
        </div>

        {/* Music Toggle Button */}
        <MusicButton className="fixed bottom-6 left-6" />
      </div>
    </div>
  );
};

export default Home;
