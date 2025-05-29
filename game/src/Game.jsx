import { useState, useEffect, useRef } from "react";
import "./Game.css";
import P5Wrapper from "./components/P5Canvas.jsx";
import Input from "./components/Input.jsx";
import PauseMenu from "./components/PauseMenu.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCrown,
  faHeart,
  faDiamond,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  // Possible Values: menu, loading, game, paused, death
  const [gameState, setGameState] = useState("game"); // Change to 'menu' in build

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

  const onFormSubmit = (event) => {
    // Handle form submission
    event.preventDefault();
    const formData = new FormData(event.target);
    sharedRef.current.heroName = formData.get("hero-name");
    setGameState("loading");
  };

  return (
    <div className="canvas-container">
      <P5Wrapper sharedRef={sharedRef} />
      <main
        className={`ui-overlay flex flex-col items-center justify-center h-full w-full ${
          gameState !== "game" && "bg-wood"
        }`}
      >
        {gameState === "paused" && (
          <>
            {console.log("Rendering Pause Menu")}
            <PauseMenu onClose={() => setGameState("game")} />
          </>
        )}
        {gameState === "menu" && (
          <>
            <h1 className="text-4xl text-tan font-bold p-8 space-y-6">
              Welcome to the Game
            </h1>
            <form
              onSubmit={onFormSubmit}
              className="flex flex-col items-center gap-8"
            >
              <Input
                type="text"
                placeholder="Enter your hero's name..."
                required={false} // change in build to true
                name="hero-name"
              />
              <Input type="submit" value="Start Game" />
            </form>
          </>
        )}
        {gameState === "loading" && (
          <div className="text-tan">Loading World...</div>
        )}
        {gameState === "game" && (
          <>
            <div className="absolute top-5 left-5 flex items-start space-x-8 text-gold font-serif bg-black/70 p-5 rounded-lg shadow-lg">
              {/* Level Badge */}
              <div className="relative w-20 h-20 mt-4 rounded-full bg-gradient-to-br from-[#1a1109] to-black shadow-2xl border-[3px] border-gold flex items-center justify-center text-4xl font-extrabold text-gold tracking-widest ring-[3px] ring-gold/50 z-10">
                {/* Outer Decorative Ring */}
                <div className="absolute inset-1 rounded-full border-2 border-gold/30 ring-1 ring-inset ring-gold/20 shadow-inner pointer-events-none"></div>

                {/* Crown or Symbol */}
                <div className="absolute -top-4 text-gold text-[1.5rem]">
                  <FontAwesomeIcon icon={faCrown} />
                </div>

                {/* Level Number */}
                <span className="drop-shadow-glow text-gold/90 text-4xl font-bold">
                  {sharedRef.current.level || 1}
                </span>

                {/* Nameplate */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-black via-[#1a1109] to-black px-4 py-1 text-sm text-gold border-2 border-gold/60 rounded-full shadow-md shadow-gold/20 backdrop-blur-sm">
                  {sharedRef.current.heroName || "Player"}
                </div>
              </div>
              {/* Stats Panel */}
              <div className="flex flex-col justify-center space-y-8 mt-8">
                {/* Health */}
                <div className="w-96 h-6 relative">
                  <span className="absolute -top-5 left-0 text-xs tracking-wide text-gold uppercase font-bold font-serif">
                    <FontAwesomeIcon icon={faHeart} /> Health
                  </span>

                  <div className="w-full h-full border-b-3 border-parchment relative shadow-lg">
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#7c1818] via-[#ca4040] to-[#f78c8c] transition-all duration-300"
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
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 text-s text-parchment font-bold">
                    {sharedRef.current.health}/{sharedRef.current.maxHealth}
                  </div>
                </div>

                <div className="w-72 h-6 relative">
                  <span className="absolute -top-5 left-0 text-xs tracking-wide text-gold uppercase font-bold font-serif">
                    <FontAwesomeIcon icon={faDiamond} /> Mana
                  </span>
                  <div className="w-full h-full border-b-3 border-parchment relative shadow-lg">
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#103477] via-[#3e7bc4] to-[#91b9eb] transition-all duration-300"
                      style={{
                        width: `${
                          (sharedRef.current.mana / sharedRef.current.maxMana) *
                          100
                        }%`,
                      }}
                    ></div>
                    <div className="absolute inset-0 pointer-events-none"></div>
                  </div>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 text-s text-parchment font-bold">
                    {sharedRef.current.mana}/{sharedRef.current.maxMana}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Slots */}
            <div className="absolute top-1/2 right-4 -translate-y-1/2 space-y-4 flex flex-col">
              {[1, 2, 3].map((num) => (
                <button
                  key={num}
                  className="py-3 px-5 text-xl border-2 border-gold bg-black/70 text-gold rounded-lg shadow-lg hover:bg-gold hover:text-black transition-colors duration-200"
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
                className="py-3 px-4.5 text-xl border-2 border-gold bg-black/70 text-gold rounded-lg shadow-lg hover:bg-gold hover:text-black transition-colors duration-200"
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

export default App;
