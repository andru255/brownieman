import Layer from '@abstract/Layer';
import { GameFeatures } from '@interface/GameFeatures';
import { rectangleShape } from '@toolbox/Shape';
import padMobileLayer from '../layer/padMobile';

export default class MainLayer extends Layer {
    x = 10;
    y = 10;
    width = 20;
    height = 20;

    paddleMobile = new padMobileLayer();

    start(gameFeatures: GameFeatures): void {
        console.log('Great!', gameFeatures);
        gameFeatures.on();
        if (gameFeatures.isMob()) {
            this.paddleMobile.start(gameFeatures);
        }
    }
    update(gameFeatures: GameFeatures): void {}
    render(gameFeatures: GameFeatures): void {
        rectangleShape(this, gameFeatures);
        if (gameFeatures.isMob()) {
            this.paddleMobile.render(gameFeatures);
        }
    }
}
