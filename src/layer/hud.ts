import Layer from '@abstract/Layer';
import { GameFeatures } from '@interface/GameFeatures';
import { rectangleShape, textShape } from '@toolbox/Shape';
import Config from 'src/Config';

export default class HudLayer extends Layer {
    x = Config.CELL_SIZE;
    y = 0;
    fillStyle = 'orange';
    width = Config.CELL_SIZE * 10;
    height = Config.CELL_SIZE;
    strokeStyle = '';
    countdownText = <Layer>{};
    timeoutValue = 0;
    countdown = 1000;
    dt = 0;

    start(gameFeatures: GameFeatures): void {
        this.countdownText = <Layer>{
            ...this,
            text: 'Out: 00:00',
            font: '16px Arial, sans-serif',
            fillStyle: '#000',
            y: Config.CELL_SIZE / 2,
        };
    }
    update(gameFeatures: GameFeatures): void {
        const { dt } = gameFeatures;
        let mins = Math.floor(dt / 60);
        let secs = Math.floor(dt - mins * 60);
        let millisecs = Math.floor(10 * (dt - Math.floor(dt)));
        if (!this.timeoutValue) {
            this.timeoutValue = dt + this.countdown / 1000;
        }
        if (this.timeoutValue < dt) {
            this.countdownText.text = `TIME: ${mins} : ${secs} : ${millisecs}`;
        }
    }

    render(gameFeatures: GameFeatures): void {
        rectangleShape(this, gameFeatures);
        textShape(this.countdownText, gameFeatures);
    }
}
