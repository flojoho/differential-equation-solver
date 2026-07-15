import Vector from '../Vector.js';
const padding = 50;
class Chart {
    constructor(parentElement, points, xMin, xMax, yMin, yMax) {
        this.xMin = xMin;
        this.xMax = xMax;
        this.yMin = yMin;
        this.yMax = yMax;
        this.points = points;
        this.canvas = document.createElement('canvas');
        this.canvas.width = 1000;
        this.canvas.height = 700;
        parentElement.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.render();
    }
    drawLine(vector1, vector2) {
        const transformed1 = this.toCanvasCoordinates(vector1);
        const transformed2 = this.toCanvasCoordinates(vector2);
        this.ctx.moveTo(transformed1.x, transformed1.y);
        this.ctx.lineTo(transformed2.x, transformed2.y);
    }
    moveTo(vector) {
        const { x, y } = this.toCanvasCoordinates(vector);
        this.ctx.moveTo(x, y);
    }
    lineTo(vector) {
        const { x, y } = this.toCanvasCoordinates(vector);
        this.ctx.lineTo(x, y);
    }
    toCanvasCoordinates(vector) {
        const renderWidth = this.canvas.width - 2 * padding;
        const renderHeight = this.canvas.height - 2 * padding;
        const { x, y } = vector;
        const scaleX = renderWidth / (this.xMax - this.xMin);
        const scaleY = renderHeight / (this.yMax - this.yMin);
        return new Vector((x - this.xMin) * scaleX + padding, this.canvas.height - ((y - this.yMin) * scaleY + padding));
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
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        for (const point of this.points) {
            this.lineTo(point);
        }
        this.ctx.stroke();
    }
}
export default Chart;
