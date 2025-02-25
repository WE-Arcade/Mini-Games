// 

// import React, { useState, useEffect, useRef } from 'react';
// import './DuckieGame.css'; // Import your CSS file
// import { Link } from "react-router-dom";

// const TwoPlayer = () => {
//   const [targetWord, setTargetWord] = useState('');
//   const [guessedLetters, setGuessedLetters] = useState([]);
//   const [wrongGuesses, setWrongGuesses] = useState(0);
//   const [score, setScore] = useState(0);
//   const [gameState, setGameState] = useState('waiting'); // 'waiting', 'playing', 'won', 'lost'
//   const [inputWord, setInputWord] = useState('');
//   const videoRef = useRef(null);

//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.load();
//     }
//   }, [wrongGuesses, gameState]);

//   const startGame = () => {
//     if (inputWord.trim()) {
//       setTargetWord(inputWord.toLowerCase());
//       setGameState('playing');
//       setGuessedLetters([]);
//       setWrongGuesses(0);
//       setScore(0);
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
//     if (wrongGuesses >= 4) {
//       setGameState('lost');
//     } else if (targetWord && targetWord.split('').every((letter) => guessedLetters.includes(letter))) {
//       setGameState('won');
//     }
//   }, [guessedLetters, wrongGuesses, targetWord]);

//   const getDuckieVideo = () => {
//     if (guessedLetters.length === 0) {
//       return '/videos/video_0.mp4'; // Don't show any video before the game starts
//     }
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

//   const renderWord = () => {
//     return targetWord.split('').map((letter, index) => (
//       <span key={index} className="letter">
//         {guessedLetters.includes(letter) ? letter : '_'}
//       </span>
//     ));
//   };

//   const renderKeyboard = () => {
//     return 'abcdefghijklmnopqrstuvwxyz'.split('').map((letter) => (
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

//   return (
//     <div className="desktop-1">
//       <Link to="/">
//         <img className="home-04" src="/icons/home.ico" alt="Home Icon" />
//       </Link>
//       <div className="title">
//         <img className="titleimg" src="/icons/logo.png" alt="title" />
//       </div>

//       {gameState === 'playing' && (
//         <video ref={videoRef} className="duckie-video" autoPlay muted loop>
//           <source src={getDuckieVideo()} type="video/mp4" />
//         </video>
//       )}

//       {gameState === 'waiting' ? (
//         <div className="word-input-container">
//           <input
//             type="text"
//             className="word-input"
//             placeholder="Enter word to be guessed"
//             value={inputWord}
//             onChange={(e) => setInputWord(e.target.value)}
//           />
//           <button className="start-button" onClick={startGame}>Start Game</button>
//         </div>
//       ) : (
//         <div className="game-container">
//           <div className="header">
//             <div className="score">Score: {score}</div>
//             <div className="wrong-guesses">Moves left: {4 - wrongGuesses}</div>
//           </div>

//           {gameState === 'won' && <div className="game-message">🎉 You Won! 🎉</div>}
//           {gameState === 'lost' && <div className="game-message">😢 You Lost! Try Again!</div>}

//           <div className="word-display">{renderWord()}</div>
//           <div className="keyboard">{renderKeyboard()}</div>

//           {(gameState === 'won' || gameState === 'lost') && (
//             <button className="restart-button" onClick={() => setGameState('waiting')}>
//               Play Again
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TwoPlayer;

// import React, { useState, useEffect, useRef } from 'react';
// import './DuckieGame.css'; // Import your CSS file
// import { Link } from "react-router-dom";

// const TwoPlayer = () => {
//   const [targetWord, setTargetWord] = useState('');
//   const [guessedLetters, setGuessedLetters] = useState([]);
//   const [wrongGuesses, setWrongGuesses] = useState(0);
//   const [score, setScore] = useState(0);
//   const [gameState, setGameState] = useState('waiting'); // 'waiting', 'playing', 'won', 'lost'
//   const [inputWord, setInputWord] = useState('');
//   const videoRef = useRef(null);

//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.load();
//     }
//   }, [wrongGuesses, gameState]);

//   const startGame = () => {
//     if (inputWord.trim()) {
//       setTargetWord(inputWord.toLowerCase());
//       setGameState('playing');
//       setGuessedLetters([]);
//       setWrongGuesses(0);
//       setScore(0);
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
//     if (wrongGuesses >= 4) {
//       setGameState('lost');
//     } else if (targetWord && targetWord.split('').every((letter) => guessedLetters.includes(letter))) {
//       setGameState('won');
//     }
//   }, [guessedLetters, wrongGuesses, targetWord]);

//   const getDuckieVideo = () => {
//     if (guessedLetters.length === 0) {
//       return '/videos/video_0.mp4'; // Don't show any video before the game starts
//     }
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

//   const renderWord = () => {
//     return targetWord.split('').map((letter, index) => (
//       <span key={index} className="letter">
//         {guessedLetters.includes(letter) ? letter : '_'}
//       </span>
//     ));
//   };

//   const renderKeyboard = () => {
//     return 'abcdefghijklmnopqrstuvwxyz'.split('').map((letter) => (
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

