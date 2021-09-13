import Layer from '@abstract/Layer';
import { agCircleShape, builderShape } from '@toolbox/Shape';

export const CircleGraphic = (l: Layer) => {
    return builderShape(l, (ctx) => {
        agCircleShape(l, ctx);
    });
};
