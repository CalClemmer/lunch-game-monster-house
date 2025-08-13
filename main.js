import { House } from "./house.js";
import { Grass } from "./grass.js";
import { Monster } from "./monster.js";
import { Cannon } from "./cannon.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const house = new House(350, 480, 100, 100);
const grass = new Grass(530);
const monster = new Monster(400, 100);
const projectiles = [];
const cannon = new Cannon(house.x - 200, house.y + house.height - 90);
const cannonballs = [];

let mouseX = 0;
let mouseY = 0;

let lastTime = 0;

canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
});

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    const ball = cannon.fire(mouseX, mouseY);
    cannonballs.push(ball);
  }
});

function gameLoop(timestamp) {
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update game state
  monster.update(deltaTime);
  cannon.update(mouseX, mouseY);

  const newProjectile = monster.maybeFire({
    x: house.x + house.width / 2,
    y: house.y + house.height / 2,
  });
  if (newProjectile) {
    projectiles.push(newProjectile);
  }

  // Draw background
  grass.draw(ctx, canvas.width);
  monster.draw(ctx);

  // Draw and update projectiles
  for (let i = projectiles.length - 1; i >= 0; i--) {
    const p = projectiles[i];
    p.update(house);
    p.draw(ctx);
    if (!p.alive) {
      projectiles.splice(i, 1);
    }
  }

  // Draw and update cannonballs
  for (let i = cannonballs.length - 1; i >= 0; i--) {
    const ball = cannonballs[i];
    ball.update();
    ball.draw(ctx);
    if (!ball.alive) {
      cannonballs.splice(i, 1);
    }
  }

  for (const ball of cannonballs) {
    for (const proj of projectiles) {
      ball.checkCollisionWithProjectile?.(proj); // if method exists
    }
  }

  // Draw foreground
  house.draw(ctx);
  cannon.draw(ctx);

  requestAnimationFrame(gameLoop);
}

gameLoop(0);
