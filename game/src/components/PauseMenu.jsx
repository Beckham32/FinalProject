import { useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const TABS = ["Inventory", "Map", "Crafting", "Blasting", "Quests", "Settings"];

const sampleInventory = [
  { id: 4, name: "Wood", count: 10 },
  { id: 5, name: "Stone", count: 5 },
  { id: 6, name: "Steel", count: 3 },
];

const sampleTools = [
  { id: 1, name: "Wood Sword" },
  { id: 2, name: "Health Potion" },
  { id: 3, name: "Mana Potion" },
];

const sampleArmor = {
  helmet: "Leather Helmet",
  cur: null,
  legs: null,
  boots: null,
};

function PauseMenu({ onClose }) {
  const [activeTab, setActiveTab] = useState("Inventory");

  function renderQuests() {
    return (
      <div className="p-4 bg-slate-950 min-h-screen">
        <h2 className="text-xl font-bold mb-4">Quests</h2>
        <p>Quests.</p>
      </div>
    );
  }

  function renderBlasting() {
    return (
      <div className="p-4 bg-slate-950 min-h-screen">
        <h2 className="text-xl font-bold mb-4">Blasting</h2>
        <p>Blasting.</p>
      </div>
    );
  }

  function renderCrafting() {
    return (
      <div className="p-4 bg-slate-950 min-h-screen">
        <h2 className="text-xl font-bold mb-4">Crafting</h2>
        <p>Crafting.</p>
      </div>
    );
  }

  function renderSettings() {
    return (
      <div className="p-4 bg-slate-950 min-h-screen">
        <h2 className="text-xl font-bold mb-4">Settings</h2>
        <p>Audio, Video, Controls, etc.</p>
      </div>
    );
  }

  function renderMap() {
    return <div className="px-4 pb-8 min-h-screen"></div>;
  }

  function renderInventory() {
    return (
      <>
        <div className="p-4 flex space-x-8 justify-center bg-slate-950 min-h-screen">
          <div className="">
            <h3 className="text-lg font-semibold my-2">Armor</h3>
            <div className="grid grid-cols-1 gap-3">
              {["helmet", "chest", "legs", "boots"].map((slot) => {
                const item = sampleArmor[slot];
                return (
                  <div
                    key={slot}
                    className={`border w-25 h-25 border-gold rounded p-2 text-gold flex items-center text-center justify-center ${
                      item ? "bg-black/70" : "bg-black/20"
                    }`}
                    title={item ? item : "Empty slot"}
                  >
                    {item && item}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="">
            <h3 className="text-lg font-semibold my-2">Tools</h3>
            <div className="grid grid-cols-1 gap-3">
              {sampleTools.map((tool) => (
                <div
                  key={tool.id}
                  className="border w-25 h-25 border-gold rounded p-2 bg-black/70 text-gold flex items-center text-center justify-between"
                  title={tool.name}
                >
                  <span>{tool.name}</span>
                </div>
              ))}
              {Array.from({ length: 4 - sampleTools.length }).map((_, i) => (
                <div
                  key={`empty-tool-${i}`}
                  className="border w-25 h-25 border-gold rounded p-2 bg-black/20 text-gold flex items-center text-center justify-center text-sm"
                ></div>
              ))}
            </div>
          </div>

          <div className="w-2/3">
            <h3 className="text-lg font-semibold my-2">Inventory</h3>
            <div className="grid grid-cols-5 gap-4">
              {sampleInventory.map((item) => (
                <div
                  key={item.id}
                  className="border border-gold rounded p-2 bg-black/70 text-gold flex items-center justify-between h-12"
                  title={item.name}
                >
                  <img className="w-8 h-8 rounded me-4" src="https://picsum.photos/200" alt="icon" />
                  <span className="flex-1">{item.name}</span>
                  <span className="text-sm font-sans font-bold">
                    x{item.count}
                  </span>
                </div>
              ))}
              {Array.from({ length: 35 - sampleInventory.length }).map(
                (_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="border border-gold rounded p-2 bg-black/20 text-gold flex items-center justify-center h-12 text-sm"
                  ></div>
                )
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  function renderTabContent() {
    switch (activeTab) {
      case "Settings":
        return renderSettings();
      case "Map":
        return renderMap();
      case "Inventory":
        return renderInventory();
      case "Crafting":
        return renderCrafting();
      case "Blasting":
        return renderBlasting();
      case "Quests":
        return renderQuests();
      default:
        return null;
    }
  }

  return (
    <div className="text-gold font-serif flex flex-col items-center justify-center w-full h-full fixed top-0 left-0 z-3 overflow-hidden select-none">
      <header className="flex bg-black/80 w-full">
        <LayoutGroup>
          <ul className="flex w-full">
            {TABS.map((tab) => (
              <li key={tab} className="flex relative">
                <button
                  className={`w-50 p-5 text-center font-bold text-lg transition-colors duration-200 ${
                    activeTab === tab
                      ? "bg-gold text-black"
                      : "hover:bg-gold/50 hover:text-black"
                  }`}
                  onClick={() => setActiveTab(tab)}
                  type="button"
                >
                  {tab}
                </button>
                {activeTab === tab && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gold"
                  />
                )}
              </li>
            ))}
          </ul>
          <button
            onClick={onClose}
            className="absolute top-1 right-2 px-5 py-3 text-3xl rounded-full font-extrabold hover:text-white transition-colors duration-200 hover:bg-red-500/50"
            aria-label="Close Pause Menu"
            type="button"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </LayoutGroup>
      </header>

      <section className="flex-grow overflow-auto w-full">
        {renderTabContent()}
      </section>
    </div>
  );
}

export default PauseMenu;
