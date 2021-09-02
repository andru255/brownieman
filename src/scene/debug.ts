import Layer from '@abstract/Layer';
import { GameFeatures } from '@interface/GameFeatures';
import { on } from '@toolbox/EventWrapper';
import { getIt } from '@toolbox/mousePosition';
import { rectangleShape, textShape } from '@toolbox/Shape';

export default class DebugScene extends Layer {
    mousePositionLbl = <Layer>{ x: 10, y: 50, width: 100, height: 100, font: '20px Arial' };

    start(gameFeatures: GameFeatures): void {
        this.mousePositionLbl.text = this.showMousePositionText();
        on(document, 'mousemove', (evt) => {
            const { x, y } = getIt(gameFeatures.canvas, evt);
            this.mousePositionLbl.text = this.showMousePositionText(x, y);
        });
    }
    update(gameFeatures: GameFeatures): void {}
    render(gameFeatures: GameFeatures): void {
        textShape(this.mousePositionLbl, gameFeatures);
    }

    private showMousePositionText(x = 0, y = 0): string {
        return `Mouse Position: ${x}, ${y}`;
    }
}
