import Component from "./component"
import GameContext from "../engine/game-context"
import Actor from "../actor/actor"
import StaticBodyComponent from "./static-body-component"
import PhysicsComponent from "./physics-component"
import RenderComponent from "./render-component"
import Point from "../engine/geometry/point"

export default class FireComponent implements Component {
    static missleImg = <HTMLImageElement> document.getElementById('missile')

    private isReady: boolean
    private isActive: boolean
    private lastFired: number
    private missle: Actor

    constructor(private minDelay: number) {
        this.isReady = true
        this.isActive = false
        this.lastFired = new Date().getTime()
    }

    run(gc: GameContext, a: Actor) {
        if (!this.isReady && gc.thisFrame - this.lastFired > this.minDelay)
            this.isReady = true
        if (this.isActive) {
            for (let n = 0; n < 2; n++) {
                const pos = a.body.position.clone()
                pos.x += (25 * n) + 29
                gc.actors.push(new Actor('missle', [
                    new StaticBodyComponent(pos),
                    new PhysicsComponent(150, 0, new Point(0, -0.4)),
                    new RenderComponent(FireComponent.missleImg)
                ]))
            }

            this.isActive = false
        }
    }

    fire(gc: GameContext) {
        if (this.isReady) {
            this.isActive = true
            this.isReady = false
            this.lastFired = gc.thisFrame
        }
    }
}