import GameContext from "../engine/game-context"
import Actor from "../actor/actor"
import Component from './component'
import Point from '../engine/geometry/point'
import StaticBodyComponent from './static-body-component'

export default class PhysicsComponent implements Component {
    public impulse: Point
    constructor(
        public mass: number,
        public friction: number,
        public velocity: Point = Point.zero()
    ) {
        this.impulse = Point.zero()
    }

    addForce(force: number, radians: number) {
        this.impulse.x += Math.cos(radians) * force
        this.impulse.y += Math.sin(radians) * force
    }

    run(gc: GameContext, a: Actor): void {
        this.impulse.x /= this.mass
        this.impulse.y /= this.mass

        this.velocity.add(this.impulse)
        this.velocity.x -= this.velocity.x * (this.friction * gc.delta)
        this.velocity.y -= this.velocity.y * (this.friction * gc.delta)

        if (this.velocity.magnitude() < this.friction)
            this.velocity.zero()

        a.body.position.x += this.velocity.x * gc.delta
        a.body.position.y += this.velocity.y * gc.delta

        this.impulse.zero()
    }
}