//   // Pause video when it ends
//   const handleVideoEnd = () => {
//     if (videoRef.current) {
//       videoRef.current.pause();
//     }
//   };

//   return (
//     <div className="desktop-1">
//       <Link to="/">
//         <img className="home-04" src="/icons/home.ico" alt="Home Icon" />
//       </Link>
//       <div className="title">
//         <img className="titleimg" src="/icons/logo.png" alt="title" />
//       </div>

//       {gameState === 'playing' && (
//         <video
//           ref={videoRef}
//           className="duckie-video"
//           autoPlay // Autoplay when the video changes
//           muted
//           onEnded={handleVideoEnd} // Pause when the video ends
//         >
//           <source src={getDuckieVideo()} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       )}

//       {gameState === 'waiting' ? (
//         <div className="word-input-container">
//           <input
//             type="text"
//             className="word-input"
//             placeholder="Enter word to be guessed"
//             value={inputWord}
//             onChange={(e) => setInputWord(e.target.value)}
//           />
//           <button className="start-button" onClick={startGame}>Start Game</button>
//         </div>
//       ) : (
//         <div className="game-container">
//           <div className="header">
//             <div className="score">Score: {score}</div>
//             <div className="wrong-guesses">Moves left: {4 - wrongGuesses}</div>
//           </div>

//           {gameState === 'won' && <div className="game-message">🎉 You Won! 🎉</div>}
//           {gameState === 'lost' && <div className="game-message">😢 You Lost! Try Again!</div>}

//           <div className="word-display">{renderWord()}</div>
//           <div className="keyboard">{renderKeyboard()}</div>

//           {(gameState === 'won' || gameState === 'lost') && (
//             <button className="restart-button" onClick={() => setGameState('waiting')}>
//               Play Again
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TwoPlayer;
import React, { useState, useEffect, useRef } from 'react';
import './DuckieGame.css'; // Import your CSS file
import { Link } from "react-router-dom";

const TwoPlayer = () => {
  const [targetWord, setTargetWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('waiting'); // 'waiting', 'playing', 'won', 'lost'
  const [inputWord, setInputWord] = useState('');
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [wrongGuesses, gameState]);

  const startGame = () => {
    if (inputWord.trim()) {
      setTargetWord(inputWord.toLowerCase());
      setGameState('playing');
      setGuessedLetters([]);
      setWrongGuesses(0);
      setScore(0);
    }
  };

  const handleLetterClick = (letter) => {
    if (gameState !== 'playing' || guessedLetters.includes(letter)) return;

    setGuessedLetters((prev) => [...prev, letter]);

    if (targetWord.includes(letter)) {
      setScore((prev) => prev + 10);
    } else {
      setWrongGuesses((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (wrongGuesses >= 4) {
      setGameState('lost');
    } else if (targetWord && targetWord.split('').every((letter) => guessedLetters.includes(letter))) {
      setGameState('won');
    }
  }, [guessedLetters, wrongGuesses, targetWord]);

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

  const renderWord = () => {
    return targetWord.split('').map((letter, index) => (
      <span key={index} className="letter">
        {guessedLetters.includes(letter) ? letter : '_'}
      </span>
    ));
  };

  const renderKeyboard = () => {
    return 'abcdefghijklmnopqrstuvwxyz'.split('').map((letter) => (
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

  // Pause video when it ends
  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };
  return (
    <div className="desktop-1">
      {/* Home Icon and Title Icon */}
      <Link to="/">
        <img className="home-04" src="/icons/home.ico" alt="Home Icon" />
      </Link>
      <div className="title">
        <img className="titleimg" src="/icons/logo.png" alt="title" />
      </div>
  
      {/* Video Display */}
      {(gameState === 'won' || gameState === 'lost') && (
        <video
          ref={videoRef}
          className="duckie-video"
          autoPlay
          muted
          onEnded={handleVideoEnd}
        >
          <source src={getDuckieVideo()} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
  
      {/* Game UI */}
      {gameState === 'waiting' ? (
        <div className="word-input-container">
          <input
            type="text"
            className="word-input"
            placeholder="Enter word to be guessed"
            value={inputWord}
            onChange={(e) => setInputWord(e.target.value)}
          />
          <button className="start-button" onClick={startGame}>Start Game</button>
        </div>
      ) : gameState === 'playing' ? (
        <div className="game-container">
          {/* Video and Game Content Side by Side */}
          <div className="content-wrapper">
            <video
              ref={videoRef}
              className="duckie-video"
              autoPlay
              muted
              onEnded={handleVideoEnd}
            >
              <source src={getDuckieVideo()} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="game-content">
              <div className="header">
                <div className="score">Score: {score}</div>
                <div className="wrong-guesses">Moves left: {4 - wrongGuesses}</div>
              </div>
              <div className="word-display">{renderWord()}</div>
              <div className="keyboard">{renderKeyboard()}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="game-message">
          {gameState === 'won' ? '🎉 You Won! 🎉' : '😢 You Lost! Try Again!'}
          <div className="correct-word">
            The word was: <strong>{targetWord}</strong>
          </div>
          <button className="restart-button" onClick={() => setGameState('waiting')}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default TwoPlayer;