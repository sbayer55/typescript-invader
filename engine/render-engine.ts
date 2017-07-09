import Point from "./geometry/point"

export namespace RenderEngine {
export interface Renderable {
    img: HTMLImageElement,
    pos: Point
}

export class RenderEngine {
    public renderables: Array<Renderable>

    constructor() {
        this.renderables = new Array()
    }

    add(r: Renderable) {
        this.renderables.push(r)
    }

    render(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        const buffer = this.renderables
        this.renderables = new Array()

        context.fillStyle = 'black'
        context.fillRect(0, 0, canvas.width, canvas.width)

        buffer.forEach(r => 
            context.drawImage(r.img, r.pos.x, r.pos.y)
        )
    }
}
}

export default RenderEngine