// import React, { useState, useEffect, useRef } from 'react';
// import './DuckieGame.css'; 
// import { Link } from "react-router-dom";
// import MusicButton from './MusicButton'; // Import the MusicButton component

// const DuckieGame = () => {
//   const words = JSON.parse(localStorage.getItem('gameWords')) || ['javascript', 'react', 'hangman', 'duck', 'coding'];
//   const selectedCategory = localStorage.getItem('selectedCategory') || 'Default';
//   const [targetWord, setTargetWord] = useState('');
//   const [guessedLetters, setGuessedLetters] = useState([]);
//   const [wrongGuesses, setWrongGuesses] = useState(0);
//   const [score, setScore] = useState(0);
//   const [gameState, setGameState] = useState('initial'); 
//   const [boosters, setBoosters] = useState(3);
//   const [hints, setHints] = useState(3);
//   const [undoCount, setUndoCount] = useState(3);
//   const videoRef = useRef(null); 
//   useEffect(() => {
//     startNewGame();
//   }, []);

//   const startNewGame = () => {
//     const randomWord = words[Math.floor(Math.random() * words.length)];
//     setTargetWord(randomWord);
//     setGuessedLetters([]);
//     setWrongGuesses(0);
//     setScore(0);
//     setBoosters(3);
//     setHints(3);
//     setUndoCount(3);
//     setGameState('playing');

//     if (videoRef.current) {
//       videoRef.current.load();
//     }
//   };

//   const handleLetterClick = (letter) => {
//     if (gameState !== 'playing' || guessedLetters.includes(letter)) return;

//     setGuessedLetters((prev) => [...prev, letter]);

//     if (targetWord.includes(letter)) {
//       setScore((prev) => prev + 10);
//     } else {
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

//   const useBooster = () => {
//     if (boosters > 0 && gameState === 'playing') {
//       const unusedLetters = 'abcdefghijklmnopqrstuvwxyz'
//         .split('')
//         .filter((letter) => !guessedLetters.includes(letter) && !targetWord.includes(letter));
//       if (unusedLetters.length > 0) {
//         const randomBooster = unusedLetters[Math.floor(Math.random() * unusedLetters.length)];
//         setGuessedLetters((prev) => [...prev, randomBooster]);
//         setBoosters((prev) => prev - 1);
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
//     if (gameState === "won") {
//       return '/videos/win.mp4';
//     } else if (gameState === "lost") {
//       return '/videos/lost.mp4'; 
//     } else if (wrongGuesses === 0) {
//       return '/videos/video_0.mp4';
//     } else if (wrongGuesses === 1) {
//       return '/videos/video_1.mp4';
//     } else if (wrongGuesses === 2) {
//       return '/videos/video_2.mp4';
//     } else if (wrongGuesses === 3) {
//       return '/videos/video_3.mp4';
//     } else {
//       return '/videos/video4.mp4';
//     }
//   };

//   const handleVideoEnd = () => {
//     if (videoRef.current) {
//       videoRef.current.pause();
//     }
//   };
        
// return (
//   <div className="desktop-1">
//     {/* Music Button - added at a fixed position for both game states */}
//     <MusicButton className="fixed bottom-6 left-6" />
    
//     {gameState === "won" || gameState === "lost" ? (
//       <div>
//         <Link to="/">
//           <img className="home-04" src="/icons/home.ico" alt="Home Icon" />
//         </Link>
//         <div className="title">
//           <img className="titleimg" src="/icons/logo.png" alt="title" />
//         </div>
//         <video 
//           className="duckie-video" 
//           autoPlay 
//           playsInline 
//           style={{ width: "400px", height: "300px" }}
//         >
//           <source src={getDuckieVideo()} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//         <div className="word-display">
//           {targetWord.split('').map((letter, index) => (
//             <span key={index} className="letter">
//               {letter}
//             </span>
//           ))}
//         </div>
//         <div className="game-message">
//           {gameState === 'won' ? 'You Win!' : 'You Lose!'}
//           <br />
//           The word was: <strong>{targetWord}</strong>
//         </div>
//         <div className="restart-container">
//           <button className="restart-button" onClick={startNewGame}>
//             Restart Game
//           </button>
//         </div>
//       </div>
//     ) : (
//       // Show the entire game when the game is still running
//       <>
//         <Link to="/">
//           <img className="home-04" src="/icons/home.ico" alt="Home Icon" />
//         </Link>
//         <div className="title">
//           <img className="titleimg" src="/icons/logo.png" alt="title" />
//         </div>
//         <div className="duckie-pool">
//           <video 
//             className="duckie-video" 
//             key={wrongGuesses} 
//             autoPlay 
//             ref={videoRef} 
//             onEnded={handleVideoEnd}
            
