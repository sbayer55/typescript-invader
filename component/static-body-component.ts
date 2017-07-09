import Component from "./component"
import GameContext from "../engine/game-context"
import Actor from "../actor/actor"
import Point from "../engine/geometry/point"

export default class StaticBodyComponent implements Component {
    constructor(public position = new Point()) {}

    run(gc: GameContext, a: Actor) {}
}