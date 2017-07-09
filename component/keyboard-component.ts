import GameContext from "../engine/game-context"
import Actor from "../actor/actor"
import Component from "./component"
import FireComponent from "./fire-component"

export default class KeyboardComponent implements Component {
    private force: number

    constructor() {
        this.force = 100
    }

    run(gc: GameContext, a: Actor) {
        if (gc.keyboard.get('ArrowLeft'))
            a.physics.impulse.x -= this.force

        if (gc.keyboard.get('ArrowRight'))
            a.physics.impulse.x += this.force

        if (gc.keyboard.get('ArrowUp'))
            a.physics.impulse.y -= this.force

        if (gc.keyboard.get('ArrowDown'))
            a.physics.impulse.y += this.force
        
        if (gc.keyboard.get('f')) {
            this.force += 10
            console.log('Force:', this.force)
        }
        if (gc.keyboard.get('g')) {
            this.force += 100
            console.log('Force:', this.force)
        }
        if (gc.keyboard.get('h')) {
            this.force += 1000
            console.log('Force:', this.force)
        }
        if (gc.keyboard.get(' '))
            a.forComponent<FireComponent>(FireComponent, c => c.fire(gc))
    }
}