import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context with a default value for the entire context
const MusicContext = createContext({
  isPlaying: true,
  toggleMusic: () => {}
});

// Create a custom hook to use the music context
export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};

// Create a provider component
export const MusicProvider = ({ children }) => {
  // Set initial state to true for isPlaying
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio('/music/home.mpeg'));

  useEffect(() => {
    // Set up audio
    audio.loop = true;
    
    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Autoplay prevented:", error);
        });
      }
    }

    // Cleanup function
    return () => {
      audio.pause();
    };
  }, [audio]);

  // Toggle music function
  const toggleMusic = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(error => {
        console.log("Play failed:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  // Effect to handle changes to isPlaying state
  useEffect(() => {
    if (isPlaying) {
      audio.play().catch(error => {
        console.log("Play failed:", error);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, audio]);

  // Create a value object to pass through the context
  const value = {
    isPlaying,
    toggleMusic
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
};

export default MusicContext;