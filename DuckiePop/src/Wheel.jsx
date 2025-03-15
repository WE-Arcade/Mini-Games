import React, { useEffect, useState } from "react";
import Phaser from "phaser";
import './Wheel.css';
import { Link } from "react-router-dom";
import MusicButton from "./MusicButton";

const Wheel = () => {
  // Load initial values from localStorage
  const [bombs, setBombs] = useState(() => parseInt(localStorage.getItem("bombs")) || 0);
  const [hints, setHints] = useState(() => parseInt(localStorage.getItem("hints")) || 0);
  const [coins, setCoins] = useState(() => parseInt(localStorage.getItem("coins")) || 0);
  const [erases, setErases] = useState(() => parseInt(localStorage.getItem("erases")) || 0);

  useEffect(() => {
    const gameOptions = {
      slices: 16,
      slicePrizes: [
        "💣 Bomb 1", "💡 Hint 2", "💰 Coins 3", "❌ Erase 4",
        "💣 Bomb 2", "💡 Hint 3", "💰 Coins 4", "❌ Erase 1",
        "💣 Bomb 3", "💡 Hint 4", "💰 Coins 1", "❌ Erase 2",
        "💣 Bomb 4", "💡 Hint 1", "💰 Coins 2", "❌ Erase 3"
      ],
      rotationTime: 3000,
    };

    class PlayGame extends Phaser.Scene {
      constructor() {
        super("PlayGame");
      }

      preload() {
        this.load.image("wheel", "/icons/wheel_of_prizes.png");
        this.load.image("pin", "/icons/pin.png");
        this.load.image("duck", "/icons/duck.ico");
        this.load.image("curtains", "/icons/curtains.png");
      }

      create() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2 - 100;
        this.wheel = this.add.sprite(centerX, centerY + 50, "wheel").setScale(0.8);
        this.pin = this.add.sprite(centerX, centerY + 50, "pin").setScale(1);
        this.prizeText = this.add.text(centerX, centerY + 330, "SPIN TO WIN", {
          font: "bold 32px Rajdhani",
          align: "center",
          color: "Black",
        }).setOrigin(0.5);

        this.canSpin = true;
        this.input.on("pointerdown", this.spinWheel, this);

        this.duck = this.add.sprite(centerX, centerY - 190, "duck").setScale(0.8).setAngle(-90);
        this.curtains = this.add.sprite(centerX, centerY + 70, "curtains").setScale(0);
      }

      spinWheel = () => {
        if (this.canSpin) {
          this.prizeText.setText("");
          const rounds = Phaser.Math.Between(4, 6);
          const degrees = Phaser.Math.Between(0, 360);
          const prizeIndex = gameOptions.slices - 1 - Math.floor(degrees / (360 / gameOptions.slices));
          const prizeWon = gameOptions.slicePrizes[prizeIndex];

          this.canSpin = false;
          this.tweens.add({
            targets: [this.wheel],
            angle: 360 * rounds + degrees,
            duration: gameOptions.rotationTime,
            ease: "Cubic.easeOut",
            callbackScope: this,
            onComplete: () => {
              this.prizeText.setText(prizeWon);
              updatePrize(prizeWon);
              this.canSpin = true;
            },
          });
        }
      };
    }

    const gameConfig = {
      type: Phaser.CANVAS,
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xffe4b5,
      scene: [PlayGame],
    };

    const game = new Phaser.Game(gameConfig);

    window.focus();
    resize();
    window.addEventListener("resize", resize, false);

    function resize() {
      const canvas = document.querySelector("canvas");
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const windowRatio = windowWidth / windowHeight;
      const gameRatio = game.config.width / game.config.height;

      if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + "px";
        canvas.style.height = windowWidth / gameRatio + "px";
      } else {
        canvas.style.width = windowHeight * gameRatio + "px";
        canvas.style.height = windowHeight + "px";
      }
    }

    return () => {
      game.destroy(true);
    };
  }, []);

  // Function to update the prize values
  const updatePrize = (prizeWon) => {
    if (prizeWon.includes("Bomb")) {
      setBombs(prev => {
        const newCount = prev + 1;
        localStorage.setItem("bombs", newCount);
        return newCount;
      });
    } else if (prizeWon.includes("Hint")) {
      setHints(prev => {
        const newCount = prev + 1;
        localStorage.setItem("hints", newCount);
        return newCount;
      });
    } else if (prizeWon.includes("Coins")) {
      const coinsWon = parseInt(prizeWon.match(/\d+/)[0]); // Extract number from text
      setCoins(prev => {
        const newCount = prev + coinsWon;
        localStorage.setItem("coins", newCount);
        return newCount;
      });
    } else if (prizeWon.includes("Erase")) {
      setErases(prev => {
        const newCount = prev + 1;
        localStorage.setItem("erases", newCount);
        return newCount;
      });
    }
  };

  return (
    <div>
      {/* Home button */}
      <Link to="/">
        <img src="/icons/home.ico" alt="Home" className="home-logo" />
      </Link>

      {/* Game title */}
      <img src="/icons/logo.png" alt="Game Title" className="game-logo" />

      <div id="game-container"></div>

      {/* Music button */}
      <MusicButton className="music-button" />

      {/* Display prize counts (updating directly) */}
      <div className="prize-container">
        <p><strong>💣 Bombs:</strong> {bombs}</p>
        <p><strong>💡 Hints:</strong> {hints}</p>
        <p><strong>💰 Coins:</strong> {coins}</p>
        <p><strong>❌ Erases:</strong> {erases}</p>
      </div>
    </div>
  );
};

export default Wheel;
