import Layer from '@abstract/Layer';
import { GameFeatures } from '@interface/GameFeatures';

export default class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    mainLayer: Layer;
    isOff: Boolean = false;
    draw: () => void;
    //animation vars
    animLoop: number;
    accumulator: number = 0;
    delta: number = 1e3 / 60;
    step: number = 1 / 60;
    last: number = 0;
    now: number;
    dt: number = 0;

    constructor(canvasId: string, mainLayer: Layer) {
        this.canvas = <HTMLCanvasElement>document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.mainLayer = mainLayer;
    }

    getFeatures() {
        return {
            dt: this.accumulator,
            step: this.step,
            canvas: this.canvas,
            ctx: this.ctx,
            on: () => this.on(),
            off: () => this.off(),
            isMob: () => this.isMob(),
        };
    }

    setup() {
        this.draw = () => {
            this.animLoop = window.requestAnimationFrame(this.draw);
            this.now = performance.now();
            this.dt = this.now - this.last;
            this.last = this.now;
            if (this.dt > 1e3) {
                return;
            }
            this.accumulator += this.dt;
            while (this.accumulator >= this.delta) {
                this.mainLayer.update(this.getFeatures());
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.mainLayer.render(this.getFeatures());
                this.accumulator -= this.delta;
            }
        };
        this.mainLayer.start(this.getFeatures());
    }

    on() {
        if (this.isOff) {
            this.isOff = false;
        }
        this.draw();
    }

    off() {
        this.isOff = true;
        window.cancelAnimationFrame(this.animLoop);
    }

    isMob(): boolean {
        return navigator.userAgent.match(/andro|ipho|ipa|ipo/i) !== null;
    }
}
