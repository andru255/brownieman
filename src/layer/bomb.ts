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
    isExpanded: boolean;
    levelExpand: number = 3;

    start(gameFeatures: GameFeatures): void {
        this.isExpanded = true;
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
    }

    update(gameFeatures: GameFeatures): void {
        if (this.isExpanded) {
            this.isExpanded = false;
        }
    }

    render(gameFeatures: GameFeatures): void {
        rectangleShape(this, gameFeatures);
        this.wave.filter((w) => w !== undefined).forEach((w) => rectangleShape(w, gameFeatures));
    }

    // set position
    public sP(l: Layer) {
        return { x: l.x + Config.UNIT, y: l.y + Config.UNIT };
    }

    public pExp(ls: Layer[]): Layer[] {
        const _lg = [];
        ls.forEach((l) => {
            console.log('gpos', l.shared.gpos);
        });
        return _lg;
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
