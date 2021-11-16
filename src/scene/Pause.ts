import Layer from '@abstract/Layer';
import { GameFeatures } from '@interface/GameFeatures';
import ButtonLayer from '@layer/Button';
import { rectangleShape } from '@toolbox/Shape';
import Config from 'src/Config';

export default class PauseScene extends Layer {
    U = Config.UNIT;
    btnResume = new ButtonLayer();
    btnExit = new ButtonLayer();

    start?(gameFeatures: GameFeatures): void {
        const fontSize = `${this.U * 2.5}px`;
        this.btnResume.width = this.U * 12;
        this.btnResume.height = this.U * 4;
        this.btnResume.x = gameFeatures.viewport.width / 2 - this.btnResume.width / 2;
        this.btnResume.y = gameFeatures.viewport.height / 2 - this.U * 2;
        this.btnResume.label.width = this.btnResume.width;
        this.btnResume.label.height = this.btnResume.height;
        this.btnResume.label.x = this.btnResume.x + this.U;
        this.btnResume.label.y = this.btnResume.y + this.U * 3;
        this.btnResume.label.fontSize = fontSize;
        this.btnResume.label.text = 'RESUME';

        this.btnExit.width = this.U * 12;
        this.btnExit.height = this.U * 4;
        this.btnExit.x = gameFeatures.viewport.width / 2 - this.btnExit.width / 2;
        this.btnExit.y = gameFeatures.viewport.height / 2 + this.U * 4;
        this.btnExit.label.width = this.btnExit.width;
        this.btnExit.label.height = this.btnExit.height;
        this.btnExit.label.x = this.btnExit.x + this.U;
        this.btnExit.label.y = this.btnExit.y + this.U * 3;
        this.btnExit.label.fontSize = fontSize;
        this.btnExit.label.text = 'EXIT';
    }

    update?(gameFeatures: GameFeatures): void {}

    render?(gameFeatures: GameFeatures): void {
        this.btnResume.render(gameFeatures);
        this.btnExit.render(gameFeatures);
    }
}
