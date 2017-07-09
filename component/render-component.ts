import GameContext from "../engine/game-context"
import Actor from "../actor/actor"
import Component from "./component"
import StaticBodyComponent from "./static-body-component"
import RenderEngine from "../engine/render-engine"
import Point from "../engine/geometry/point"

export default class RenderComponent implements Component {
    private renderable: RenderEngine.Renderable
    constructor(public img: HTMLImageElement) {
        this.renderable = {img: img, pos: new Point()}
    }

    run(gc: GameContext, a: Actor) {
        this.renderable.pos = a.body.position
        gc.renderEngine.add(this.renderable)
    }
}