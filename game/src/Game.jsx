import { useState, useEffect, useRef } from "react";
import "./Game.css";
import P5Wrapper from "./components/P5Canvas.jsx";
import Input from "./components/Input.jsx";

function App() {
  // Possible Values: menu, loading, game, paused, death
  const [gameState, setGameState] = useState("game"); // Change to 'menu' in build

  const [frameRate, setFrameRate] = useState(0); // Temp
  const sharedRef = useRef({ // Shared state across P5 and React
    heroName: "",
    health: 100,
    mana: 100,
    level: 1,
    gameState: "menu",
    frameRate: 0,
  });

  useEffect(() => {
    if (gameState === "loading") {
      const timer = setTimeout(() => {
        setGameState("game");
        sharedRef.current.gameState = "game";
      }, 2000);
      return () => clearTimeout(timer);
    }
    sharedRef.current.gameState = gameState;
  }, [gameState]);

  useEffect(() => { // Update refs from sharedRef every 100ms (0.1s)
    const interval = setInterval(() => {
      if (frameRate !== sharedRef.current.frameRate) {
        setFrameRate(sharedRef.current.frameRate);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [frameRate]);

  const onFormSubmit = (event) => { // Handle form submission
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
            <div className="absolute top-4 left-4 space-y-2 text-tan">
              {/* Health Bar */}
              <div className="bg-dark-wood w-96 h-6 rounded overflow-hidden shadow-md border-4 ridge border-border-wood outline-black outline-3 inset-ring-2 inset-ring-black">
                <div
                  className="bg-gradient-to-br from-[#c43e3e] to-[#f18888] h-full transition-all duration-200"
                  style={{ width: `${sharedRef.current.health || 100}%` }}
                ></div>
              </div>
              {/* Mana Bar */}
              <div className="bg-dark-wood w-64 h-5 rounded overflow-hidden shadow-md border-4 ridge border-border-wood outline-black outline-3 inset-ring-2 inset-ring-black">
                <div
                  className="bg-gradient-to-br from-[#3e7bc4] to-[#91b9eb] h-full transition-all duration-200"
                  style={{ width: `${sharedRef.current.mana || 100}%` }}
                ></div>
              </div>
            </div>

            {/* Level Badge */}
            <div className="absolute top-6 right-6">
              <div className="relative w-17 h-17">
                <div className="absolute transform -rotate-45 text-4xl border-8 ridge border-border-wood outline-black outline-3 ring-inset ring-2 ring-black bg-gradient-to-b from-wood to-dark-wood text-tan rounded-sm flex items-center justify-center w-full h-full">
                  <p className="transform rotate-45">
                    {sharedRef.current.level || 1}
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 right-4">
              <div className="grid grid-cols-1">
                <div className="py-4 px-6 text-2xl border-8 ridge border-border-wood outline-black outline-3 ring-inset ring-2 ring-black bg-gradient-to-b from-wood to-dark-wood text-tan rounded-sm ">
                  1
                </div>
                <div className="py-4 px-6 text-2xl border-8 ridge border-border-wood outline-black outline-3 ring-inset ring-2 ring-black bg-gradient-to-b from-wood to-dark-wood text-tan rounded-sm ">
                  2
                </div>
                <div className="py-4 px-6 text-2xl border-8 ridge border-border-wood outline-black outline-3 ring-inset ring-2 ring-black bg-gradient-to-b from-wood to-dark-wood text-tan rounded-sm ">
                  3
                </div>
              </div>
            </div>

            <div className="text-white absolute bottom-4 left-4 text-xl">
              FPS: {frameRate.toFixed(1)}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
