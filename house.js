export class House {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(ctx) {
    // House base
    ctx.fillStyle = "#8B4513"; // brown
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Roof
    ctx.fillStyle = "#A52A2A"; // dark red
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.width / 2, this.y - this.height / 2);
    ctx.lineTo(this.x + this.width, this.y);
    ctx.closePath();
    ctx.fill();

    // Door
    const doorWidth = this.width / 5;
    const doorHeight = this.height / 2;
    const doorX = this.x + this.width / 2 - doorWidth / 2;
    const doorY = this.y + this.height - doorHeight;

    ctx.fillStyle = "#654321"; // dark brown
    ctx.fillRect(doorX, doorY, doorWidth, doorHeight);

    // Windows (slightly bigger)
    const windowSize = this.width / 4.5;
    const windowY = this.y + this.height / 4;

    const leftWindowX = this.x + this.width / 6 - windowSize / 2;
    const rightWindowX = this.x + this.width * 5 / 6 - windowSize / 2;

    ctx.fillStyle = "#ADD8E6"; // light blue
    ctx.fillRect(leftWindowX, windowY, windowSize, windowSize);
    ctx.fillRect(rightWindowX, windowY, windowSize, windowSize);

  }
}
