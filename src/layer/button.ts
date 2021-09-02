import Layer from '@abstract/Layer';
import { GameFeatures } from '@interface/GameFeatures';
import { on } from '@toolbox/EventWrapper';
import { getIt, isRectInsideOther } from '@toolbox/mousePosition';
import { rectangleShape, textShape } from '@toolbox/Shape';

export default class ButtonLayer extends Layer {
    id: string;
    label = <Layer>{ fillStyle: '#00416d', font: '30px Arial, sans-serif' };
    fillStyle = '#f00';
    events = {};
    start(gameFeatures: GameFeatures): void {
        this.listen(gameFeatures.canvas);
    }
    update(gameFeatures: GameFeatures): void {
        if (this.isHidden) {
            return;
        }
        this.listen(gameFeatures.canvas);
    }
    render?(gameFeatures: GameFeatures): void {
        if (this.isHidden) {
            return;
        }
        rectangleShape(this, gameFeatures);
        textShape(this.label, gameFeatures);
    }

    on(name: string, event: (evt) => void) {
        this.events[name] = event;
    }

    hide() {
        if (this.isHidden) return;
        this.isHidden = true;
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
