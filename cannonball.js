export class Cannonball {
  constructor(x, y, targetX, targetY) {
    this.x = x;
    this.y = y;
    this.radius = 6;

    const dx = targetX - x;
    const dy = targetY - y;
    const distance = Math.hypot(dx, dy);

    const speed = 8;

    this.vx = (dx / distance) * speed;
    this.vy = (dy / distance) * speed;

    this.alive = true;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Remove if off-screen
    if (this.x < -50 || this.x > 1000 || this.y < -50 || this.y > 1000) {
      this.alive = false;
    }
  }

  draw(ctx) {
    ctx.fillStyle = "#888"; // gray cannonball
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  checkCollisionWithProjectile(projectile) {
    const dx = this.x - projectile.x;
    const dy = this.y - projectile.y;
    const distance = Math.hypot(dx, dy);
    const minDistance = this.radius + projectile.radius;

    if (distance < minDistance) {
      // Simple bounce: just reflect velocities
      const angle = Math.atan2(dy, dx);
      const speed = 3;

      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;

      projectile.vx = -Math.cos(angle) * speed;
      projectile.vy = -Math.sin(angle) * speed;

      return true;
    }

    return false;
  }
}