//           >
//             <source src={getDuckieVideo()} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         </div>
//         <img className="coinsimg" src="/icons/coins.svg" alt="Coins Icon" />
//         <div className="coins">420</div>
//         <div className="game-container">
//           <div className="header">
//             <div className="score">Score: {score}</div>
//             <div className="boosters">Boosters: {boosters}</div>
//             <div className="hints">Hints: {hints}</div>
//             <div className="wrong-guesses">Moves: {4 - wrongGuesses}</div>
//             <div className="undo-count">Undo: {undoCount}</div>
//           </div>
//           <div className="word-display">{renderWord()}</div>
//           <div className="keyboard">{renderKeyboard()}</div>
//           <div className="actions">
//             <button className="action-button" onClick={useHint} disabled={hints <= 0 || gameState !== 'playing'}>
//               <img className="hint" src="/icons/hint.ico" alt="Hint Icon" />
//             </button>
//             <button className="action-button" onClick={useBooster} disabled={boosters <= 0 || gameState !== 'playing'}>
//               <img className="bomb" src="/icons/bomb.ico" alt="Bomb Icon" />
//             </button>
//             <button className="action-button" onClick={undoLastGuess} disabled={undoCount <= 0 || guessedLetters.length === 0 || gameState !== 'playing'}>
//               <img className="eraser" src="/icons/eraser.ico" alt="Eraser Icon" />
//             </button>
//           </div>
//           {gameState !== 'playing' && gameState !== 'initial' && (
//             <div className="game-message">
//               {gameState === 'won' ? 'You Win!' : 'You Lose!'}
//               <br />
//               The word was: <strong>{targetWord}</strong>
//             </div>
//           )}
//           <div className="restart-container">
//             <button className="restart-button" onClick={startNewGame}>
//               Restart Game
//             </button>
//           </div>
//         </div>
//       </>
//     )}
//   </div>
// );

// }

// export default DuckieGame;

import React, { useState, useEffect, useRef } from 'react';
import './DuckieGame.css'; 
import { Link } from "react-router-dom";
import MusicButton from './MusicButton'; // Import the MusicButton component

