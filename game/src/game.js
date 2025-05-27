import p5 from "p5";
import p5Play from "p5.play";

const sketch = (p) => {
  let player;

  p.setup = () => {
    p.createCanvas(800, 600);
    player = p.createSprite(p.width / 2, p.height / 2, 50, 50);
    player.shapeColor = p.color(255, 0, 0);
  };

  p.draw = () => {
    p.background(200);
    p.drawSprites();
  };
};

new p5(sketch);
