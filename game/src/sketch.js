import gameData from "./data/gameData.json"; // Import game data
import map from "./data/map.json"; // Import Map

let spriteSheet;
let assetsLoaded = false;

function loadAssets(p) {
  return new Promise((resolve) => {
    p.loadImage("/assets/Player.png", (img) => {
      spriteSheet = img;
      assetsLoaded = true;
      resolve();
    });
  });
}

export default function sketch(p, sharedRef) {
  let game; // Declare game variable

  class Game {
    constructor() {
      // Initialize game state and components
      this.state = sharedRef.current.gameState;
      this.world = new World(this);
      this.player = new Player(this);
      this.entityManager = new MapEntityManager(this);
      this.children = [];
      this.children.push(this.world);
      this.children.push(this.entityManager);
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
      this.x = (map[0].length * game.world.tileSize) / 2;
      this.y = (map.length * game.world.tileSize) / 2;
      this.size = 128;
      this.velocityX = 0;
      this.velocityY = 0;
      this.maxHealth = 100;
      this.health = 100;
      this.maxMana = 100;
      this.mana = 100;
      this.acceleration = 1.5;
      this.maxSpeed = 8;
      this.friction = 0.9;
      this.level = 1;
      this.direction = 1;
      this.sprite = spriteSheet;
      this.radius = this.size * 1.5;
      this.stats = {
        strength: 10,
        defense: 10,
        intelligence: 10,
      };
      this.inventory = {
        tools: [
          { name: "Sword", type: "weapon", strength: 10 },
          { name: "Shield", type: "tool", defense: 8 },
        ],
        potions: [
          {
            name: "Health Potion",
            type: "potion",
            effect: "restoreHealth",
            amount: 20,
          },
          {
            name: "Mana Potion",
            type: "potion",
            effect: "restoreMana",
            amount: 20,
          },
        ],
        armor: [
          { name: "Leather Helmet", type: "armor", defense: 5 },
          { name: "Steel Boots", type: "armor", defense: 10 },
        ],
        items: [
          { name: "Wood", type: "item", count: 5, value: 1 },
          { name: "Leather", type: "item", count: 1, value: 0.5 },
        ],
      };
    }
    show() {
      p.push();
      p.translate(p.windowWidth / 2, p.windowHeight / 2);
      p.scale(this.direction, 1);
      p.imageMode(p.CENTER);
      p.image(spriteSheet, 0, 0, this.size, this.size);
      p.pop();

      // p.fill(255, 0, 0, 50);
      // p.ellipse(
      //   p.windowWidth / 2 + this.x - this.game.player.x,
      //   p.windowHeight / 2 + this.y - this.game.player.y,
      //   this.radius,
      //   this.radius
      // );
    }
    update() {
      // Calculate intended velocity based on input
      let nextVelocityX = this.velocityX;
      let nextVelocityY = this.velocityY;

      if (p.keyIsDown(p.LEFT_ARROW) || p.keyIsDown("a")) {
        this.direction = -1;
        nextVelocityX -= this.acceleration / 1.5;
      }
      if (p.keyIsDown(p.RIGHT_ARROW) || p.keyIsDown("d")) {
        this.direction = 1;
        nextVelocityX += this.acceleration / 1.5;
      }

      if (p.keyIsDown(p.UP_ARROW) || p.keyIsDown("w"))
        nextVelocityY -= this.acceleration / 2;
      if (p.keyIsDown(p.DOWN_ARROW) || p.keyIsDown("s"))
        nextVelocityY += this.acceleration / 2;

      if (p.keyIsDown("e")) {
        // Pickup Logic
      }

      nextVelocityX *= this.friction;
      nextVelocityY *= this.friction;

      nextVelocityX = p.constrain(nextVelocityX, -this.maxSpeed, this.maxSpeed);
      nextVelocityY = p.constrain(nextVelocityY, -this.maxSpeed, this.maxSpeed);

      // Predict next position
      const nextX = this.x + nextVelocityX;
      const nextY = this.y + nextVelocityY;

      const nextTileX = Math.floor(nextX / this.game.world.tileSize);
      const nextTileY = Math.floor(nextY / this.game.world.tileSize);

      const terrainCode = map[nextTileY]?.[nextTileX];
      const biomeObj = this.game.world.biomes.find(
        (b) => b.code === terrainCode
      );
      const biomeName = biomeObj ? biomeObj.name : "Unknown";

      // Block movement into Ocean or Mountain
      if (biomeName === "Mountain" || biomeName === "Ocean") {
        this.velocityX = 0;
        this.velocityY = 0;
        return;
      }

      // If not blocked, apply movement
      this.velocityX = nextVelocityX;
      this.velocityY = nextVelocityY;
      this.x += this.velocityX;
      this.y += this.velocityY;
    }
  }

  class World {
    // World class to manage game world properties
    constructor(game) {
      this.game = game;
      this.biomes = gameData.biomes; // Load biomes from game data
      this.tileSize = 64; // Size of each tile in pixels
      this.tileColors = {
        wa: p.color("#1E3F66"),
        sa: p.color("#d2b48c"),
        pl: p.color("#B6E468"),
        fo: p.color("#3a5f0b"),
        co: p.color("#203119"),
        gr: p.color("#CCCE44"),
        mo: p.color("#555555"),
        default: p.color("#000000"),
      };
    }
    show() {
      const tilesInViewX = Math.ceil(p.windowWidth / this.tileSize) + 2;
      const tilesInViewY = Math.ceil(p.windowHeight / this.tileSize) + 2;

      const playerTileX = Math.floor(this.game.player.x / this.tileSize);
      const playerTileY = Math.floor(this.game.player.y / this.tileSize);

      const startX = Math.max(0, playerTileX - Math.floor(tilesInViewX / 2));
      const startY = Math.max(0, playerTileY - Math.floor(tilesInViewY / 2));
      const endX = Math.min(map[0].length, startX + tilesInViewX);
      const endY = Math.min(map.length, startY + tilesInViewY);

      for (let r = startY; r < endY; r++) {
        for (let c = startX; c < endX; c++) {
          let terrain = map[r][c];
          let col = this.tileColors[terrain] || this.tileColors.default;
          p.fill(col);

          const screenX =
            p.windowWidth / 2 + (c * this.tileSize - this.game.player.x);
          const screenY =
            p.windowHeight / 2 + (r * this.tileSize - this.game.player.y);
          p.rect(screenX, screenY, this.tileSize, this.tileSize);
        }
      }
    }
    update() {}
  }

  class Minimap {
    constructor(tileColors, size) {
      this.biomes = gameData.biomes;
      this.tileColors = tileColors;
      this.tileSize = size;
      this.mapWidth = map[0].length;
      this.mapHeight = map.length;
      this.buffer = p.createGraphics(
        this.mapWidth * this.tileSize,
        this.mapHeight * this.tileSize
      );
      this.buffer.noStroke();

      for (let r = 0; r < this.mapHeight; r++) {
        for (let c = 0; c < this.mapWidth; c++) {
          let terrain = map[r][c];
          let col = this.tileColors[terrain] || this.tileColors.default;
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

    show() {
      const minimapWidth = this.mapWidth * this.tileSize;
      const minimapHeight = this.mapHeight * this.tileSize;
      const minimapOffsetX = (p.width - minimapWidth) / 2;
      const minimapOffsetY = (p.height - minimapHeight) / 2;
      p.image(this.buffer, minimapOffsetX, minimapOffsetY);

      const playerTileX = Math.floor(game.player.x / game.world.tileSize);
      const playerTileY = Math.floor(game.player.y / game.world.tileSize);
      p.fill(255, 0, 0);
      p.textSize(24);
      p.textAlign(p.CENTER, p.BOTTOM);
      p.text(
        game.player.name || "Player",
        minimapOffsetX + (playerTileX + 0.5) * this.tileSize,
        minimapOffsetY + (playerTileY + 0.5) * this.tileSize - 15
      );
      p.ellipse(
        minimapOffsetX + (playerTileX + 0.5) * this.tileSize,
        minimapOffsetY + (playerTileY + 0.5) * this.tileSize,
        this.tileSize * 6,
        this.tileSize * 6
      );
    }
  }

  class MapEntityManager {
    constructor(game) {
      this.game = game;
      this.entities = [];

      const px = game.player.x;
      const py = game.player.y;

      this.add(new MapEntity("Wood", px + 100, py + 150));
    }
    add(entity) {
      this.entities.push(entity);
    }
    show() {
      for (let e of this.entities) {
        e.show(p, this.game.player);
      }
    }
    update() {}
  }

  class MapEntity {
    constructor(name, x, y) {
      this.name = name;
      this.x = x;
      this.y = y;
    }
    show(p, player) {
      const screenX = p.windowWidth / 2 + (this.x - player.x);
      const screenY = p.windowHeight / 2 + (this.y - player.y);

      p.fill(255);
      p.stroke(0);
      p.strokeWeight(3);
      p.textSize(14);
      p.textAlign(p.CENTER);
      p.text(this.name, screenX, screenY - 20);
      p.noStroke();

      p.fill(217, 0, 255);
      p.ellipse(screenX, screenY, 16, 16);
      p.fill(166, 0, 255, 75);
      p.ellipse(screenX, screenY, 24, 24);
      p.ellipse(screenX, screenY, 32, 32);
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

  p.setup = async function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    await loadAssets(p);
    if (!spriteSheet) {
      console.error("Sprite sheet failed to load.");
      return;
    }

    game = new Game();

    p.noStroke();
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  let minimapInstance = null;

  p.draw = function () {
    syncRef();

    if (game.state === "paused") {
      p.fill(2, 6, 23);
      p.rect(0, 0, p.windowWidth, p.windowHeight);

      // Only create the minimap buffer once
      if (!minimapInstance) {
        minimapInstance = new Minimap(game.world.tileColors, 3);
      }
      minimapInstance.show();
      return;
    } else {
      minimapInstance = null;
    }

    p.background(30, 63, 102);

    if (game.state === "game") {
      game.show();
      game.update();
    }
  };
}
