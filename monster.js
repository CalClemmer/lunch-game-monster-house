import { Projectile } from "./projectile.js";

export class Monster {
  constructor(x, y) {
    this.baseX = x; // fixed horizontal center
    this.baseY = y; // fixed vertical center

    this.x = x;
    this.y = y;

    this.cloudRadius = 30;
    this.bodyWidth = 40;
    this.bodyHeight = 50;

    this.timeSinceLastFire = 0;
    this.fireInterval = 3000;

    // Movement params
    this.angle = 0;
    this.speedX = 1.2;
    this.amplitudeY = 10;

    this.minX = 100;
    this.maxX = 700;
    this.direction = 1;
  }

  update(deltaTime) {
    this.timeSinceLastFire += deltaTime;

    // Side-to-side
    this.baseX += this.speedX * this.direction;
    if (this.baseX < this.minX || this.baseX > this.maxX) {
      this.direction *= -1; // reverse direction
    }

    // Bobbing
    this.angle += 0.06; // smooth sinusoidal wave
    this.x = this.baseX;
    this.y = this.baseY + Math.sin(this.angle) * this.amplitudeY;
  }

  maybeFire(target) {
    if (this.timeSinceLastFire >= this.fireInterval) {
      this.timeSinceLastFire = 0;
      return new Projectile(this.x, this.y, target.x, target.y);
    }
    return null;
  }

  draw(ctx) {
    // Draw cloud base
    ctx.fillStyle = "#FFFFFF";
    const r = this.cloudRadius;
    ctx.beginPath();
    ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
    ctx.arc(this.x + r, this.y + 10, r, 0, Math.PI * 2);
    ctx.arc(this.x - r, this.y + 10, r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    // Body
    const bodyX = this.x - this.bodyWidth / 2;
    const bodyY = this.y - this.bodyHeight;
    ctx.fillStyle = "#FF69B4";
    ctx.fillRect(bodyX, bodyY, this.bodyWidth, this.bodyHeight);

    // Eyes
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x - 10, bodyY + 15, 5, 0, Math.PI * 2);
    ctx.arc(this.x + 10, bodyY + 15, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(this.x - 10, bodyY + 15, 2, 0, Math.PI * 2);
    ctx.arc(this.x + 10, bodyY + 15, 2, 0, Math.PI * 2);
    ctx.fill();

    // Smile
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.arc(this.x, bodyY + 30, 8, 0, Math.PI, false);
    ctx.stroke();
  }
}
