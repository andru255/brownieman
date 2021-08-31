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
    levelExpand: number = 3;
    timeout: number = 0;
    timeliveExpanded = 0;

    dt: number = 0;
    timer = 1000; // milliseconds

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
            const bl = <Layer>{ width: this.width, height: this.height, fillStyle: '#f00' };
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
            //if (!this.timeliveExpanded) {
            //    this.timeliveExpanded = this.timeout + dt + 500 / 1000;
            //}
            this.isExpanded = false;
        }

        //if (this.timeliveExpanded - dt <= 0) {
        //    console.log('remove it!');
        //    this.isExpanded = false;
        //    this.width = 0;
        //    this.height = 0;
        //}
    }

    render(gameFeatures: GameFeatures): void {
        rectangleShape(this, gameFeatures);
        this.wave.filter((w) => w !== undefined).forEach((w) => rectangleShape(w, gameFeatures));
    }

    // set position
    public sP(l: Layer) {
        return { x: l.x + Config.UNIT, y: l.y + Config.UNIT };
    }

    public expand(index) {
        let loopExp = [...Array(this.levelExpand).keys()];
        if (index === 0) {
            loopExp.forEach((l) => {
                this.wave.push(
                    <Layer>{
                        width: this.width,
                        height: this.height,
                        x: this.wave[0].x,
                        y: this.wave[0].y - this.height * l - Config.UNIT * 2 * l,
                        fillStyle: '#ffff00',
                    } // TOP
                );
            });
        }
        if (index === 1) {
            loopExp.forEach((l) => {
                this.wave.push(
                    <Layer>{
                        width: this.width,
                        height: this.height,
                        x: this.wave[1].x,
                        y: this.wave[1].y + this.height * l + Config.UNIT * 2 * l,
                        fillStyle: '#ffff00',
                    } // BOTTOM
                );
            });
        }
        if (index === 2) {
            loopExp.forEach((l) => {
                this.wave.push(
                    <Layer>{
                        width: this.width,
                        height: this.height,
                        x: this.wave[2].x - this.width * l - Config.UNIT * 2 * l,
                        y: this.wave[2].y,
                        fillStyle: '#ffff00',
                    } // LEFT
                );
            });
        }
        if (index === 3) {
            loopExp.forEach((l) => {
                this.wave.push(
                    <Layer>{
                        width: this.width,
                        height: this.height,
                        x: this.wave[3].x + this.width * l + Config.UNIT * 2 * l,
                        y: this.wave[3].y,
                        fillStyle: '#ffff00',
                    } // RIGHT
                );
            });
        }
    }
}
