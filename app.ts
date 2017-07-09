import GameContext from "./engine/game-context"
import KeyboardModule from "./engine/keyboard"
import Actor from "./actor/actor"
import KeyboardComponent from "./component/keyboard-component"
import StaticBodyComponent from "./component/static-body-component"
import RenderComponent from "./component/render-component"
import DebugComponent from "./component/debug-component"
import PhysicsComponent from "./component/physics-component"
import FireComponent from "./component/fire-component"
import Point from "./engine/geometry/point"

window.onload = () => {
    const gc = buildGameContext()

    document.addEventListener('keydown', 
        (event: KeyboardEvent) => gc.keyboard.set(<KeyboardModule.KeyName> event.key, true))
    document.addEventListener('keyup',
        (event: KeyboardEvent) => gc.keyboard.set(<KeyboardModule.KeyName> event.key, false))
    
    
    let gameLoop = setInterval(function() {
        gc.run()
        gc.render()
    }, 1000 / 30)
}

function buildGameContext() {
    const canvas = <HTMLCanvasElement> document.getElementById('gc')

    const gameContext = new GameContext(canvas, new KeyboardModule.Keyboard())
    
    const keyboardComponent = new KeyboardComponent()
    const fireComponent = new FireComponent(200)
    const playerImg = <HTMLImageElement> document.getElementById('player')
    const debugComponent = new DebugComponent()
    const playerMass = 1530
    const playerFriction = 0.002

    gameContext.setActors([
        new Actor('Player', [
            new StaticBodyComponent(new Point(250, 400)),
            new PhysicsComponent(playerMass, playerFriction),
            keyboardComponent,
            fireComponent,
            new RenderComponent(playerImg)
        ])
    ])

    return gameContext
}
