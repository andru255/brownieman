import Layer from '@abstract/Layer';
import { GameFeatures } from '@interface/GameFeatures';
import { imgShape, rectangleShape } from '@toolbox/Shape';
import Config from 'src/Config';
import { ArrowGraphic } from 'src/graphic/arrow';

export default class padMobileLayer extends Layer {
    controls = [];
    start(gameFeatures: GameFeatures): void {
        this.width = gameFeatures.canvas.width;
        this.height = Config.PAD_VIEWPORT_HEIGHT;
        this.x = 0;
        this.y = gameFeatures.canvas.height - Config.PAD_VIEWPORT_HEIGHT;
        this.fillStyle = '#0000ff';
    }
    update(gameFeatures: GameFeatures): void {}
    render(gameFeatures: GameFeatures): void {
        this.start(gameFeatures);
        rectangleShape(this, gameFeatures);
        this.buildControls(gameFeatures);
    }

    private buildControls(gf: GameFeatures) {
        let topArrow = <Layer>{ fillStyle: '#000', x: this.x, y: this.y, width: 100, height: 100 };
        topArrow.img = ArrowGraphic(topArrow);
        imgShape(topArrow, gf);
    }
}
