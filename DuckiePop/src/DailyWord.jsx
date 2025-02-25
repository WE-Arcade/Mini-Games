
// import React, { useState, useEffect } from 'react';
// import './DailyWord.css';
// import { Link } from 'react-router-dom';

// const categories = [
//   {
//     name: 'Generative AI',
//     words: ['transformer', 'neural', 'chatbot', 'diffusion', 'prompt']
//   },
//   {
//     name: 'Web Development',
//     words: ['javascript', 'react', 'html', 'css', 'api']
//   },
//   {
//     name: 'Machine Learning',
//     words: ['algorithm', 'dataset', 'model', 'tensor', 'neuron']
//   },
//   {
//     name: 'Mathematics',
//     words: ['calculus', 'algebra', 'matrix', 'vector', 'gradient']
//   }
// ];

// const DailyWord = () => {
//   const [category, setCategory] = useState(null);
//   const [targetWord, setTargetWord] = useState('');
//   const [guessedLetters, setGuessedLetters] = useState([]);
//   const [wrongGuesses, setWrongGuesses] = useState(0);
//   const [gameState, setGameState] = useState('playing'); // Game starts in 'playing' state

//   useEffect(() => {
//     const selectedCategory = categories[Math.floor(Math.random() * categories.length)];
//     setCategory(selectedCategory.name);
//     setTargetWord(selectedCategory.words[Math.floor(Math.random() * selectedCategory.words.length)]);
//   }, []);

//   const handleLetterClick = (letter) => {
//     if (gameState !== 'playing' || guessedLetters.includes(letter)) return;

//     setGuessedLetters((prev) => [...prev, letter]);

//     if (!targetWord.includes(letter)) {
//       setWrongGuesses((prev) => prev + 1);
//     }
//   };

//   useEffect(() => {
//     if (gameState === 'playing' && guessedLetters.length > 0) {
//       if (wrongGuesses >= 4) {
//         setGameState('ended'); // Game ends if wrong guesses reach 4
//       } else if (targetWord.split('').every((letter) => guessedLetters.includes(letter))) {
//         setGameState('ended'); // Game ends if all letters are guessed correctly
//       }
//     }
//   }, [guessedLetters, wrongGuesses, targetWord, gameState]);

//   const renderWord = () => {
//     return targetWord.split('').map((letter, index) => (
//       <span key={index} className="letter">
//         {guessedLetters.includes(letter) ? letter : '_'}
//       </span>
//     ));
//   };

//   const renderKeyboard = () => {
//     const alphabet = 'abcdefghijklmnopqrstuvwxyz';
//     return alphabet.split('').map((letter) => (
//       <button
//         key={letter}
//         className="keyboard-key"
//         disabled={gameState !== 'playing' || guessedLetters.includes(letter)}
//         onClick={() => handleLetterClick(letter)}
//       >
//         {letter}
//       </button>
//     ));
//   };

//   return (
//     <div className="dailyword-container">
//       <Link to="/">
//         <img className="home-icon" src="/icons/home.ico" alt="Home Icon" />
//       </Link>
//       <h2 className="dailyword-title">Daily Word Challenge</h2>
//       {category && <div className="category-display">Category: {category}</div>}

//       <div className="word-display">{renderWord()}</div>
//       <div className="keyboard">{renderKeyboard()}</div>

//       {gameState === 'ended' && (
//         <div className="game-message">
//           {wrongGuesses >= 4 ? 'You Lose!' : 'You Win!'}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DailyWord;
// 
// import React, { useState, useEffect, useRef } from 'react';
// import './DailyWord.css'; // Import your CSS file
// import { Link } from 'react-router-dom';

// const categories = [
//   {
//     name: 'Generative AI',
//     words: ['transformer', 'neural', 'chatbot', 'diffusion', 'prompt']
//   },
//   {
//     name: 'Web Development',
//     words: ['javascript', 'react', 'html', 'css', 'api']
//   },
//   {
//     name: 'Machine Learning',
//     words: ['algorithm', 'dataset', 'model', 'tensor', 'neuron']
//   },
//   {
//     name: 'Mathematics',
//     words: ['calculus', 'algebra', 'matrix', 'vector', 'gradient']
//   }
// ];

