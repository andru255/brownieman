import Layer from '@abstract/Layer';
import { GameFeatures } from '@interface/GameFeatures';
import { rectangleShape } from '@toolbox/Shape';
import Config from 'src/Config';

export default class BombLayer extends Layer {
    width = Config.CELL_SIZE - Config.CELL_SIZE / 10;
    height = Config.CELL_SIZE - Config.CELL_SIZE / 10;
    x = Config.CELL_SIZE * 3 + 5;
    y = Config.CELL_SIZE * 3 + 5;
    wave: Layer[] = [];
    //shared
    isExpanded: boolean;
    levelExpand: number = 7;

    start(gameFeatures: GameFeatures): void {
        this.isExpanded = true;
        this.wave = [
            <Layer>{
                width: this.width,
                height: this.height,
                x: this.x,
                y: this.y - this.height - 5,
                fillStyle: '#ff0000',
            }, // TOP
            <Layer>{
                width: this.width,
                height: this.height,
                x: this.x,
                y: this.y + this.height + 5,
                fillStyle: '#ff0000',
            }, // BOTTOM
            <Layer>{
                width: this.width,
                height: this.height,
                x: this.x - this.width - 5,
                y: this.y,
                fillStyle: '#ff0000',
            }, // LEFT
            <Layer>{
                width: this.width,
                height: this.height,
                x: this.x + this.width + 5,
                y: this.y,
                fillStyle: '#ff0000',
            }, // RIGHT
        ];
    }

    update(gameFeatures: GameFeatures): void {
        if (this.isExpanded) {
            //this.wave.forEach((w, index) => {
            //    if (w !== undefined) {
            //        this.expand(index);
            //    }
            //});
            //console.log('update!');
            this.isExpanded = false;
        }
    }

    render(gameFeatures: GameFeatures): void {
        rectangleShape(this, gameFeatures);
        this.wave.filter((w) => w !== undefined).forEach((w) => rectangleShape(w, gameFeatures));
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
                        y: this.wave[0].y - this.height * l - 5 * l,
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
                        y: this.wave[1].y + this.height * l + 5 * l,
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
                        x: this.wave[2].x - this.width * l - 5 * l,
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
                        x: this.wave[3].x + this.width * l + 5 * l,
                        y: this.wave[3].y,
                        fillStyle: '#ffff00',
                    } // RIGHT
                );
            });
        }
    }
}
