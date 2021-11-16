import Layer from '@abstract/Layer';
import { GameFeatures } from '@interface/GameFeatures';
import ButtonLayer from '@layer/Button';
import { rectangleShape, textShape } from '@toolbox/Shape';
import Config from 'src/Config';
export default class MenuScene extends Layer {
    U = Config.UNIT;
    bgBox: Layer = { width: 0, height: 0, x: 0, y: 0 };
    titleBox: Layer = { width: 0, height: 0, x: 0, y: 0 };
    startBtn: ButtonLayer;

    start(gameFeatures: GameFeatures): void {
        this.bgBox.width = this.U * 52;
        this.bgBox.height = this.U * 8;
        this.bgBox.x = gameFeatures.viewport.width / 2 - this.bgBox.width / 2;
        this.bgBox.y = gameFeatures.viewport.height / 2 - this.bgBox.height;
        this.bgBox.fillStyle = '#ff0';

        this.titleBox = JSON.parse(JSON.stringify(this.bgBox));
        this.titleBox.y = this.bgBox.y + this.U * 6;
        this.titleBox.text = 'BROWNIEMAN';
        this.titleBox.fillStyle = '#000';

        this.startBtn = new ButtonLayer();
        this.startBtn.id = 'startBtn';
        this.startBtn.width = this.U * 12;
        this.startBtn.height = this.U * 4;
        this.startBtn.x = gameFeatures.viewport.width / 2 - this.startBtn.width / 2;
        this.startBtn.y = gameFeatures.viewport.height / 2 + this.U * 2;
        this.startBtn.label.width = this.startBtn.width;
        this.startBtn.label.height = this.startBtn.height;
        this.startBtn.label.x = this.startBtn.x + this.U;
        this.startBtn.label.y = this.startBtn.y + this.U * 3;
        this.startBtn.label.fontSize = `${this.U * 3}px`;
        this.startBtn.label.text = 'START';
        this.startBtn.on('click', (evt) => {
            if (!this.isHidden) {
                gameFeatures.viewport.switchScene(gameFeatures, 'maze', 0.15);
            }
        });
        this.startBtn.start(gameFeatures);
    }

    update(gameFeatures: GameFeatures): void {}
    render(gameFeatures: GameFeatures): void {
        rectangleShape(this.bgBox, gameFeatures);
        textShape(this.titleBox, gameFeatures);
        this.startBtn.render(gameFeatures);
    }
}
