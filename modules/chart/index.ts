import Vector from '../Vector.js';

const f = (x: number) => {
  return Math.cos(x);
};

const padding = 50;
const segments = 100;

class Chart {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private xMin: number;
  private xMax: number;
  private yMin: number;
  private yMax: number;
  
  constructor(parentElement: HTMLElement, xMin: number, xMax: number, yMin: number, yMax: number) {
    this.xMin = xMin;
    this.xMax = xMax;
    this.yMin = yMin;
    this.yMax = yMax;
    
    this.canvas = document.createElement('canvas');
    this.canvas.width = 1000;
    this.canvas.height = 700;
    parentElement.appendChild(this.canvas);

    this.ctx = this.canvas.getContext('2d')!;

    this.render();
  }
  
  drawLine (vector1: Vector, vector2: Vector) {
    const transformed1 = this.toCanvasCoordinates(vector1);
    const transformed2 = this.toCanvasCoordinates(vector2);
    this.ctx.moveTo(transformed1.x, transformed1.y);
    this.ctx.lineTo(transformed2.x, transformed2.y);
  }

  moveTo (vector: Vector) {
    const { x, y } = this.toCanvasCoordinates(vector);
    this.ctx.moveTo(x, y);
  }

  lineTo (vector: Vector) {
    const { x, y } = this.toCanvasCoordinates(vector);
    this.ctx.lineTo(x, y);
  }

  toCanvasCoordinates(vector: Vector) {
    const renderWidth = this.canvas.width - 2 * padding;
    const renderHeight = this.canvas.height - 2 * padding;

    const { x, y } = vector;
    const scaleX = renderWidth / (this.xMax - this.xMin);
    const scaleY = renderHeight / (this.yMax - this.yMin);
    return new Vector(
      (x - this.xMin) * scaleX + padding,
      this.canvas.height - ((y - this.yMin) * scaleY + padding)
    );
  }

  drawCoordinateSystem() {
    this.ctx.strokeStyle = 'white';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();

    const bottomLeft = new Vector(this.xMin, this.yMin);
    const topLeft = new Vector(this.xMin, this.yMax);
    const topRight = new Vector(this.xMax, this.yMax);
    const bottomRight = new Vector(this.xMax, this.yMin);

    const xAxisStart = new Vector(this.xMin, 0);
    const xAxisEnd = new Vector(this.xMax, 0);

    const yAxisStart = new Vector(0, this.yMin);
    const yAxisEnd = new Vector(0, this.yMax);

    this.drawLine(bottomLeft, topLeft);
    this.drawLine(topLeft, topRight);
    this.drawLine(topRight, bottomRight);
    this.drawLine(bottomRight, bottomLeft);

    this.drawLine(xAxisStart, xAxisEnd);

    this.drawLine(yAxisStart, yAxisEnd);

    this.ctx.stroke();
  }

  render() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawCoordinateSystem();

    const graphWidth = this.xMax - this.xMin;
    const graphHeight = this.yMax - this.yMin;

    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    for(let i = 0; i <= segments; i++) {
      const segmentWidth = graphWidth/segments;
      const currentX = this.xMin + i * segmentWidth;
      this.lineTo(new Vector(
        currentX,
        f(currentX)
      ));
    }
    this.ctx.stroke();
  }
}

export default Chart;
