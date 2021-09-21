import Layer from '@abstract/Layer';
import { GameFeatures } from '@interface/GameFeatures';
import { on } from '@toolbox/EventWrapper';
import { Easing } from '@toolbox/FX';
import { getIt } from '@toolbox/MousePosition';
import { imgShape, rectangleShape, textShape } from '@toolbox/Shape';
import Timer from '@toolbox/Timer';
import Config from 'src/Config';
import { CircleGraphic } from 'src/graphic/Circle';

export default class DebugScene extends Layer {
    mousePositionLbl = <Layer>{ x: 10, y: 50, width: 100, height: 100, font: '20px Arial' };

    keyPressBox = <Layer>{
        x: 0,
        y: 0,
        width: Config.UNIT * 6,
        height: Config.UNIT * 6,
        font: `${Config.UNIT * 4}px Arial`,
        fillStyle: '#bbb',
        lineWidth: 2,
        strokeStyle: '#000',
    };

    keyPressBoxLbl: Layer;
    timer = new Timer(0);

    keyPressStatus: { down?: boolean; up?: boolean; onceDown?: boolean } = { down: false, up: false, onceDown: false };

    start(gameFeatures: GameFeatures): void {
        this.keyPressBoxLbl = { ...this.keyPressBox };
        this.keyPressBoxLbl.text = '';
        this.mousePositionLbl.text = this.showMousePositionText();
        const width = this.keyPressBox.width;
        const height = this.keyPressBox.height;

        on(document, 'mousemove', (evt) => {
            const { x, y } = getIt(gameFeatures.canvas, evt);
            this.mousePositionLbl.text = this.showMousePositionText(x, y);
        });
        on(document, 'keydown.keyboxlbl', (evt) => {
            this.keyPressBoxLbl.text = `${evt.keyCode}`;
            this.keyPressBox.width = Config.UNIT * 8;
            this.keyPressBox.height = Config.UNIT * 8;
        });
        on(document, 'keyup.keyboxlbl', (evt) => {
            this.keyPressBox.width = width;
            this.keyPressBox.height = height;
            //this.keyPressBoxLbl.text = '';
            this.keyPressStatus = { down: false, up: true };
            //this.keyPressStatus = { down: false, up: true };
        });
        this.centerPos(gameFeatures);
    }

    update(gameFeatures: GameFeatures): void {
        //this.animKeyEvt(gameFeatures, 'DOWN');
        //if (this.keyPressStatus.up) {
        //    this.animKeyEvt(gameFeatures, 'UP');
        //}
        if (this.keyPressStatus.up) {
            this.animKeyEvt(gameFeatures, 'UP');
        }
        //this.keyPressStatus = { up: false };
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
        this.mousePositionLbl.x = gameFeatures.viewport.x + Config.UNIT * 3;

        this.keyPressBox.x = gameFeatures.viewport.x + gameFeatures.viewport.width / 2 - this.keyPressBox.width / 2;
        this.keyPressBox.y = gameFeatures.viewport.y + gameFeatures.viewport.height / 2 - this.keyPressBox.height / 2;
        this.width = gameFeatures.viewport.cellSize;
    }

    private animKeyEvt(gameFeatures: GameFeatures, eventName: string) {
        const { step } = gameFeatures;
        let target = { width: Config.UNIT * 10, height: Config.UNIT * 10 };
        let duration = 50 / 100;
        if (eventName === 'UP') {
            target = { width: Config.UNIT * 6, height: Config.UNIT * 6 };
            duration = 5 / 100;
        }
        //this.timer.wait(step, -1, 1 / 100, () => {
        this.timer.animLayer(step, this.keyPressBox, 'width', target.width, duration);
        this.timer.animLayer(step, this.keyPressBox, 'height', target.height, duration);
        //});
    }
}