// const DailyWord = () => {
//   // Game States
//   const [category, setCategory] = useState(null);
//   const [targetWord, setTargetWord] = useState('');
//   const [guessedLetters, setGuessedLetters] = useState([]);
//   const [wrongGuesses, setWrongGuesses] = useState(0);
//   const [gameState, setGameState] = useState('initial'); // 'initial', 'playing', 'won', 'lost'
//   const [hints, setHints] = useState(3);
//   const [undoCount, setUndoCount] = useState(3);
//   const videoRef = useRef(null); // Reference for the video element

//   // Initialize the game when the component mounts
//   useEffect(() => {
//     startNewGame();
//   }, []);

//   const startNewGame = () => {
//     const selectedCategory = categories[Math.floor(Math.random() * categories.length)];
//     const selectedWord = selectedCategory.words[Math.floor(Math.random() * selectedCategory.words.length)];
//     setCategory(selectedCategory.name);
//     setTargetWord(selectedWord);
//     setGuessedLetters([]);
//     setWrongGuesses(0);
//     setHints(3);
//     setUndoCount(3);
//     setGameState('playing');

//     if (videoRef.current) {
//       videoRef.current.load(); // Reload the video
//     }
//   };

//   const handleLetterClick = (letter) => {
//     if (gameState !== 'playing' || guessedLetters.includes(letter)) return;

//     setGuessedLetters((prev) => [...prev, letter]);

//     if (!targetWord.includes(letter)) {
//       setWrongGuesses((prev) => prev + 1);
//     }
//   };

//   useEffect(() => {
//     if (gameState === 'playing') {
//       if (wrongGuesses >= 4) {
//         setGameState('lost');
//       } else if (targetWord.split('').every((letter) => guessedLetters.includes(letter))) {
//         setGameState('won');
//       }
//     }
//   }, [guessedLetters, wrongGuesses, targetWord, gameState]);

//   const useHint = () => {
//     if (hints > 0 && gameState === 'playing') {
//       const hiddenLetters = targetWord.split('').filter((letter) => !guessedLetters.includes(letter));
//       if (hiddenLetters.length > 0) {
//         const randomHint = hiddenLetters[Math.floor(Math.random() * hiddenLetters.length)];
//         setGuessedLetters((prev) => [...prev, randomHint]);
//         setHints((prev) => prev - 1);
//       }
//     }
//   };

//   const undoLastGuess = () => {
//     if (guessedLetters.length > 0 && gameState === 'playing' && undoCount > 0) {
//       const lastGuess = guessedLetters[guessedLetters.length - 1];
//       setGuessedLetters((prev) => prev.slice(0, -1));
//       if (!targetWord.includes(lastGuess)) {
//         setWrongGuesses((prev) => prev - 1);
//       }
//       setUndoCount((prev) => prev - 1);
//     }
//   };

//   const renderWord = () => {
//     return targetWord.split('').map((letter, index) => (
//       <span key={index} className="letter">
//         {guessedLetters.includes(letter) ? letter : '_'}
//       </span>
//     ));
//   };

//   const renderKeyboard = () => {
//     const alphabet = 'abcdefghijklmnopqrstuvwxyz';
//     return alphabet.split('').map((letter) => (
//       <button
//         key={letter}
//         className="keyboard-key"
//         disabled={guessedLetters.includes(letter) || gameState !== 'playing'}
//         onClick={() => handleLetterClick(letter)}
//       >
//         {letter}
//       </button>
//     ));
//   };

//   const getDuckieVideo = () => {
//     if (wrongGuesses === 0) {
//       return '/videos/video_0.mp4';
//     } else if (wrongGuesses === 1) {
//       return '/videos/video_1.mp4';
//     } else if (wrongGuesses === 2) {
//       return '/videos/video_2.mp4';
//     } else if (wrongGuesses === 3) {
//       return '/videos/video_3.mp4';
//     } else if (gameState === 'won') {
//       return '/videos/won.mp4';
//     } else {
//       return '/videos/video4.mp4';
//     }
//   };

