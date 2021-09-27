import Layer from '@abstract/Layer';
import { GameFeatures } from '@interface/GameFeatures';
import { off, on } from '@toolbox/EventWrapper';
import { getIt, isRectInsideOther } from '@toolbox/MousePosition';
import { imgShape, rectangleShape, textShape } from '@toolbox/Shape';
import Config from 'src/Config';

export default class ButtonLayer extends Layer {
    id: string;
    label = <Layer>{ fillStyle: '#00416d', fontSize: `${Config.UNIT * 3}px` };
    icon = <Layer>{ fillStyle: '#00416d' };
    fillStyle = '#f00';
    events = {};
    start(gameFeatures: GameFeatures): void {
        this.listen(gameFeatures.canvas);
    }
    update(gameFeatures: GameFeatures): void {
        if (this.isHidden) {
            return;
        }
    }
    render?(gameFeatures: GameFeatures): void {
        if (this.isHidden) {
            return;
        }
        rectangleShape(this, gameFeatures);
        if (this.icon.img) {
            imgShape(this.icon, gameFeatures);
        }
        textShape(this.label, gameFeatures);
    }

    on(name: string, event: (evt) => void) {
        this.events[name] = event;
    }

    hide() {
        if (this.isHidden) return;
        this.isHidden = true;
    }

    public off(canvas: HTMLCanvasElement) {
        const names = ['mousedown', 'mouseup', 'click', 'mousemove', 'keyup'];
        names.forEach((name) => {
            off(document, `${name}.${this.id}`);
        });
        canvas.classList.remove('cursor');
    }

    private listen(canvas: HTMLCanvasElement) {
        const _t = this;
        let evts = {};
        evts[`click.${this.id}`] = function (evt) {
            const cp = getIt(canvas, evt);
            if (isRectInsideOther(cp, _t)) {
                _t.trigger('click', this, [evt]);
            }
        };
        for (const e in evts) {
            on(document, e, evts[e]);
        }
    }

    private trigger(name, context, params) {
        if (this.events[name] === undefined) {
            return;
        }
        this.events[name].apply(context, params);
    }
}
