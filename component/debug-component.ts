import Component from "./component"
import GameContext from "../engine/game-context"
import Actor from "../actor/actor"

export default class DebugComponent implements Component {
    run(gc: GameContext, a: Actor): void {
        console.log('Debugging: --', a.name, '--')
        console.log('\tComponents:', a.components)
        console.log('\tContext:', gc)
    }
}