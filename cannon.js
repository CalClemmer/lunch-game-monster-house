import { Cannonball } from "./cannonball.js";

export class Cannon {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = 0;

    this.barrelLength = 50;
    this.barrelWidth = 10;
  }

  update(mouseX, mouseY) {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    this.angle = Math.atan2(dy, dx);
  }

  fire(targetX, targetY) {
    const tipX = this.x + Math.cos(this.angle) * this.barrelLength;
    const tipY = this.y + Math.sin(this.angle) * this.barrelLength;
    return new Cannonball(tipX, tipY, targetX, targetY);
  }

  draw(ctx) {
    // Platform: "T" shape
    ctx.fillStyle = "#444";
    // Vertical part of T
    ctx.fillRect(this.x - 5, this.y + 10, 10, 60);
    // Horizontal part of T
    ctx.fillRect(this.x - 20, this.y + 70, 40, 10);

    // Barrel — draw before base so it appears underneath
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    ctx.fillStyle = "#333";
    ctx.fillRect(0, -this.barrelWidth / 2, this.barrelLength, this.barrelWidth);

    ctx.restore();

    // Cannon base (on top of barrel)
    ctx.fillStyle = "#666";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 15, 0, Math.PI * 2);
    ctx.fill();
  }
}
