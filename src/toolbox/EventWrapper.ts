export enum KeyName {
    ARROW_UP = 38,
    ARROW_DOWN = 40,
    ARROW_RIGHT = 39,
    ARROW_LEFT = 37,
    ENTER = 13,
    ESC = 27,
    SBAR = 32,
    D = 68, // ATTACK BOMB
}
export function on(target, eventName, event: (evt?) => void) {
    target.addEventListener(eventName, event, false);
}
