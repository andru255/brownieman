import Layer from '@abstract/Layer';
import { GameFeatures } from '@interface/GameFeatures';
import { imgShape, rectangleShape } from '@toolbox/Shape';
import Config from 'src/Config';
import { ArrowGraphic } from 'src/graphic/arrow';
import ButtonLayer from './button';

export default class padMobileLayer extends Layer {
    controls = [];
    btnDemo = new ButtonLayer();
    start(gameFeatures: GameFeatures): void {
        this.width = gameFeatures.canvas.width;
        this.height = Config.PAD_VIEWPORT_HEIGHT;
        this.x = 0;
        this.y = gameFeatures.canvas.height - Config.PAD_VIEWPORT_HEIGHT;
        console.log('gameFeatures.canvas.height', gameFeatures.canvas.height);
        console.log('y', this.y);
        this.fillStyle = '#fff';

        this.btnDemo.id = 'demo';
        this.btnDemo.x = this.x + Config.CELL_SIZE * 2;
        this.btnDemo.y = this.y + Config.CELL_SIZE * 2;
        this.btnDemo.width = 200;
        this.btnDemo.height = 200;
        this.btnDemo.on('click', (evt) => {});
        this.btnDemo.start(gameFeatures);
    }
    update(gameFeatures: GameFeatures): void {}
    render(gameFeatures: GameFeatures): void {
        rectangleShape(this, gameFeatures);
        this.buildControls(gameFeatures);
        this.btnDemo.render(gameFeatures);
    }

    private buildControls(gf: GameFeatures) {
        [
            <Layer>{
                // top
                fillStyle: '#000',
                x: this.x + 100,
                y: this.y + 50,
                width: 50,
                height: 50,
                rotation: 0 * (Math.PI / 180),
            },
            <Layer>{
                // bottom
                fillStyle: '#000',
                x: this.x + 100,
                y: this.y + 150,
                width: 50,
                height: 50,
                rotation: 180 * (Math.PI / 180),
            },
            <Layer>{
                // left
                fillStyle: '#000',
                x: this.x + 50,
                y: this.y + 100,
                width: 50,
                height: 50,
                rotation: -90 * (Math.PI / 180),
            },
            <Layer>{
                // right
                fillStyle: '#000',
                x: this.x + 150,
                y: this.y + 100,
                width: 50,
                height: 50,
                rotation: 90 * (Math.PI / 180),
            },
        ].forEach((arrow) => {
            arrow.img = ArrowGraphic(arrow);
            imgShape(arrow, gf);
        });
        //const debug = { ...topArrow, fillStyle: '#f00' };
        //rectangleShape(debug, gf);
    }
}
