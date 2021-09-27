import Layer from '@abstract/Layer';
import { Easing, fxColor, linearColor } from './FX';

export default class Timer {
    private value: any;

    constructor(value: any) {
        this.value = value;
    }

    animLayer(dt, layer: Layer, key, target: any, duration: number, cb?: () => void) {
        if (key === 'fillStyle') {
            const literalRGBA = fxColor.HexToRGBA(layer[key]);
            const targetLiteralRGBA = fxColor.HexToRGBA(target);
            const literalRGBAResult = linearColor(dt, literalRGBA, targetLiteralRGBA, duration);
            layer[key] = fxColor.RGBAtoHEX(literalRGBAResult);
            return;
        }
        layer[key] = Easing.linear(dt, layer[key], target, duration);
        if (Math.ceil(layer[key]) == target) {
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
