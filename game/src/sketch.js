import gameData from './data/gameData.json'; // Import game data
import map from './data/map.json'; // Import Map

export default function sketch(p, sharedRef) {
  let game; // Declare game variable

  class Game {
    constructor() { // Initialize game state and components
      this.state = sharedRef.current.gameState;
      this.player = new Player(this);
      this.world = new World(this);
      this.itemSystem = new ItemSystem(this);
      this.score = 100;
      this.children = [];
      this.children.push(this.player);
      this.children.push(this.world);
    }
    show() { // Render game components
      for (let child of this.children) {
        child.show();
      }
    }
    update() { // Update game components
      for (let child of this.children) {
        child.update();
      }
    }
  }

  class Player { // Player class to handle player properties and actions
    constructor(game) {
      this.game = game;
      this.name = sharedRef.current.heroName;
      this.x = p.windowWidth / 2;
      this.y = p.windowHeight / 2;
      this.size = 50;
      this.velocityX = 0;
      this.velocityY = 0;
      this.maxHealth = 100;
      this.health = 100;
      this.maxMana = 100;
      this.mana = 100;
      this.acceleration = 0.5;
      this.maxSpeed = 5;
      this.friction = 0.9;
      this.level = 1;
      this.armor = [];
    }
    show() { // Draw the player on the canvas
      p.fill(255, 204, 0);
      p.stroke(168, 135, 0);
      p.stroke(4)
      p.ellipse(this.x, this.y, this.size);
    }
    update() { // Update player position based on input
      if (p.keyIsDown(p.LEFT_ARROW) || p.keyIsDown("a")) this.velocityX -= this.acceleration;
      if (p.keyIsDown(p.RIGHT_ARROW) || p.keyIsDown("d")) this.velocityX += this.acceleration;
      if (p.keyIsDown(p.UP_ARROW) || p.keyIsDown("w")) this.velocityY -= this.acceleration;
      if (p.keyIsDown(p.DOWN_ARROW) || p.keyIsDown("s")) this.velocityY += this.acceleration;

      this.velocityX *= this.friction;
      this.velocityY *= this.friction;

      this.velocityX = p.constrain(this.velocityX, -this.maxSpeed, this.maxSpeed);
      this.velocityY = p.constrain(this.velocityY, -this.maxSpeed, this.maxSpeed);

      this.x += this.velocityX;
      this.y += this.velocityY;
    }
  }

  class World { // World class to manage game world properties
    constructor(game) {
      this.game = game;
      this.biomes = gameData.biomes; // Load biomes from game data
      this.renderFlag = false;
    }
    show() {
      if (!this.renderFlag) {
        let tileSize = 3; // 1 pixel per tile
        for (let r = 0; r < map.length; r++) {
          for (let c = 0; c < map[r].length; c++) {
            let terrain = map[r][c];
            let col;
            switch (terrain) {
              case "wa": col = p.color("#1E3F66"); break;      // Water
              case "sa": col = p.color("#d2b48c"); break;      // Sand
              case "pl": col = p.color("#a3c962"); break;      // Plains
              case "fo": col = p.color("#3a5f0b"); break;      // Forest
              case "de": col = p.color("#d2a95a"); break;      // Desert
              case "mo": col = p.color("#7f8c8d"); break;      // Mountain
              case "sn": col = p.color("#ffffff"); break;      // Snow
              default: col = p.color("#000000"); break;      // Fallback
            }
            p.noStroke();
            p.fill(col);
            p.rect(c * tileSize, r * tileSize, tileSize, tileSize);
          }
        }
        // this.renderFlag = true;
      }
    }
    update() { // Update center world position based on player

    }
  }

  class ItemSystem { // Item system to manage items and inventory
    constructor(game) {
      this.game = game;
      this.item = new Item(this);
      this.inventory = new Inventory(this);
      this.items = gameData.items; // Load items from game data
    }
  }

  class Item { // Item class to handle individual item properties
    constructor(ItemSystem) {
      this.itemSystem = ItemSystem
    }
  }

  class Inventory { // Inventory class to manage player's inventory
    constructor(ItemSystem) {
      this.itemSystem = ItemSystem
    }
  }

  function syncRef() { // Synchronize game state with sharedRef
    const ref = sharedRef.current;

    game.state = ref.gameState;
    game.player.name = ref.heroName;

    ref.health = game.player.health;
    ref.mana = game.player.mana;
    ref.maxHealth = game.player.maxHealth;
    ref.maxMana = game.player.maxMana;
    ref.level = game.player.level;
    ref.frameRate = p.frameRate();
  }

  p.setup = function () { // Setup the p5 canvas and initialize the game
    p.createCanvas(p.windowWidth, p.windowHeight);
    game = new Game();
  }
  
  p.windowResized = function () { // Handle window resize to adjust canvas and player position
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    game.player.x = p.windowWidth / 2;
    game.player.y = p.windowHeight / 2;
  }

  p.draw = function () { // Main draw loop to render the game
    p.background(28, 28, 28);
    syncRef(); // Synchronize game state with sharedRef every frame

    if (game.state === "game") { // Only update and show game components if in game state
      game.show();
      game.update();
    }
  };
}