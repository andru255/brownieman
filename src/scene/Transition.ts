import Layer from '@abstract/Layer';
import { GameFeatures } from '@interface/GameFeatures';
import { rectangleShape } from '@toolbox/Shape';
import Timeline from '@toolbox/Timeline';

export default class TransitionScene extends Layer {
    fillStyle = '#ddd';
    globalAlpha = 0;
    tl: Timeline;

    start(gameFeatures: GameFeatures): void {
        this.width = gameFeatures.viewport.width;
        this.height = gameFeatures.viewport.height;
        this.tl = new Timeline(gameFeatures);

        //this.tl.add({ id: 'hide', layer: this, property: 'globalAlpha', target: 0, duration: 0.2 });
        //this.tl.pause(0.4);
        //this.tl.add({
        //    id: 'show',
        //    layer: this,
        //    property: 'globalAlpha',
        //    target: 1,
        //    duration: 0.2,
        //});
    }

    update(gameFeatures: GameFeatures): void {}

    render(gameFeatures: GameFeatures): void {
        this.tl?.play();
        rectangleShape(this, gameFeatures);
    }

    animate(gameFeatures: GameFeatures, duration, callback?: () => void) {
        this.tl?.add({
            id: 'show',
            layer: this,
            property: 'globalAlpha',
            target: 1,
            duration: duration,
        });
        this.tl?.pause(duration);
        this.tl?.add({
            id: 'hide',
            layer: this,
            property: 'globalAlpha',
            target: 0,
            duration: duration,
        });
        this.tl?.once('show:end', callback);
    }
}
