import Layer from '@abstract/Layer';
import { GameFeatures } from '@interface/GameFeatures';
import { rectangleShape, textShape } from '@toolbox/Shape';
import Config from 'src/Config';

export default class HudLayer extends Layer {
    x = Config.CELL_SIZE;
    y = 0;
    fillStyle = 'orange';
    width = Config.CELL_SIZE * 10;
    height = Config.CELL_SIZE * 2;
    strokeStyle = '';
    countdownText = <Layer>{};
    timeoutValue = 0;
    countdown = 10000 * 6 + 100; // 1min
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
        this.x = gameFeatures.viewport.x;
        const { dt, step } = gameFeatures;
        if (!this.timeoutValue) {
            this.timeoutValue = dt + this.countdown / 1000;
        }
        if (this.timeoutValue > Math.floor(dt / 60)) {
            this.countdownText.text = this.mmss(this.timeoutValue, gameFeatures);
            this.timeoutValue -= step;
        }
    }

    render(gameFeatures: GameFeatures): void {
        rectangleShape(this, gameFeatures);
        textShape(this.countdownText, gameFeatures);
    }

    private mmss(dt, gameFeatures: GameFeatures) {
        const m = Math.floor(dt / 60);
        const s3 = Math.floor(10 * (dt - Math.floor(dt)));
        return `${m}:${Math.floor(dt - m * 60)}:${s3} | CELL_SIZE: ${gameFeatures.viewport.cellSize}`;
    }
}
