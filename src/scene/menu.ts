import Layer from '@abstract/Layer';
import { GameFeatures } from '@interface/GameFeatures';
import { rectangleShape } from '@toolbox/Shape';

export default class MenuScene extends Layer {
    start(gameFeatures: GameFeatures): void {
        console.log('Great!', gameFeatures);
    }
    update(gameFeatures: GameFeatures): void {}
    render(gameFeatures: GameFeatures): void {
        rectangleShape(this, gameFeatures);
    }
}
