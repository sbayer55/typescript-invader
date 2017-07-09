import GameContext from "../engine/game-context"
import Actor from "../actor/actor"

export interface Component {
    run(gc: GameContext, a: Actor): void
}

export default Component