const DuckieGame = () => {
  const words = JSON.parse(localStorage.getItem('gameWords')) || ['javascript', 'react', 'hangman', 'duck', 'coding'];
  const selectedCategory = localStorage.getItem('selectedCategory') || 'Default';

  // Ensure the value of coins is treated as an integer
  const [coins, setCoins] = useState(parseInt(localStorage.getItem('coins')) || 0);

  const [targetWord, setTargetWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameState, setGameState] = useState('initial');
  const [boosters, setBoosters] = useState(3);
  const [hints, setHints] = useState(3);
  const [undoCount, setUndoCount] = useState(3);
  const [bombedLetters, setBombedLetters] = useState([]); // Track bombed letters

  const videoRef = useRef(null);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setTargetWord(randomWord);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameState('playing');
    setBoosters(3);
    setHints(3);
    setUndoCount(3);
    setBombedLetters([]); // Reset bombed letters

    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  const handleLetterClick = (letter) => {
    if (gameState !== 'playing' || guessedLetters.includes(letter)) return;

    setGuessedLetters((prev) => [...prev, letter]);

    if (targetWord.includes(letter)) {
      // Add score for correct guesses, but not relevant to the current request
    } else {
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

  const useBooster = () => {
    if (boosters > 0 && gameState === 'playing') {
      const unusedLetters = 'abcdefghijklmnopqrstuvwxyz'
        .split('')
        .filter((letter) => !guessedLetters.includes(letter) && !targetWord.includes(letter));
      if (unusedLetters.length > 0) {
        const randomBooster = unusedLetters[Math.floor(Math.random() * unusedLetters.length)];
        setGuessedLetters((prev) => [...prev, randomBooster]);
        setBombedLetters((prev) => [...prev, randomBooster]); // Mark this letter as bombed
        setBoosters((prev) => prev - 1);
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
        {guessedLetters.includes(letter) ? (
          letter
        ) : bombedLetters.includes(letter) ? (
          <span className="bombed-letter">X</span> // Display X on bombed letter
        ) : (
          '_'
        )}
      </span>
    ));
  };

  const renderKeyboard = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return alphabet.split('').map((letter) => (
      <button
        key={letter}
        className="keyboard-key"
        disabled={guessedLetters.includes(letter) || bombedLetters.includes(letter) || gameState !== 'playing'}
        onClick={() => handleLetterClick(letter)}
      >
        {letter}
      </button>
    ));
  };

  const getDuckieVideo = () => {
    if (gameState === "won") {
      return '/videos/win.mp4';
    } else if (gameState === "lost") {
      return '/videos/lost.mp4'; 
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

  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  useEffect(() => {
    if (gameState === 'won') {
      setCoins((prev) => prev + 100);
    }
  }, [gameState]);
  useEffect(() => {
    localStorage.setItem('coins', coins);
  }, [coins]);

  return (
    <div className="desktop-1">
      <MusicButton className="fixed bottom-6 left-6" />
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
            playsInline 
            style={{ width: "400px", height: "300px" }}
          >
            <source src={getDuckieVideo()} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="game-message">
            {gameState === 'won' ? 'You Win!' : 'You Lose!'}
            <br />
            The word was: <strong>{targetWord}</strong>
          </div>
          <div className="coins">
              <img className="coins-icon" src="/icons/pileOfCoins.ico" alt="Coins Icon" style={{ width: '40px', height: '40px', marginLeft: '5px' }} />
             {coins} {/* Display coins only after game ends */}
          </div>

          <div className="restart-container">
            <button className="restart-button" onClick={startNewGame}>
              Restart Game
            </button>
          </div>
        </div>
      ) : (
        <>
          <Link to="/">
            <img className="home-04" src="/icons/home.ico" alt="Home Icon" />
          </Link>
          <div className="title">
            <img className="titleimg" src="/icons/logo.png" alt="title" />
          </div>
          <div className="duckie-pool">
            <video 
              className="duckie-video" 
              key={wrongGuesses} 
              autoPlay 
              ref={videoRef} 
              onEnded={handleVideoEnd}
            >
              <source src={getDuckieVideo()} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="coins">
              <img className="coins-icon" src="/icons/pileOfCoins.ico" alt="Coins Icon" style={{ width: '40px', height: '40px', marginLeft: '5px' }} />
              {coins} {/* Display coins only after game ends */}
          </div>
          <div className="game-container">
            <div className="header">
              <div className="wrong-guesses">Moves: {4 - wrongGuesses} </div>
            </div>
            <div className="word-display">{renderWord()}</div>
            <div className="keyboard">{renderKeyboard()}</div>
            <div className="actions">
              <button className="action-button" onClick={useHint} disabled={hints <= 0 || gameState !== 'playing'}>
                <div className="badge-container">
                  {hints > 0 && (
                    <div className="badge">{hints}</div>
                  )}
                </div>
                <img className="hint" src="/icons/hint.ico" alt="Hint Icon" />
              </button>
              <button className="action-button" onClick={useBooster} disabled={boosters <= 0 || gameState !== 'playing'}>
                <div className="badge-container">
                  {boosters > 0 && (
                    <div className="badge">{boosters}</div>
                  )}
                </div>
                <img className="bomb" src="/icons/bomb.ico" alt="Bomb Icon"  />
              </button>
              <button className="action-button" onClick={undoLastGuess} disabled={undoCount <= 0 || guessedLetters.length === 0 || gameState !== 'playing'}>
                <div className="badge-container">
                  {undoCount > 0 && (
                    <div className="badge">{undoCount}</div>
                  )}
                </div>
                <img className="eraser" src="/icons/eraser.ico" alt="Eraser Icon" />
              </button>
            </div>
            {gameState !== 'playing' && gameState !== 'initial' && (
              <div className="game-message">
                {gameState === 'won' ? 'You Win!' : 'You Lose!'}
                <br />
                The word was: <strong>{targetWord}</strong>
              </div>
            )}
            <div className="restart-container">
              <button className="restart-button" onClick={startNewGame}>
                Restart Game
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DuckieGame;
