import gameData from "./data/gameData.json"; // Import game data
import map from "./data/map.json"; // Import Map

export default function sketch(p, sharedRef) {
  let game; // Declare game variable

  class Game {
    constructor() {
      // Initialize game state and components
      this.state = sharedRef.current.gameState;
      this.world = new World(this);
      this.player = new Player(this);
      this.itemSystem = new ItemSystem(this);
      this.children = [];
      this.children.push(this.world);
      this.children.push(this.player);
    }
    show() {
      // Render game components
      for (let child of this.children) {
        child.show();
      }
    }
    update() {
      // Update game components
      for (let child of this.children) {
        child.update();
      }
    }
  }

  class Player {
    // Player class to handle player properties and actions
    constructor(game) {
      this.game = game;
      this.name = sharedRef.current.heroName;
      this.x = 0; // Player's world position (start at the center of the map)
      this.y = 0;
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

    show() {
      // Draw the player at the center of the screen
      p.fill(255, 204, 0);
      p.noStroke();
      p.ellipse(p.width / 2, p.height / 2, this.size);
    }

    update() {
      // Update player's world position based on input
      if (p.keyIsDown(p.LEFT_ARROW) || p.keyIsDown("a"))
        this.velocityX -= this.acceleration;
      if (p.keyIsDown(p.RIGHT_ARROW) || p.keyIsDown("d"))
        this.velocityX += this.acceleration;
      if (p.keyIsDown(p.UP_ARROW) || p.keyIsDown("w"))
        this.velocityY -= this.acceleration;
      if (p.keyIsDown(p.DOWN_ARROW) || p.keyIsDown("s"))
        this.velocityY += this.acceleration;

      this.velocityX *= this.friction;
      this.velocityY *= this.friction;

      this.velocityX = p.constrain(
        this.velocityX,
        -this.maxSpeed,
        this.maxSpeed
      );
      this.velocityY = p.constrain(
        this.velocityY,
        -this.maxSpeed,
        this.maxSpeed
      );

      this.x += this.velocityX; // Update world position
      this.y += this.velocityY;
    }
  }

  class World {
    // World class to manage game world properties
    constructor(game) {
      this.game = game;
      this.biomes = gameData.biomes; // Load biomes from game data
      this.renderFlag = false;
      this.buffer = null; // p5.Graphics buffer for the world
      this.tileSize = 50; // Size of each tile in pixels
      this.centerX = p.windowWidth / 2;
      this.centerY = p.windowHeight / 2;
      this.cameraX = 0;
      this.cameraY = 0;
      this.cameraSpeed = 0.1; // Speed of camera movement
    }
    show() {
      // Create the buffer if it doesn't exist
      if (!this.buffer) {
        this.buffer = p.createGraphics(
          map[0].length * this.tileSize,
          map.length * this.tileSize
        );
        this.buffer.noStroke();

        // Render the entire map to the buffer
        for (let r = 0; r < map.length; r++) {
          for (let c = 0; c < map[r].length; c++) {
            let terrain = map[r][c];
            let col;
            switch (terrain) {
              case "wa":
                col = this.buffer.color("#1E3F66");
                break; // Water
              case "sa":
                col = this.buffer.color("#d2b48c");
                break; // Sand
              case "pl":
                col = this.buffer.color("#a3c962");
                break; // Plains
              case "fo":
                col = this.buffer.color("#3a5f0b");
                break; // Forest
              case "de":
                col = this.buffer.color("#d2a95a");
                break; // Desert
              case "mo":
                col = this.buffer.color("#7f8c8d");
                break; // Mountain
              case "sn":
                col = this.buffer.color("#ffffff");
                break; // Snow
              default:
                col = this.buffer.color("#000000");
                break; // Fallback
            }
            this.buffer.fill(col);
            this.buffer.rect(
              c * this.tileSize,
              r * this.tileSize,
              this.tileSize,
              this.tileSize
            );
          }
        }
      }
      // Calculate the offset to center the grid on the screen, following the player's position
      const offsetX =
        this.centerX -
        ((this.tileSize * map[0].length) / 2 + this.game.player.x);
      const offsetY =
        this.centerY -
        ((this.tileSize * map[0].length) / 2 + this.game.player.y);

      // Draw the buffer to the main canvas with the calculated offset
      p.image(this.buffer, offsetX, offsetY);
    }
    update() {}
  }

  class ItemSystem {
    // Item system to manage items and inventory
    constructor(game) {
      this.game = game;
      this.item = new Item(this);
      this.inventory = new Inventory(this);
      this.items = gameData.items; // Load items from game data
    }
  }

  class Item {
    // Item class to handle individual item properties
    constructor(ItemSystem) {
      this.itemSystem = ItemSystem;
    }
  }

  class Inventory {
    // Inventory class to manage player's inventory
    constructor(ItemSystem) {
      this.itemSystem = ItemSystem;
    }
  }

  function syncRef() {
    // Synchronize game state with sharedRef
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

  p.setup = function () {
    // Setup the p5 canvas and initialize the game
    p.createCanvas(p.windowWidth, p.windowHeight);
    game = new Game();
  };

  let isPaused = false;

  p.windowResized = function () {
    if (isPaused) {
      return;
    }
    setTimeout(() => {
      game.player.x = p.windowWidth / 2;
      game.player.y = p.windowHeight / 2;
    }, 1000);
    // Handle window resize to adjust canvas and player position
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    
  };

  p.draw = function () {
    if (game.state === "paused") {
      // If the game is paused, do not update or render game components
      isPaused = true;
      p.noLoop(); // Stop the draw loop
      return;
    }
    // Main draw loop to render the game
    p.background(28, 28, 28);
    syncRef(); // Synchronize game state with sharedRef every frame

    if (game.state === "game") {
      // Only update and show game components if in game state
      game.show();
      game.update();
    }
  };
}
