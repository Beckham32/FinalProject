import { useState, useEffect, useRef } from "react";
import "./Game.css";
import P5Wrapper from "./components/P5Canvas.jsx";
import MainMenu from "./components/MainMenu.jsx";
import PauseMenu from "./components/PauseMenu.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCrown,
  faHeart,
  faDiamond,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

function Game() {
  // Possible Values: menu, loading, game, paused, death
  const [gameState, setGameState] = useState("menu");

  const [frameRate, setFrameRate] = useState(0); // Temp
  const sharedRef = useRef({
    // Shared state across P5 and React
    heroName: "",
    health: 100,
    maxHealth: 100,
    mana: 100,
    maxMana: 100,
    level: 1,
    gameState: "menu",
    frameRate: 0,
  });

  useEffect(() => {
    if (gameState === "loading") {
      const timer = setTimeout(() => {
        setGameState("game");
        sharedRef.current.gameState = "game";
      }, 500);
      return () => clearTimeout(timer);
    }
    sharedRef.current.gameState = gameState;
  }, [gameState]);

  useEffect(() => {
    // Update refs from sharedRef every 100ms (0.1s)
    const interval = setInterval(() => {
      if (frameRate !== sharedRef.current.frameRate) {
        setFrameRate(sharedRef.current.frameRate);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [frameRate]);

  const onPlay = (event) => {
    setGameState("loading");
  };

  const handleClose = (event) => {
    setGameState("game");
  };

  return (
    <div className="canvas-container">
      <P5Wrapper sharedRef={sharedRef} />
      {gameState === "paused" && <PauseMenu onClose={handleClose} />}
      <main className="ui-overlay flex flex-col items-center justify-center h-full w-full bg-transparent">
        {gameState === "menu" && <MainMenu onSubmit={onPlay} />}
        {gameState === "loading" && (
          <div className="text-tan bg-wood w-full text-2xl min-h-screen flex flex-col items-center justify-center">
            Loading World...
          </div>
        )}
        {gameState === "game" && (
          <>
            <div className="absolute top-5 left-5 flex items-start text-gold font-serif bg-black/0 rounded-lg ps-5 py-5 pe-95 drop-shadow-xl">
              {/* Level Badge */}
              <div className="relative w-20 h-20 rounded-full drop-shadow-xl bg-gradient-to-br from-[#1a1109] to-black shadow-2xl border-[3px] border-gold flex items-center justify-center text-4xl font-extrabold text-gold tracking-widest ring-[3px] ring-gold/50 z-10">
                {/* Outer Decorative Ring */}
                <div className="absolute inset-2 rounded-full border-2 border-gold/30 ring-1 ring-inset ring-gold/20 shadow-inner pointer-events-none"></div>
                {/* Level Number */}
                <span className="text-gold text-4xl font-bold font-sans">
                  {sharedRef.current.level || 1}
                </span>
              </div>

              {/* Stats Panel */}
              <div className="absolute left-16 flex flex-col justify-center space-y-2">
                {/* Health */}
                <div className="w-96 h-6 relative">
                  <div className="w-full h-full border-b-3 border-white bg-gradient-to-r from-red-950 to-red-500 relative shadow-lg drop-shadow-xl">
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-l from-[#ffffff] via-[#65ff36] to-[#308516] transition-all duration-300 drop-shadow-lg"
                      style={{
                        width: `${
                          (sharedRef.current.health /
                            sharedRef.current.maxHealth) *
                          100
                        }%`,
                      }}
                    ></div>
                    <div className="absolute inset-0 pointer-events-none"></div>
                  </div>
                </div>

                <div className="w-72 h-6 relative">
                  <div className="w-full h-full border-b-3 border-white bg-gradient-to-r from-red-950 to-red-500 relative shadow-lg drop-shadow-xl">
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-l from-[#ffffff] via-[#3e7bc4] to-[#1ccaff] transition-all duration-300"
                      style={{
                        width: `${
                          (sharedRef.current.mana / sharedRef.current.maxMana) *
                          100
                        }%`,
                      }}
                    ></div>
                    <div className="absolute inset-0 pointer-events-none"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Slots */}
            <div className="absolute top-1/2 right-4 -translate-y-1/2 space-y-4 flex flex-col">
              {[1, 2, 3].map((num) => (
                <button
                  key={num}
                  className="py-3 px-5 text-xl border-2 border-gold bg-black/70 text-gold rounded-lg shadow-lg hover:bg-gold/50 hover:text-dark transition-all duration-200"
                >
                  {num}
                </button>
              ))}
            </div>

            {/* FPS Counter */}
            <div className="text-gold absolute bottom-4 left-4 text-lg font-mono bg-black/70 px-3 py-1 rounded shadow-md">
              FPS: {frameRate.toFixed(1)}
            </div>

            {/* Pause Menu Button */}
            <div className="absolute top-4 right-4">
              <button
                className="py-3 px-4.5 text-xl border-2 border-gold bg-black/70 text-gold rounded-lg shadow-lg hover:bg-gold/50 hover:text-dark transition-colors duration-200"
                onClick={() => setGameState("paused")}
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Game;
