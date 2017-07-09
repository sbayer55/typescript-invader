export default class Point {

    static zero(): Point {
        return new Point()
    }
    
    static one(): Point {
        return new Point(1, 1)
    }

    constructor(public x = 0, public y = 0) {}

    magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    normalize(): Point {
        const mag = this.magnitude()
        return new Point(this.x / mag, this.y / mag)
    }

    clone() {
        return new Point(this.x, this.y)
    }

    zero() {
        this.x = 0
        this.y = 0
    }

    add(p: Point) {
        this.x += p.x
        this.y += p.y
    }

    sub(p: Point) {
        this.x -= p.x
        this.y -= p.y
    }

    mul(p: Point) {
        this.x *= p.x
        this.y *= p.y
    }

    div(p: Point) {
        this.x /= p.x
        this.y /= p.y
    }
}