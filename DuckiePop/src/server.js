

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const games = {}; // Stores active games

io.on("connection", (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  socket.on("submit-number", ({ number, name }) => {
    console.log(`🔹 Player ${name} submitted number: ${number}`);

    let matchFound = null;
    for (const [gameId, game] of Object.entries(games)) {
      if (game.number === number && game.players.length === 1) {
        matchFound = gameId;
        game.players.push({ id: socket.id, name }); // Store name
        break;
      }
    }

    if (matchFound) {
      const game = games[matchFound];
      const [player1, player2] = game.players;

      console.log(`✅ Match found: ${player1.name} vs ${player2.name} | gameId: ${matchFound}`);

      io.to(player1.id).emit("start-game", { opponentName: player2.name, gameId: matchFound });
      io.to(player2.id).emit("start-game", { opponentName: player1.name, gameId: matchFound });
    } else {
      const gameId = Math.floor(Math.random() * 1000000);
      games[gameId] = { players: [{ id: socket.id, name }], number, words: {} };
      console.log(`🕒 Player ${name} is waiting for a match on number ${number}`);
    }
  });

  socket.on("submit-word", ({ word, gameId }) => {
    if (!games[gameId]) {
      socket.emit("error", "Game not found.");
      return;
    }

    const game = games[gameId];
    const player = game.players.find((p) => p.id === socket.id);
    if (!player) return;

    game.words[socket.id] = { word, name: player.name };
    console.log(`✏️ Player ${player.name} submitted word: ${word}`);

    if (Object.keys(game.words).length === 2) {
      const [player1, player2] = game.players;
      io.to(player1.id).emit("receive-word", { word: game.words[player2.id].word });
      io.to(player2.id).emit("receive-word", { word: game.words[player1.id].word });
    }
  });

  socket.on("game-over", ({ winner, gameId }) => {
    if (!games[gameId]) return;
    const winnerName = games[gameId].players.find((p) => p.id === winner)?.name || "Unknown";

    console.log(`🏆 Game Over! Winner: ${winnerName}`);

    games[gameId].players.forEach((player) => {
      io.to(player.id).emit("game-over", { winner: winnerName });
    });

    delete games[gameId];
  });

  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
    for (const gameId in games) {
      games[gameId].players = games[gameId].players.filter((p) => p.id !== socket.id);
      if (games[gameId].players.length === 0) delete games[gameId];
    }
  });
});

server.listen(4000, () => console.log("🚀 Server running on port 4000"));
