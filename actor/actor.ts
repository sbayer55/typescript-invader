import GameContext from "../engine/game-context"
import Component from "../component/component"
import StaticBodyComponent from "../component/static-body-component"
import PhysicsComponent from "../component/physics-component"

export default class Actor {
    static GlobalID = 0

    public name: string
    public components: Array<Component>
    public body?: StaticBodyComponent
    public physics?: PhysicsComponent

    constructor(name?: string, components?: Array<Component>) {
        this.name = name ? name : 'Actor' + (++Actor.GlobalID)
        this.components = components ? components : new Array()
        this.components.forEach(this.registerKeyComponent.bind(this))
    }

    private registerKeyComponent(c: Component): void {
        if (c instanceof StaticBodyComponent)
            this.body = c
        else if (c instanceof PhysicsComponent)
            this.physics = c
        else
            console.log(c, 'of type', typeof(c), 'is not a key component')
    }

    addComponent(c: Component) {
        this.components.push(c)
        this.registerKeyComponent(c)
    }

    getComponent(componentClass: any) {
        return this.components.find(c => c instanceof componentClass)
    }

    forComponent<T extends Component>(componentClass: any, cb: (c: T) => void) {
        this.components.forEach(c => {
            if (c instanceof componentClass)
                cb(<T> c)
        })
    }

    run(gs: GameContext): void {
        this.components.forEach(c => c.run(gs, this))
    }
}