//   // Pause video when it ends
//   const handleVideoEnd = () => {
//     if (videoRef.current) {
//       videoRef.current.pause();
//     }
//   };

//   return (
//     <div className="desktop-1">
//       {gameState === "won" ? (
//         <div>
//           <Link to="/">
//             <img className="home-04" src="/icons/home.ico" alt="Home Icon" />
//           </Link>
//           <div className="title">
//             <img className="titleimg" src="/icons/logo.png" alt="title" />
//           </div>
//           <video 
//             className="duckie-video" 
//             autoPlay 
//             muted 
//             playsInline 
//             style={{ width: "400px", height: "400px" }}
//           >
//             <source src="/videos/won.mp4" type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           <div className="word-display">{renderWord()}</div>
//         </div>
//       ) : (
//         <div className="dailyword-container">
//           <Link to="/">
//             <img className="home-icon" src="/icons/home.ico" alt="Home Icon" />
//           </Link>
//           <h2 className="dailyword-title">Daily Word Challenge</h2>

//           {category ? (
//             <>
//               <div className="category-display">Category: {category}</div>
//               <div className="word-display">{renderWord()}</div>

//               <div className="content-wrapper">
//                 <video
//                   className="duckie-video"
//                   key={wrongGuesses}
//                   autoPlay
//                   muted
//                   playsInline
//                   ref={videoRef}
//                   onEnded={handleVideoEnd}
//                 >
//                   <source src={getDuckieVideo()} type="video/mp4" />
//                   Your browser does not support the video tag.
//                 </video>

//                 <div className="keyboard">{renderKeyboard()}</div>
//               </div>

//               {gameState !== 'playing' && gameState !== 'initial' && (
//                 <div className="game-message">{gameState === 'won' ? 'You Win!' : 'You Lose!'}</div>
//               )}
//             </>
//           ) : (
//             <p>Loading...</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DailyWord;

import React, { useState, useEffect, useRef } from 'react';
import './DailyWord.css'; // Import your CSS file
import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Generative AI',
    words: ['transformer', 'neural', 'chatbot', 'diffusion', 'prompt']
  },
  {
    name: 'Web Development',
    words: ['javascript', 'react', 'html', 'css', 'api']
  },
  {
    name: 'Machine Learning',
    words: ['algorithm', 'dataset', 'model', 'tensor', 'neuron']
  },
  {
    name: 'Mathematics',
    words: ['calculus', 'algebra', 'matrix', 'vector', 'gradient']
  }
];

