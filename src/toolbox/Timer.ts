import Layer from '@abstract/Layer';
import { Easing, fxColor, linearColor } from './FX';

export default class Timer {
    private value: any;
    private isEnded = false;

    constructor(value: any) {
        this.value = value;
    }

    animLayer(dt, layer: Layer, key, target: any, duration: number, cb?: () => void) {
        layer[key] = Easing.linear(dt, layer[key], target, duration);
        if (key === 'fillStyle') {
            const literalRGBA = fxColor.HexToRGBA(layer[key]);
            layer[key] = literalRGBA;
            layer[key] = linearColor(dt, layer[key], target, duration);
        }
        if (layer[key] == target) {
            cb && cb();
        }
    }

    wait(dt, target, duration: number, cb: () => void) {
        this.value = Easing.linear(dt, this.value, target, duration);
        if (this.value == target) {
            cb && cb();
        }
    }
}
