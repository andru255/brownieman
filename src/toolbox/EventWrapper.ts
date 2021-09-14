export enum KeyName {
    ARROW_UP = 38,
    ARROW_DOWN = 40,
    ARROW_RIGHT = 39,
    ARROW_LEFT = 37,
    ENTER = 13,
    ESC = 27,
    SBAR = 32,
    D = 68, // ATTACK BOMB
    F = 70, // AUX OPT
}

const pattern = /([a-z]+)\.?(.*)?/;
const isUndefined = (value) => value === undefined;
const evts = {};

export function on(target: EventTarget, name, event: (evt?) => void) {
    const m = name.match(pattern);
    if (!isUndefined(m)) {
        evts[name] = (c) => event(c);
        let e = m[1];
        target.addEventListener(m[1], evts[name], false);
    }
}

export function off(target: EventTarget, name) {
    const _n = evts[name];
    const m = name.match(pattern);
    if (!isUndefined(m) && !isUndefined(_n)) {
        let e = m[1];
        Reflect.deleteProperty(evts, e);
        target.removeEventListener(e, _n, false);
    }
}

export function once(target: EventTarget, name, event: (evt?) => void) {
    const m = name.match(pattern);
    if (!isUndefined(m)) {
        evts[name] = (c) => {
            event(c);
            off(target, name);
        };
        target.addEventListener(m[1], evts[name], false);
    }
}
