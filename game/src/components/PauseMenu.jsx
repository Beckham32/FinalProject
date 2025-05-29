import { useState } from "react";
import { LayoutGroup } from "motion/react";

const TABS = ["Settings", "Map", "Inventory"];

const sampleInventory = [
  { id: 4, name: "Wood", count: 10 },
  { id: 5, name: "Stone", count: 5 },
  { id: 6, name: "Steel", count: 3 },
];

const sampleTools = [
  { id: 1, name: "Health Potion", count: 2 },
  { id: 2, name: "Mana Potion", count: 1 },
  { id: 3, name: "Sword", count: 1 },
];

const sampleArmor = {
  helmet: null,
  chest: null,
  legs: null,
  boots: null,
};

function PauseMenu({ onClose }) {
  const [activeTab, setActiveTab] = useState("Inventory");

  function renderSettings() {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Settings</h2>
        <p>Audio, Video, Controls, etc.</p>
      </div>
    );
  }

  function renderMap() {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Map</h2>
        <p>World map and player location goes here.</p>
      </div>
    );
  }

  function renderInventory() {
    return (
      <>
        <div className="p-4 flex space-x-8">
          <div className="w-2/3">
            <h3 className="text-lg font-semibold mb-2">Inventory</h3>
            <div className="grid grid-cols-5 gap-3">
              {sampleInventory.map((item) => (
                <div
                  key={item.id}
                  className="border border-gold rounded p-2 bg-black/70 text-gold flex items-center justify-between h-12"
                  title={item.name}
                >
                  <span>{item.name}</span>
                  <span className="text-sm">x{item.count}</span>
                </div>
              ))}
              {Array.from({ length: 20 - sampleInventory.length }).map(
                (_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="border border-gold rounded p-2 bg-black/20 text-gold flex items-center justify-center h-12 text-sm italic"
                  >
                    Empty
                  </div>
                )
              )}
            </div>
          </div>

          <div className="w-1/3">
            <h3 className="text-lg font-semibold my-2">Armor</h3>
            <div className="grid grid-cols-1 gap-3">
              {["helmet", "chest", "legs", "boots"].map((slot) => {
                const item = sampleArmor[slot];
                return (
                  <div
                    key={slot}
                    className="border border-gold rounded p-2 bg-black/70 text-gold flex items-center justify-center h-12"
                    title={item ? item.name : "Empty slot"}
                  >
                    {item ? item.name : <em>Empty {slot}</em>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col ">
          <h3 className="text-lg font-semibold mb-2 flex justify-center">
            Tools
          </h3>
          <div className="flex flex-row justify-center">
            {sampleTools.map((tool) => (
              <div
                key={tool.id}
                className="border border-gold rounded p-2 bg-black/70 text-gold flex items-center justify-between h-12"
                title={tool.name}
              >
                <span>{tool.name}</span>
                <span className="text-sm">x{tool.count}</span>
              </div>
            ))}
            {Array.from({ length: 5 - sampleTools.length }).map((_, i) => (
              <div
                key={`empty-tool-${i}`}
                className="border border-gold rounded p-2 bg-black/20 text-gold flex items-center justify-center h-12 text-sm italic"
              >
                Empty Tool Slot
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="bg-black text-gold font-serif flex flex-col items-center justify-center w-full mx-auto overflow-hidden">
      <header className="flex border-b border-gold bg-black/80">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-3 text-center font-bold text-lg transition-colors duration-200 ${
              activeTab === tab
                ? "bg-gold text-black"
                : "hover:bg-gold/50 hover:text-black"
            }`}
            onClick={() => setActiveTab(tab)}
            type="button"
          >
            {tab}
          </button>
        ))}

        <button
          onClick={onClose}
          className="px-4 py-3 text-xl font-bold hover:text-red-500 transition-colors duration-200"
          aria-label="Close Pause Menu"
          type="button"
        >
          x
        </button>
      </header>

      <section className="flex-grow overflow-auto">
        {activeTab === "Settings" && renderSettings()}
        {activeTab === "Map" && renderMap()}
        {activeTab === "Inventory" && renderInventory()}
      </section>
    </div>
  );
}

export default PauseMenu;
