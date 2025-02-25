import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from 'react';
const Home = () => {
  useEffect(() => {
    const audio = new Audio('/music/home.mpeg'); // Path to the home page music
    audio.loop = true; // Loop the music if desired
    audio.play();

    return () => {
      audio.pause(); // Stop music when leaving the page
    };
  }, []);
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
          <Link to="/DailyWord" >
            {/* Daily Word Button */}
            <button className="bg-[#A67C52] text-white text-2xl px-12 py-4 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition transform duration-300 ease-in-out">
              Daily Word
            </button>
            </Link>

            {/* 2 Player Button */}
            <Link to="/TwoPlayer" >
            <button className="bg-[#A67C52] text-white text-2xl px-12 py-4 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition transform duration-300 ease-in-out flex items-center">
              <img
                src="public/icons/2.ico"
                alt="2's image"
                className="w-8 mr-2"
              />
              Player
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
      </div>
    </div>
  );
};

export default Home;
