
import React, { useEffect } from "react";
import Phaser from "phaser";
import './Wheel.css';
import { Link } from "react-router-dom";

const Wheel = () => {
  useEffect(() => {
    const bomb1 = "💣 Bomb 1";
    const hint2 = "💡 Hint 2";
    const coins3 = "💰 Coins 3";
    const erase4 = "❌ Erase 4";
    const bomb2 = "💣 Bomb 2";
    const hint3 = "💡 Hint 3";
    const coins4 = "💰 Coins 4";
    const erase1 = "❌ Erase 1";
    const bomb3 = "💣 Bomb 3";
    const hint4 = "💡 Hint 4";
    const coins1 = "💰 Coins 1";
    const erase2 = "❌ Erase 2";
    const bomb4 = "💣 Bomb 4";
    const hint1 = "💡 Hint 1";
    const coins2 = "💰 Coins 2";
    const erase3 = "❌ Erase 3";
    
    const gameOptions = {
      slices: 16,
      slicePrizes: [
        bomb1,
        hint2,
        coins3,
        erase4,
        bomb2,
        hint3,
        coins4,
        erase1,
        bomb3,
        hint4,
        coins1,
        erase2,
        bomb4,
        hint1,
        coins2,
        erase3,
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
        const centerY = window.innerHeight / 2;
        this.wheel = this.add.sprite(centerX, centerY+50, "wheel");
        this.wheel.setScale(0.8);
        this.pin = this.add.sprite(centerX, centerY+50, "pin");
        this.pin.setScale(1); 
        this.prizeText = this.add.text(
          centerX,
          window.innerHeight - 35,
          "SPIN TO WIN",
          {
            font: "bold 32px Rajdhani",
            align: "center",
            color: "Black",
          }
        );

        this.prizeText.setOrigin(0.5);
        this.canSpin = true;
        this.input.on("pointerdown", this.spinWheel, this);
        
        this.duck = this.add.sprite(centerX , centerY - 190, "duck");
        this.duck.setScale(0.8);
        this.duck.angle = -90;

        this.curtains = this.add.sprite(centerX , centerY+70 , "curtains");
        this.curtains.setScale(0);
      }
      
      spinWheel() {
        if (this.canSpin) {
          this.prizeText.setText("");
          const rounds = Phaser.Math.Between(4, 6);
          const degrees = Phaser.Math.Between(0, 360);
          const prize =
            gameOptions.slices - 1 -
            Math.floor(degrees / (360 / gameOptions.slices));
          this.canSpin = false;
          this.tweens.add({
            targets: [this.wheel],
            angle: 360 * rounds + degrees,
            duration: gameOptions.rotationTime,
            ease: "Cubic.easeOut",
            callbackScope: this,
            onComplete: function () {
              this.prizeText.setText(gameOptions.slicePrizes[prize]);
              this.canSpin = true;
            },
          });
        }
      }
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

  return (
    <div>
      {/* Add Link to "/" route for the home icon */}
      <Link to="/">
        <img
          src="/icons/home.ico"
          alt="Home"
          className="home-logo"
        />
      </Link>
      
      <img
        src="/icons/logo.png"
        alt="Game Title"
        className="game-logo"
      />
      <div id="game-container"></div>
    </div>
  );
};

export default Wheel;
