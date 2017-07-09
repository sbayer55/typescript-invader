
export namespace KeyboardModule {
export type KeyName = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight' | 'f' | 'g' | 'h' | ' ' | 'Alt' | 'Meta' | 'Shift'

export class Keyboard {
    private keys: Dictionary<boolean>

    constructor() {
        this.keys = {}
    }

    get(keyName: KeyName): boolean {
        return this.keys[keyName]
    }

    set(keyName: KeyName, value: boolean): void {
        // console.log('Set key', keyName)
        this.keys[keyName] = value
    }
}
}

export default KeyboardModule