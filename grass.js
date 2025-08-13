export class Grass {
  constructor(y, amplitude = 20, wavelength = 550) {
    this.y = y; // vertical offset (baseline)
    this.amplitude = amplitude;
    this.wavelength = wavelength;
  }

  draw(ctx, canvasWidth) {
    ctx.fillStyle = "#228B22"; // grass green
    ctx.beginPath();
    ctx.moveTo(0, ctx.canvas.height); // bottom-left

    // Draw sine wave path
    for (let x = 0; x <= canvasWidth; x++) {
      const waveY = this.y + this.amplitude * Math.sin((x / this.wavelength) * 2 * Math.PI);
      ctx.lineTo(x, waveY);
    }

    ctx.lineTo(canvasWidth, ctx.canvas.height); // bottom-right
    ctx.closePath();
    ctx.fill();
  }
}
