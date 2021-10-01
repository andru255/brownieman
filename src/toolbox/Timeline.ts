import Layer from '@abstract/Layer';
import { GameFeatures } from '@interface/GameFeatures';
import { Tween } from '@interface/Tween';
import { Easing, fxColor, linearColor } from './FX';

interface Task {
    id?: string;
    init: () => void;
}
export default class Timeline {
    private dt;
    private tasks: Task[] = [];
    private ids: string[] = [];
    private evts: any = {};

    constructor(gameFeatures: GameFeatures) {
        this.dt = gameFeatures.step;
    }

    animLayer(layer: Layer, key, target: any, duration: number) {
        if (key === 'fillStyle') {
            const literalRGBA = fxColor.HexToRGBA(layer[key]);
            const targetLiteralRGBA = fxColor.HexToRGBA(target);
            const literalRGBAResult = linearColor(this.dt, literalRGBA, targetLiteralRGBA, duration);
            layer[key] = fxColor.RGBAtoHEX(literalRGBAResult);
            return;
        }
        layer[key] = Easing.linear(this.dt, layer[key], target, duration);
    }

    reset() {
        this.ids = [];
        this.tasks = [];
    }

    add(tween: Tween) {
        if (this.ids.some((id) => id == tween.id)) {
            return;
        }
        const task = {
            id: tween.id,
            init: () => {
                this.animLayer(tween.layer, tween.property, tween.target, tween.duration);
                if (tween.layer[tween.property] == tween.target) {
                    this.evts[`${tween.id}:end`] && this.evts[`${tween.id}:end`]();
                    this.tasks.shift();
                    this.play();
                }
            },
        };
        this.ids.push(task.id);
        this.tasks.push(task);
    }

    pause(duration) {
        let value = 0;
        this.tasks.push({
            init: () => {
                value = Easing.linear(this.dt, value, duration, duration);
                if (value == duration) {
                    this.tasks.shift();
                    this.play();
                }
            },
        });
    }

    once(event: string, cb: () => void) {
        if (this.evts[event] !== undefined) {
            return;
        }
        this.evts[event] = cb;
        if (event === 'end') {
            this.evts[event] = {};
            this.evts[event]['cb'] = cb;
            this.evts[event]['hasStarted'] = false;
        }
    }

    play() {
        if (this.tasks.length) {
            this.tasks[0].init();
            return;
        }
        if (this.evts['end'] !== undefined) {
            if (!this.evts['end']['hasStarted']) {
                this.evts['end']['hasStarted'] = true;
                this.evts['end']['cb']();
            }
        }
    }
}
