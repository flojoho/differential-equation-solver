import Vector from './Vector.js';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

const padding = 50;
const segments = 100;

const xMin = -2;
const xMax = 4;
const yMin = -2;
const yMax = 3;
const graphWidth = xMax - xMin;
const graphHeight = yMax - yMin;

const renderWidth = canvas.width - 2 * padding;
const renderHeight = canvas.height - 2 * padding;

const toCanvasCoordinates = (vector: Vector) => {
  const { x, y } = vector;
  const scaleX = renderWidth / (xMax - xMin);
  const scaleY = renderHeight / (yMax - yMin);
  return new Vector(
    (x - xMin) * scaleX + padding,
    canvas.height - ((y - yMin) * scaleY + padding)
  );
};

const drawLine = (vector1: Vector, vector2: Vector) => {
  const transformed1 = toCanvasCoordinates(vector1);
  const transformed2 = toCanvasCoordinates(vector2);
  ctx.moveTo(transformed1.x, transformed1.y);
  ctx.lineTo(transformed2.x, transformed2.y);
};

const moveTo = (vector: Vector) => {
  const { x, y } = toCanvasCoordinates(vector);
  ctx.moveTo(x, y);
};
const lineTo = (vector: Vector) => {
  const { x, y } = toCanvasCoordinates(vector);
  ctx.lineTo(x, y);
};

const f = (x: number) => {
  return Math.cos(x);
};

const render = () => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = 'white';
  ctx.lineWidth = 1;

  ctx.beginPath();

  const bottomLeft = (new Vector(xMin, yMin));
  const topLeft = (new Vector(xMin, yMax));
  const topRight = (new Vector(xMax, yMax));
  const bottomRight = (new Vector(xMax, yMin));

  const xAxisStart = (new Vector(xMin, 0));
  const xAxisEnd = (new Vector(xMax, 0));

  const yAxisStart = (new Vector(0, yMin));
  const yAxisEnd = (new Vector(0, yMax));

  drawLine(bottomLeft, topLeft);
  drawLine(topLeft, topRight);
  drawLine(topRight, bottomRight);
  drawLine(bottomRight, bottomLeft);

  drawLine(xAxisStart, xAxisEnd);

  drawLine(yAxisStart, yAxisEnd);

  ctx.stroke();

  ctx.lineWidth = 3;
  ctx.beginPath();
  for(let i = 0; i <= segments; i++) {
    const segmentWidth = graphWidth/segments;
    const currentX = xMin + i * segmentWidth;
    lineTo(new Vector(
      currentX,
      f(currentX)
    ));
  }
  ctx.stroke();

};

render();
