import Layer from '@abstract/Layer';
import { GameFeatures } from '@interface/GameFeatures';
import { circleShape, imgShape, rectangleShape } from '@toolbox/Shape';
import Config from 'src/Config';
import { ArrowGraphic } from 'src/graphic/Arrow';
import { CircleGraphic } from 'src/graphic/Circle';
import ButtonLayer from './Button';

export default class padMobileLayer extends Layer {
    controls: Layer[] = [];
    btnDemo = new ButtonLayer();
    start(gameFeatures: GameFeatures): void {
        this.width = gameFeatures.canvas.width;
        this.height = Config.PAD_VIEWPORT_HEIGHT;
        this.x = 0;
        this.y = gameFeatures.canvas.height - Config.PAD_VIEWPORT_HEIGHT;
        this.fillStyle = '#A7ABAC';
        this.setupControls(gameFeatures);
        this.controls.forEach((ctrl) => ctrl.start(gameFeatures));
    }
    update(gameFeatures: GameFeatures): void {}
    render(gameFeatures: GameFeatures): void {
        rectangleShape(this, gameFeatures);
        this.controls.forEach((ctrl) => ctrl.render(gameFeatures));
    }

    private setupControls(gf: GameFeatures) {
        let u = Config.UNIT;
        [
            { id: 'Top', x: this.x + u * 13, y: this.y + u * 3, rotation: 0, fillStyle: 'green' },
            { id: 'Bottom', x: this.x + u * 13, y: this.y + u * 13, rotation: 180, fillStyle: 'orange' },
            { id: 'Left', x: this.x + u * 8, y: this.y + u * 8, rotation: -90, fillStyle: 'blue' },
            { id: 'Right', x: this.x + u * 18, y: this.y + u * 8, rotation: 90, fillStyle: 'brown' },
        ].forEach((config) => {
            const btn = new ButtonLayer();
            btn.id = `btn${config.id}`;
            btn.x = config.x;
            btn.y = config.y;
            btn.fillStyle = '#000';
            btn.width = u * 4;
            btn.height = u * 4;
            btn.icon.fillStyle = 'transparent';
            btn.icon.strokeStyle = '#ccc';
            btn.icon.lineWidth = 3;
            btn.icon.center = true;
            btn.icon.x = btn.x + u;
            btn.icon.y = btn.y + u;
            btn.icon.width = btn.width - u * 2;
            btn.icon.height = btn.height - u * 2;
            btn.icon.rotation = config.rotation * (Math.PI / 180);
            btn.icon.img = ArrowGraphic(btn.icon);
            btn.on('click', (evt) => {
                console.log(`GO ${config.id}`);
            });
            this.controls.push(btn);
        });
        [
            { id: 'D', x: this.x + u * 50, y: this.y + u * 3, fillStyle: '#A0A5B5', labelFillStyle: '#4A3E80' },
            { id: 'F', x: this.x + u * 64, y: this.y + u * 9, fillStyle: '#4A3E80', labelFillStyle: '#A0A5B5' },
        ].forEach((config) => {
            const btn = new ButtonLayer();
            const circleBorderWidth = 2;
            btn.id = `btn${config.id}`;
            btn.x = config.x;
            btn.y = config.y;
            btn.width = u * 8;
            btn.height = u * 8;
            btn.fillStyle = 'transparent';
            btn.strokeStyle = '';
            btn.icon.x = btn.x;
            btn.icon.y = btn.y;
            btn.icon.lineWidth = circleBorderWidth;
            btn.icon.width = btn.width;
            btn.icon.height = btn.height;
            btn.icon.radius = btn.width / 2;
            btn.icon.fillStyle = config.fillStyle;
            btn.icon.strokeStyle = config.labelFillStyle;
            btn.icon.img = CircleGraphic(btn.icon);
            btn.label.x = btn.x + u * 3;
            btn.label.y = btn.y + u * 5;
            btn.label.width = btn.width;
            btn.label.height = btn.height;
            btn.label.fillStyle = config.labelFillStyle;
            btn.label.text = config.id;
            btn.on('click', (evt) => {
                console.log(`GO ${config.id}`);
            });
            this.controls.push(btn);
        });
    }
}
