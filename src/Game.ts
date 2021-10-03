import Layer from '@abstract/Layer';
import { GameFeatures } from '@interface/GameFeatures';

export default class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    mainLayer: Layer;
    isPaused = false;
    //animation vars
    dt: number = 1 / 60;

    constructor(canvasId: string, mainLayer: Layer) {
        this.canvas = <HTMLCanvasElement>document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.mainLayer = mainLayer;

        window.addEventListener('focus', () => {
            this.resume();
        });
        window.addEventListener('blur', () => {
            this.pause();
        });
    }

    getFeatures(): GameFeatures {
        return {
            dt: this.dt,
            canvas: this.canvas,
            ctx: this.ctx,
            resume: () => {
                this.resume();
            },
            pause: () => {
                this.pause();
            },
            isMob: () => {
                return this.isMob();
            },
        };
    }

    setup() {
        this.mainLayer.start(this.getFeatures());
        this.loop();
    }

    loop() {
        requestAnimationFrame(this.loop.bind(this));
        if (this.isPaused) {
            return;
        }
        this.mainLayer.update(this.getFeatures());
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.mainLayer.render(this.getFeatures());
    }

    resume() {
        this.isPaused = false;
    }

    pause() {
        this.isPaused = true;
    }

    isMob(): boolean {
        return navigator.userAgent.match(/andro|ipho|ipa|ipo/i) !== null;
    }
}
