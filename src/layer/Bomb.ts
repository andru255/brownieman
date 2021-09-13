import Layer from '@abstract/Layer';
import { GameFeatures } from '@interface/GameFeatures';
import { rectangleShape } from '@toolbox/Shape';
import Config from 'src/Config';

export default class BombLayer extends Layer {
    width = Config.CELL_SIZE - Config.CELL_SIZE / Config.UNIT;
    height = Config.CELL_SIZE - Config.CELL_SIZE / Config.UNIT;
    //x = Config.CELL_SIZE * 2 + 4;
    //y = Config.CELL_SIZE * 2 + 4;
    wave: Layer[] = [];
    //shared
    isExpanded: boolean = false;
    rm = false; // remove it!
    levelExpand: number = 3;
    timeout: number = 0;
    bombExpanded = { t: false, tt: 0 };
    dt: number = 0;
    timer = 1500; // milliseconds

    start(gameFeatures: GameFeatures): void {}

    update(gameFeatures: GameFeatures): void {
        const { dt } = gameFeatures;
        if (!this.timeout) {
            this.timeout = dt + this.timer / 1000;
        }

        if (this.timeout - dt <= 0) {
            this.isExpanded = true;
        }

        if (this.isExpanded) {
            const bl = <Layer>{
                width: this.width,
                height: this.height,
                fillStyle: '#f00',
                collideWith: this.collideWith,
            };
            this.wave = [
                {
                    ...bl,
                    x: this.x,
                    y: this.y - this.height - Config.UNIT * 2,
                }, // TOP
                {
                    ...bl,
                    x: this.x,
                    y: this.y + this.height + Config.UNIT * 2,
                }, // BOTTOM
                {
                    ...bl,
                    x: this.x - this.width - Config.UNIT * 2,
                    y: this.y,
                }, // LEFT
                {
                    ...bl,
                    x: this.x + this.width + Config.UNIT * 2,
                    y: this.y,
                }, // RIGHT
            ];
            if (!this.bombExpanded.t) {
                this.bombExpanded.t = true;
                this.bombExpanded.tt = dt + 200 / 1000;
            }
        }

        if (this.bombExpanded.t) {
            if (this.bombExpanded.tt - dt <= 0) {
                this.rm = true;
                this.bombExpanded.t = false;
            }
        }
    }

    render(gameFeatures: GameFeatures): void {
        rectangleShape(this, gameFeatures);
        this.wave.filter((w) => w !== undefined).forEach((w) => rectangleShape(w, gameFeatures));
    }

    // set position
    public sP(l: Layer) {
        return { x: l.x, y: l.y };
    }

    public expand(index) {
        let loopExp = [...Array(this.levelExpand).keys()];
        const bl = <Layer>{ width: this.width, height: this.height, collideWith: this.collideWith, fillStyle: '#ff0' };
        if (index === 0) {
            loopExp.forEach((l) => {
                this.wave.push(
                    <Layer>{
                        ...bl,
                        x: this.wave[0].x,
                        y: this.wave[0].y - this.height * l - Config.UNIT * 2 * l,
                    } // TOP
                );
            });
        }
        if (index === 1) {
            loopExp.forEach((l) => {
                this.wave.push(
                    <Layer>{
                        ...bl,
                        x: this.wave[1].x,
                        y: this.wave[1].y + this.height * l + Config.UNIT * 2 * l,
                    } // BOTTOM
                );
            });
        }
        if (index === 2) {
            loopExp.forEach((l) => {
                this.wave.push(
                    <Layer>{
                        ...bl,
                        x: this.wave[2].x - this.width * l - Config.UNIT * 2 * l,
                        y: this.wave[2].y,
                    } // LEFT
                );
            });
        }
        if (index === 3) {
            loopExp.forEach((l) => {
                this.wave.push(
                    <Layer>{
                        ...bl,
                        x: this.wave[3].x + this.width * l + Config.UNIT * 2 * l,
                        y: this.wave[3].y,
                    } // RIGHT
                );
            });
        }
    }
}
