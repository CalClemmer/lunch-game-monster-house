export class Projectile {
  constructor(x, y, targetX, targetY) {
    this.x = x;
    this.y = y;
    this.radius = 6;

    const dx = targetX - x;
    const dy = targetY - y;

    this.vx = dx / 100;
    this.vy = dy / 100 - 2; // start with slight upward motion
    this.gravity = 0.05;

    this.alive = true;
  }

  update(house) {
    // Movement
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;

    // Offscreen check
    if (this.y > 1000) {
      this.alive = false;
      return;
    }

    // === Collision with house body (rectangle) ===
    const closestX = Math.max(house.x, Math.min(this.x, house.x + house.width));
    const closestY = Math.max(house.y, Math.min(this.y, house.y + house.height));
    const dx = this.x - closestX;
    const dy = this.y - closestY;

    const distanceSquared = dx * dx + dy * dy;
    if (distanceSquared < this.radius * this.radius) {
      this.alive = false;
      return;
    }

    // === Collision with roof (triangle) ===
    const roofPeak = {
      x: house.x + house.width / 2,
      y: house.y - house.height / 2,
    };
    const leftCorner = { x: house.x, y: house.y };
    const rightCorner = { x: house.x + house.width, y: house.y };

    if (pointInTriangle({ x: this.x, y: this.y }, roofPeak, leftCorner, rightCorner)) {
      this.alive = false;
    }
  }

  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Helper: point-in-triangle using barycentric coordinates
function pointInTriangle(p, a, b, c) {
  const area = 0.5 * (-b.y * c.x + a.y * (-b.x + c.x) + a.x * (b.y - c.y) + b.x * c.y);
  const s = (1 / (2 * area)) * (a.y * c.x - a.x * c.y + (c.y - a.y) * p.x + (a.x - c.x) * p.y);
  const t = (1 / (2 * area)) * (a.x * b.y - a.y * b.x + (a.y - b.y) * p.x + (b.x - a.x) * p.y);
  const u = 1 - s - t;

  return s >= 0 && t >= 0 && u >= 0;
}
