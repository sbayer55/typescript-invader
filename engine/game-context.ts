import Actor from "../actor/actor"
import KeyboardModule from "./keyboard"
import RenderEngine from "./render-engine"
import Point from './geometry/point'

type GameState = 'Running' | 'Paused'

export default class GameContext {
    public graphicContext: CanvasRenderingContext2D
    public renderEngine: RenderEngine.RenderEngine
    public lastFrame: number
    public thisFrame: number
    public delta: number
    public actors: Array<Actor>
    public state: GameState

    constructor(
        public canvas: HTMLCanvasElement,
        public keyboard: KeyboardModule.Keyboard,
    ) {
        let context = this.canvas.getContext('2d')

        if (context)
            this.graphicContext = context
        else
            throw new Error("Unable to generate 2d game context")

        this.lastFrame = new Date().getTime()
        this.thisFrame = this.lastFrame
        this.delta = 0
        this.actors = new Array()
        this.renderEngine = new RenderEngine.RenderEngine()
        this.state = 'Running'
    }

    setActors(actors: Array<Actor>): void {
        this.actors = actors
    }

    run() {
        this.lastFrame = this.thisFrame
        this.thisFrame = new Date().getTime()
        this.delta = this.thisFrame - this.lastFrame
        switch (this.state) {
            case 'Running':
                    this.actors.forEach(a => a.run(this))
                break;
            case 'Paused':
                break
            default:
                throw new Error('Unexpected game state ' + this.state)
        }
    }

    render() {
        this.renderEngine.render(this.canvas, this.graphicContext)
    }
}