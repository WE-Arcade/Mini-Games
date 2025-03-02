import React from 'react';
import { useMusic } from './MusicContext';

const MusicButton = ({ className = "" }) => {
  const musicContext = useMusic();
  
  // Add a check to ensure the context exists
  if (!musicContext) {
    console.error("Music context is undefined. Is MusicProvider in the component tree?");
    return null; // Or return a disabled button
  }
  
  const { isPlaying, toggleMusic } = musicContext;
  
  return (
    <button 
      onClick={toggleMusic}
      className={`bg-[#A67C52] text-white text-xl px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition transform duration-300 ease-in-out flex items-center ${className}`}
    >
      <img
        src={isPlaying ? "public/icons/sound-on.svg" : "public/icons/sound-off.svg"}
        alt="Sound Icon"
        className="w-6 mr-2"
      />
      {isPlaying ? "Music On" : "Music Off"}
    </button>
  );
};

export default MusicButton;