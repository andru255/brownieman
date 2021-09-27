import Layer from '@abstract/Layer';
import { GameFeatures } from '@interface/GameFeatures';
import { on } from '@toolbox/EventWrapper';
import { Easing } from '@toolbox/FX';
import { getIt } from '@toolbox/MousePosition';
import { imgShape, rectangleShape, textShape } from '@toolbox/Shape';
import Timer from '@toolbox/Timer';
import Config from 'src/Config';

export default class DebugScene extends Layer {
    mousePositionLbl = <Layer>{ x: 10, y: 50, width: 100, height: 100, fontSize: '20px' };

    keyPressBox = <Layer>{
        x: 0,
        y: 0,
        width: Config.UNIT * 5,
        height: Config.UNIT * 5,
        lineWidth: 2,
        strokeStyle: '#000',
        fillStyle: '#bbb',
    };

    keyPressBoxLbl = <Layer>{
        x: 0,
        y: 0,
        fontSize: `${Config.UNIT * 6}px`,
        width: 0,
        height: 0,
        fillStyle: '#ffffff00',
    };

    timer = new Timer(0);

    keyPressStatus: { down?: boolean; up?: boolean } = { down: false, up: false };

    start(gameFeatures: GameFeatures): void {
        this.keyPressBoxLbl.text = '';
        this.mousePositionLbl.text = this.showMousePositionText();
        on(document, 'mousemove', (evt) => {
            const { x, y } = getIt(gameFeatures.canvas, evt);
            this.mousePositionLbl.text = this.showMousePositionText(x, y);
        });
        on(document, 'keydown.keyboxlbl', (evt) => {
            this.keyPressBoxLbl.text = `${evt.keyCode}`;
            this.keyPressStatus = { down: true, up: false };
        });
        on(document, 'keyup.keyboxlbl', (evt) => {
            this.keyPressBoxLbl.text = '';
            this.keyPressStatus = { down: false, up: true };
        });
        this.centerPos(gameFeatures);
    }

    update(gameFeatures: GameFeatures): void {
        if (this.keyPressStatus.down) {
            this.animKeyEvt(gameFeatures, 'DOWN');
        }
        if (this.keyPressStatus.up) {
            this.animKeyEvt(gameFeatures, 'UP');
        }
        this.centerPos(gameFeatures);
    }

    render(gameFeatures: GameFeatures): void {
        rectangleShape(this.keyPressBox, gameFeatures);
        textShape(this.keyPressBoxLbl, gameFeatures);
        textShape(this.mousePositionLbl, gameFeatures);
    }

    private showMousePositionText(x = 0, y = 0): string {
        return `Mouse Position: ${x}, ${y}`;
    }

    private centerPos(gameFeatures: GameFeatures) {
        this.mousePositionLbl.x = gameFeatures.viewport.x + Config.UNIT * 4;
        this.keyPressBox.x = gameFeatures.viewport.x + gameFeatures.viewport.width / 2 - this.keyPressBox.width / 2;
        this.keyPressBox.y = gameFeatures.viewport.y + gameFeatures.viewport.height / 2 - this.keyPressBox.height / 2;
        this.keyPressBoxLbl.width = this.keyPressBox.width;
        this.keyPressBoxLbl.height = this.keyPressBox.height;
        this.keyPressBoxLbl.x = this.keyPressBox.x + this.keyPressBox.width / 2 - Config.UNIT * 3;
        this.keyPressBoxLbl.y = this.keyPressBox.y + this.keyPressBox.height / 2 + Config.UNIT * 2;
        this.width = gameFeatures.viewport.cellSize;
    }

    private animKeyEvt(gameFeatures: GameFeatures, eventName: string) {
        const { step } = gameFeatures;
        let target = { width: Config.UNIT * 15, height: Config.UNIT * 15 };
        let colorTarget = '#ff0000';
        let duration = 20 / 100;
        let colorDuration = 10 / 100;
        if (eventName === 'UP') {
            target = { width: Config.UNIT * 5, height: Config.UNIT * 5 };
            duration = 20 / 100;
            colorDuration = 10 / 100;
            colorTarget = '#ffffff00';
        }
        this.timer.animLayer(step, this.keyPressBox, 'width', target.width, duration);
        this.timer.animLayer(step, this.keyPressBox, 'height', target.height, duration);
        this.timer.animLayer(step, this.keyPressBoxLbl, 'fillStyle', colorTarget, colorDuration);
    }
}
