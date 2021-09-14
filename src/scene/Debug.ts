import Layer from '@abstract/Layer';
import { GameFeatures } from '@interface/GameFeatures';
import { on } from '@toolbox/EventWrapper';
import { getIt } from '@toolbox/MousePosition';
import { imgShape, rectangleShape, textShape } from '@toolbox/Shape';
import Config from 'src/Config';
import { CircleGraphic } from 'src/graphic/Circle';

export default class DebugScene extends Layer {
    mousePositionLbl = <Layer>{ x: 10, y: 50, width: 100, height: 100, font: '20px Arial' };

    keyPressBox = <Layer>{
        x: 0,
        y: 0,
        width: Config.UNIT * 6,
        height: Config.UNIT * 6,
        font: `${Config.UNIT}px Arial`,
        fillStyle: '#ddd',
    };

    start(gameFeatures: GameFeatures): void {
        this.mousePositionLbl.text = this.showMousePositionText();
        on(document, 'mousemove', (evt) => {
            const { x, y } = getIt(gameFeatures.canvas, evt);
            this.mousePositionLbl.text = this.showMousePositionText(x, y);
        });
        this.resize(gameFeatures);
    }

    update(gameFeatures: GameFeatures): void {
        this.resize(gameFeatures);
    }

    render(gameFeatures: GameFeatures): void {
        //rectangleShape(this.keyPressBox, gameFeatures);
        // textShape(this.mousePositionLbl, gameFeatures);
    }

    private showMousePositionText(x = 0, y = 0): string {
        return `Mouse Position: ${x}, ${y}`;
    }

    private resize(gameFeatures: GameFeatures) {
        this.mousePositionLbl.x = gameFeatures.viewport.x + Config.UNIT * 3;

        this.keyPressBox.x = gameFeatures.viewport.x + gameFeatures.viewport.width / 2 - this.keyPressBox.width / 2;
        this.keyPressBox.y = gameFeatures.viewport.y + gameFeatures.viewport.height / 2 - this.keyPressBox.height / 2;
        this.width = gameFeatures.viewport.cellSize;
    }
}
