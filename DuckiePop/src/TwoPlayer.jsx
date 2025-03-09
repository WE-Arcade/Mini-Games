
// import React, { useState, useEffect } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:4000");

// const TwoPlayer = () => {
//   const [playerName, setPlayerName] = useState("");
//   const [playerNumber, setPlayerNumber] = useState("");
//   const [submittedNumber, setSubmittedNumber] = useState(null);
//   const [gameId, setGameId] = useState(null);
//   const [opponentName, setOpponentName] = useState(""); // Ensure opponentName updates
//   const [word, setWord] = useState("");
//   const [opponentWord, setOpponentWord] = useState("");
//   const [guessedLetters, setGuessedLetters] = useState([]);
//   const [wrongGuesses, setWrongGuesses] = useState(0);
//   const [gameOver, setGameOver] = useState(false);
//   const [winner, setWinner] = useState(null);

//   useEffect(() => {
//     socket.on("start-game", ({ opponentName, gameId }) => {
//       console.log(`✅ Game started against ${opponentName}, gameId: ${gameId}`);
//       setGameId(gameId);
//       setOpponentName(opponentName); // ✅ Correctly updating opponent name
//     });

//     socket.on("receive-word", ({ word }) => {
//       console.log(`📩 Received opponent's word.`);
//       setOpponentWord(word);
//     });

//     socket.on("game-over", ({ winner }) => {
//       setGameOver(true);
//       setWinner(winner);
//     });

//     return () => {
//       socket.off("start-game");
//       socket.off("receive-word");
//       socket.off("game-over");
//     };
//   }, []);

//   const submitNumber = () => {
//     if (!playerNumber || !playerName) return;
//     socket.emit("submit-number", { number: parseInt(playerNumber), name: playerName });
//     setSubmittedNumber(playerNumber);
//   };

//   const submitWord = () => {
//     if (!gameId || !word) return;
//     console.log(`✏️ Submitting word: ${word} for game ${gameId}`);
//     socket.emit("submit-word", { word, gameId });
//   };

//   const handleGuess = (letter) => {
//     if (gameOver || guessedLetters.includes(letter)) return;

//     if (!opponentWord.includes(letter)) {
//       setWrongGuesses(wrongGuesses + 1);
//     }

//     const updatedGuessedLetters = [...guessedLetters, letter];
//     setGuessedLetters(updatedGuessedLetters);

//     if (opponentWord.split("").every((letter) => updatedGuessedLetters.includes(letter))) {
//       setGameOver(true);
//       setWinner(playerName);
//       socket.emit("game-over", { gameId, winner: socket.id });
//     }
//   };

//   const displayWord = opponentWord
//     .split("")
//     .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
//     .join(" ");

//   return (
//     <div>
//       <h2>Two-Player Game</h2>

//       {!gameId ? (
//         <div>
//           <input
//             type="text"
//             value={playerName}
//             onChange={(e) => setPlayerName(e.target.value)}
//             placeholder="Enter your name"
//           />
//           <input
//             type="number"
//             value={playerNumber}
//             onChange={(e) => setPlayerNumber(e.target.value)}
//             placeholder="Enter a number to match"
//           />
//           <button onClick={submitNumber}>Submit Number</button>
//           {submittedNumber && <p>Waiting for a match on {submittedNumber}...</p>}
//         </div>
//       ) : (
//         <div>
//           <h3>Game ID: {gameId}</h3>
//           <h4>Opponent: {opponentName || "Waiting..."}</h4> {/* ✅ Fix for blank opponent name */}

//           <input
//             type="text"
//             value={word}
//             onChange={(e) => setWord(e.target.value)}
//             placeholder="Enter a word"
//           />
//           <button onClick={submitWord}>Submit Word</button>

//           {gameOver ? (
//             <h3>{winner} won the game!</h3>
//           ) : (
//             <div>
//               <p>Word to guess: {displayWord}</p>
//               <p>Wrong guesses: {wrongGuesses}</p>
//               <input
//                 type="text"
//                 maxLength="1"
//                 placeholder="Guess a letter"
//                 onChange={(e) => handleGuess(e.target.value.toLowerCase())}
//               />
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TwoPlayer;

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./TwoPlayer.css";

const socket = io("http://localhost:4000");

const TwoPlayer = () => {
  const [playerName, setPlayerName] = useState("");
  const [playerNumber, setPlayerNumber] = useState("");
  const [submittedNumber, setSubmittedNumber] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [opponentName, setOpponentName] = useState("");
  const [word, setWord] = useState("");
  const [opponentWord, setOpponentWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  useEffect(() => {
    socket.on("start-game", ({ opponentName, gameId }) => {
      setGameId(gameId);
      setOpponentName(opponentName);
    });

    socket.on("receive-word", ({ word }) => {
      setOpponentWord(word.toUpperCase()); // Ensure case consistency
    });

    socket.on("game-over", ({ winner }) => {
      setGameOver(true);
      setWinner(winner);
    });

    return () => {
      socket.off("start-game");
      socket.off("receive-word");
      socket.off("game-over");
    };
  }, []);

  const submitNumber = () => {
    if (!playerNumber || !playerName) return;
    socket.emit("submit-number", { number: parseInt(playerNumber), name: playerName });
    setSubmittedNumber(playerNumber);
  };

  const submitWord = () => {
    if (!gameId || !word) return;
    socket.emit("submit-word", { word: word.toUpperCase(), gameId });
  };

  const handleGuess = (letter) => {
    if (gameOver || guessedLetters.includes(letter)) return;

    const updatedGuessedLetters = [...guessedLetters, letter];
    setGuessedLetters(updatedGuessedLetters);

    if (!opponentWord.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);
    }

    if (opponentWord.split("").every((letter) => updatedGuessedLetters.includes(letter))) {
      setGameOver(true);
      setWinner(playerName);
      socket.emit("game-over", { gameId, winner: socket.id });
    }
  };

  const displayWord = opponentWord
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");

  return (
    <div>
      <h2>Two-Player Game</h2>

      {!gameId ? (
        <div>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
          />
          <input
            type="number"
            value={playerNumber}
            onChange={(e) => setPlayerNumber(e.target.value)}
            placeholder="Enter a number to match"
          />
          <button onClick={submitNumber}>Submit Number</button>
          {submittedNumber && <p>Waiting for a match on {submittedNumber}...</p>}
        </div>
      ) : (
        <div>
          <h3>Game ID: {gameId}</h3>
          <h4>Opponent: {opponentName || "Waiting..."}</h4>

          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Enter a word"
          />
          <button onClick={submitWord}>Submit Word</button>

          {gameOver ? (
            <h3>{winner} won the game!</h3>
          ) : (
            <div>
              <p>Word to guess: {displayWord}</p>
              <p>Wrong guesses: {wrongGuesses}</p>

              {/* Keyboard */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(9, 40px)", gap: "5px", marginTop: "10px" }}>
                {alphabet.map((letter) => (
                  <button
                    key={letter}
                    onClick={() => handleGuess(letter)}
                    disabled={guessedLetters.includes(letter)}
                    style={{
                      padding: "10px",
                      fontSize: "16px",
                      backgroundColor: guessedLetters.includes(letter) ? "#ccc" : "#f0f0f0",
                      cursor: guessedLetters.includes(letter) ? "not-allowed" : "pointer",
                      borderRadius: "5px",
                      border: "1px solid #aaa",
                    }}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TwoPlayer;

