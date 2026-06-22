export default class Vector {
    constructor(initialX, initialY) {
        this.x = initialX;
        this.y = initialY;
    }
    dot(vector) {
        const { x, y } = vector;
        return this.x * x + this.y * y;
    }
    plus(vector) {
        const { x, y } = vector;
        return new Vector(this.x + x, this.y + y);
    }
    to(vector) {
        const { x, y } = vector;
        return new Vector(x - this.x, y - this.y);
    }
    set(vector) {
        const { x, y } = vector;
        this.x = x;
        this.y = y;
    }
    times(factor) {
        this.x *= factor;
        this.y *= factor;
        return this;
    }
    toArray() {
        return [this.x, this.y];
    }
}
