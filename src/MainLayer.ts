import Layer from '@abstract/Layer';
import { GameFeatures } from '@interface/GameFeatures';
import padMobileLayer from '@layer/PadMobile';
import ViewportLayer from './scene/Viewport';

export default class MainLayer extends Layer {
    x = 10;
    y = 10;
    width = 20;
    height = 20;

    viewport = new ViewportLayer();
    paddleMobile = new padMobileLayer();

    start(gameFeatures: GameFeatures): void {
        gameFeatures.resume();
        if (gameFeatures.isMob()) {
            this.paddleMobile.start(gameFeatures);
        }
        gameFeatures.viewport = this.viewport;
        gameFeatures.padMobile = this.paddleMobile;
        this.viewport.start(gameFeatures);
    }

    update(gameFeatures: GameFeatures): void {
        if (gameFeatures.isMob()) {
            this.paddleMobile.update(gameFeatures);
        }
        gameFeatures.viewport = this.viewport;
        gameFeatures.padMobile = this.paddleMobile;
        this.viewport.update(gameFeatures);
    }

    render(gameFeatures: GameFeatures): void {
        this.viewport.render(gameFeatures);
        if (gameFeatures.isMob()) {
            this.paddleMobile.render(gameFeatures);
        }
    }
}
