
export default class Vector {
  public x: number
  public y: number

  constructor(initialX: number, initialY: number) {
    this.x = initialX;
    this.y = initialY;
  }

  dot(vector: Vector) {
    const { x, y } = vector;
    return this.x * x + this.y * y;
  }

  plus(vector: Vector) {
    const { x, y } = vector;
    return new Vector(
      this.x + x,
      this.y + y
    );
  }

  to(vector: Vector) {
    const { x, y } = vector;
    return new Vector(
      x - this.x,
      y - this.y
    );
  }

  set(vector: Vector) {
    const { x, y } = vector;
    this.x = x;
    this.y = y;
  }

  times(factor: number) {
    this.x *= factor;
    this.y *= factor;
    return this;
  }

  toArray() {
    return [this.x, this.y];
  }
}
