# Persistent RPG Game – Dynamic World Adventure

## 📘 Overview

This project is a persistent, API-driven RPG where the player explores an evolving open world, completes quests, dives into procedurally generated dungeons, and interacts with NPCs whose behaviour adapts using AI. Combat, inventory, quests, and dynamic world events form the core gameplay loop.

---

## 🌍 Game Structure

### Core Components
- **World Map**: Interconnected cities, towns, forests, caves, and dungeons.
- **Player**: Tracks stats, inventory, gear, and progress.
- **NPCs & Quests**: Provide narrative, rewards, and player choices.
- **Dungeons**: Procedural or handcrafted challenges with loot and enemies.
- **Combat & Gear**: Turn-based or action combat, loot scaling, gear progression.
- **API Integration**: Drives loot generation and quests.

---

## 🧱 OOP Classes & Data Structures

### Classes

- **`Game`**: Manages state, player progression, dungeons, and world events.
- **`Player`**: Health, level, inventory, gear, skills, and quest tracking.
- **`World`**: Contains locations, transitions, and event triggers.
- **`Location`**: Represents towns, forests, or dungeons with content and interactions.
- **`Dungeon`**: Procedural or designed; holds monsters, rooms, loot, and bosses.
- **`Item`**: Weapons, armour, potions, and quest items with stats and rarity.
- **`Monster`**: Enemies with HP, damage, loot, and attack logic.
- **`Quest`**: Story or task structure with objectives and progression methods.
- **`CombatSystem`**: Turn management and combat resolution.

### Data Structures

- **Graphs / Trees**: Represent the world map layout.
- **HashMaps**: Store inventory, gear, and player stats.
- **Queues**: Used in turn-based combat mechanics.

---

## 🔌 API Integration

### Dynamic Systems

- **Time-Based Content**: 
  - Quests, dungeons, and shops vary based on real-world date/time.
- **Loot Generation**: 
  - APIs scale loot drops by difficulty and context.
- **Dungeon Generation**: 
  - Procedural layouts and monster density fetched from an external API.
- **Quest Generation**: 
  - Dynamic quests from the quest APIs
- **AI Behavior**: 
  - External logic can guide monster strategies in combat.

---

## Procedural Dungeon Crawler

- **Procedural Layouts**: Randomized room and enemy placement.
- **Dynamic Difficulty**: Scales with player level or location.
- **Loot Scaling**: API-driven gear based on dungeon type and rarity.
- **Combat Options**: Turn-based, action, or hybrid systems supported.

---

## Dynamic NPC & World Progression

- **Real-World Economy**: NPC prices and behaviour adjust based on global data.
- **Adaptive Dialogue**: Contextual and branching based on player decisions and events.
- **Live Quests**: Generated in response to real-world triggers or player milestones.

---

## Milestones & Development Roadmap

1. **Core Systems**  
   - World layout, player movement, inventory, and stat tracking.

2. **Dungeon Framework**  
   - Procedural generation, enemy AI, and basic combat loop.
  
3. **Backend and Saving**
   - Create a backend that saves player data and can reload it across multiple sessions.

5. **API Integration**  
   - Dynamic quests, world events, and loot generation.

6. **Content & Polish**  
   - Add rich storylines, advanced NPC behaviours, and diverse dungeons.

---

## 🛠️ Tech Stack

| Layer         | Tech                     |
|---------------|---------------------------|
| **Frontend**  | React + Vite              |
| **UI Styling**| TailwindCSS + Motion      |
| **Game Logic**| P5.js + P5.play           |
| **State Mgmt**| Redux                     |
| **Animation** | Motion                    |
| **APIs**      | Custom + External         |

---

## 💡 Notes

- Modular, scalable OOP design.
- World reacts to real-world data, not just static storylines.
- Goals: Exploration, evolving storylines, and endless replayability.

---

