# Open World Dungeon Crawler

## SCOPE

This project will be worked on after the final submission, I am labeling the project submission version *v1.0.0-alpha* which will include a more limited amount of features
due to the timeframe.

version *v2.0.0-beta * will be the true first release having everything I planned for and a better art direction.

| v1.0.0-alpha                   | v2.0.0-beta                     |
|--------------------------------|---------------------------------|
| Basic World                    | Defined World with Locations    |
| Simple Menu                    | Expansive Menu (Settings/Quests)|
| Low Amounts of Art             | Quests and NPCs                 |
| 1-3 Dungeons                   | Procedural Dungeons             |
| Basic Combat System            | Better/More Art                 |
| Simple Inventory System        | Advanced Inventory System       |
| 3-4 Enemies                    | More Enemies                    |
| Small Item List                | Large Item Datalist             |
|                                | Advanced Turn-Based Combat      |
|                                | AI Integration                  |
|                                | Economy System                  |

## Overview

This project is a *persistent*, RPG where the player explores an evolving open world, completes quests, dives into procedurally generated dungeons, and interacts with NPCs whose behaviour adapts using AI. Combat, inventory, quests, and dynamic world events form the core gameplay loop.

NOTE:
Parts of this will not be finished for Beta Release.

---

## Game Structure

### Core Components
- **World Map**: Interconnected cities, towns, forests, caves, and dungeons.
- **Player**: Tracks stats, inventory, gear, and progress.
- **NPCs & Quests**: Provide narrative, rewards, and player choices.
- **Dungeons**: Procedural or handcrafted challenges with loot and enemies.
- **Combat & Gear**: Turn-based or action combat, loot scaling, gear progression.

---

## OOP Classes & Data Structures

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

---

## API Integration

### Dynamic Systems

- **Time-Based Content**: 
  - Quests, dungeons, and shops vary based on real-world date/time.
- **AI Behavior**: 
  - External logic can guide monster strategies in combat.

---

## Procedural Dungeon Crawler

- **Procedural Layouts**: Randomized room and enemy placement.
- **Dynamic Difficulty**: Scales with player level or location.
- **Combat**: Turn-based.

---

## Dynamic NPC & World Progression

- **Real-World Economy**: NPC prices and behaviour adjust based on global data.
- **Adaptive Dialogue**: Contextual and branching based on player decisions and events.

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

## Tech Stack

| Layer         | Tech                      |
|---------------|---------------------------|
| **Frontend**  | React + Vite              |
| **UI Styling**| TailwindCSS + Motion      |
| **Game Logic**| P5.js                     |
| **Animation** | Motion                    |
