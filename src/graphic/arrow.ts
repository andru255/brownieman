import Layer from '@abstract/Layer';
import { builderShape } from '@toolbox/Shape';
import Config from 'src/Config';

export const ArrowGraphic = (layer: Layer) => {
    return builderShape(layer, (ctx) => {
        // ctx.bp().mv2(100, 100).l2(50, 25).l2(50, 250).cp().fl();
        ctx.bp().mv2(50, 50).l2(100, 75).l2(100, 25).cp().fl();
    });
};
