import gameData from './data/gameData.json';

export default function sketch(p, sharedRef) {
  let game;

  class Game {
    constructor() {
      this.state = sharedRef.current.gameState;
      this.player = new Player(this);
      this.world = new World(this);
      this.itemSystem = new ItemSystem(this);
      this.score = 100;
      this.children = [];
      this.children.push(this.player);
      this.children.push(this.world);
    }
    show() {
      for (let child of this.children) {
        child.show();
      }
    }
    update() {
      for (let child of this.children) {
        child.update();
      }
    }
  }

  class Player {
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
    show() {
      p.fill(255, 204, 0);
      p.stroke(168, 135, 0);
      p.strokeWeight(4)
      p.ellipse(this.x, this.y, this.size);
    }
    update() {
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

  class World {
    constructor(game) {
      this.game = game;
      this.biomes = gameData.biomes;
    }
    show() {

    }
    update() {

    }
  }

  class ItemSystem {
    constructor(game) {
      this.game = game;
      this.item = new Item(this);
      this.inventory = new Inventory(this);
      this.items = gameData.items;
    }
  }

  class Item {
    constructor(ItemSystem) {
      this.itemSystem = ItemSystem
    }
  }

  class Inventory {
    constructor(ItemSystem) {
      this.itemSystem = ItemSystem
    }
  }

  function syncRef() {
    const ref = sharedRef.current;

    game.state = ref.gameState;
    game.player.name = ref.heroName;

    ref.health = game.player.health;
    ref.mana = game.player.mana;
    ref.level = game.player.level;
    ref.frameRate = p.frameRate();
  }

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    game = new Game();
  }
  
  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    game.player.x = p.windowWidth / 2;
    game.player.y = p.windowHeight / 2;
  }

  p.draw = function () {
    p.background(28, 28, 28);
    syncRef();

    if (game.state === "game") {
      game.show();
      game.update();
    }
  };
}