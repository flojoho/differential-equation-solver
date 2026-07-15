import Chart from './chart/index.js';
import Vector from './Vector.js';

const segments = 100;

const main = document.getElementById('main') as HTMLDivElement;

const xMin = -2;
const xMax = 4;
const yMin = -2;
const yMax = 3;

const f = (x: number) => {
  return Math.cos(x);
};

const graphWidth = xMax - xMin;
const graphHeight = yMax - yMin;

const points: Vector[] = [];
for(let i = 0; i <= segments; i++) {
  const segmentWidth = graphWidth/segments;
  const x = xMin + i * segmentWidth;
  points.push(new Vector(
    x,
    f(x)
  ));
}

const graph = new Chart(main, points, xMin, xMax, yMin, yMax);