const DailyWord = () => {
  // Game States
  const [category, setCategory] = useState(null);
  const [targetWord, setTargetWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameState, setGameState] = useState('initial'); // 'initial', 'playing', 'won', 'lost'
  const [hints, setHints] = useState(3);
  const [undoCount, setUndoCount] = useState(3);
  const videoRef = useRef(null); // Reference for the video element

  // Initialize the game when the component mounts
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const selectedCategory = categories[Math.floor(Math.random() * categories.length)];
    const selectedWord = selectedCategory.words[Math.floor(Math.random() * selectedCategory.words.length)];
    setCategory(selectedCategory.name);
    setTargetWord(selectedWord);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setHints(3);
    setUndoCount(3);
    setGameState('playing');

    if (videoRef.current) {
      videoRef.current.load(); // Reload the video
    }
  };

  const handleLetterClick = (letter) => {
    if (gameState !== 'playing' || guessedLetters.includes(letter)) return;

    setGuessedLetters((prev) => [...prev, letter]);

    if (!targetWord.includes(letter)) {
      setWrongGuesses((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (gameState === 'playing') {
      if (wrongGuesses >= 4) {
        setGameState('lost');
      } else if (targetWord.split('').every((letter) => guessedLetters.includes(letter))) {
        setGameState('won');
      }
    }
  }, [guessedLetters, wrongGuesses, targetWord, gameState]);

  const useHint = () => {
    if (hints > 0 && gameState === 'playing') {
      const hiddenLetters = targetWord.split('').filter((letter) => !guessedLetters.includes(letter));
      if (hiddenLetters.length > 0) {
        const randomHint = hiddenLetters[Math.floor(Math.random() * hiddenLetters.length)];
        setGuessedLetters((prev) => [...prev, randomHint]);
        setHints((prev) => prev - 1);
      }
    }
  };

  const undoLastGuess = () => {
    if (guessedLetters.length > 0 && gameState === 'playing' && undoCount > 0) {
      const lastGuess = guessedLetters[guessedLetters.length - 1];
      setGuessedLetters((prev) => prev.slice(0, -1));
      if (!targetWord.includes(lastGuess)) {
        setWrongGuesses((prev) => prev - 1);
      }
      setUndoCount((prev) => prev - 1);
    }
  };

  const renderWord = () => {
    return targetWord.split('').map((letter, index) => (
      <span key={index} className="letter">
        {guessedLetters.includes(letter) ? letter : '_'}
      </span>
    ));
  };

  const renderKeyboard = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return alphabet.split('').map((letter) => (
      <button
        key={letter}
        className="keyboard-key"
        disabled={guessedLetters.includes(letter) || gameState !== 'playing'}
        onClick={() => handleLetterClick(letter)}
      >
        {letter}
      </button>
    ));
  };

  const getDuckieVideo = () => {
    if (gameState === 'won') {
      return '/videos/won.mp4';
    } else if (gameState === 'lost') {
      return '/videos/cry.mp4';
    } else if (wrongGuesses === 0) {
      return '/videos/video_0.mp4';
    } else if (wrongGuesses === 1) {
      return '/videos/video_1.mp4';
    } else if (wrongGuesses === 2) {
      return '/videos/video_2.mp4';
    } else if (wrongGuesses === 3) {
      return '/videos/video_3.mp4';
    } else {
      return '/videos/video4.mp4';
    }
  };

  // Pause video when it ends
  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div className="desktop-1">
      {gameState === "won" || gameState === "lost" ? (
        <div>
          <Link to="/">
            <img className="home-04" src="/icons/home.ico" alt="Home Icon" />
          </Link>
          <div className="title">
            <img className="titleimg" src="/icons/logo.png" alt="title" />
          </div>
          <video 
            className="duckie-video" 
            autoPlay 
            muted 
            playsInline 
            style={{ width: "400px", height: "400px" }}
          >
            <source src={getDuckieVideo()} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="word-display">
            {targetWord.split('').map((letter, index) => (
              <span key={index} className="letter">
                {letter}
              </span>
            ))}
          </div>
          <div className="game-message">
            {gameState === 'won' ? 'You Win!' : 'You Lose!'}
            <br />
            The word was: <strong>{targetWord}</strong>
          </div>
          <div className="restart-container">
            <button className="restart-button" onClick={startNewGame}>
              Restart Game
            </button>
          </div>
        </div>
      ) : (
        <div className="dailyword-container">
          <Link to="/">
            <img className="home-icon" src="/icons/home.ico" alt="Home Icon" />
          </Link>
          <h2 className="dailyword-title">Daily Word Challenge</h2>

          {category ? (
            <>
              <div className="category-display">Category: {category}</div>
              <div className="word-display">{renderWord()}</div>

              <div className="content-wrapper">
                <video
                  className="duckie-video"
                  key={wrongGuesses}
                  autoPlay
                  muted
                  playsInline
                  ref={videoRef}
                  onEnded={handleVideoEnd}
                >
                  <source src={getDuckieVideo()} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                <div className="keyboard">{renderKeyboard()}</div>
              </div>

              {gameState !== 'playing' && gameState !== 'initial' && (
                <div className="game-message">
                  {gameState === 'won' ? 'You Win!' : 'You Lose!'}
                  <br />
                  The word was: <strong>{targetWord}</strong>
                </div>
              )}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DailyWord;