import Layer from '@abstract/Layer';
import { builderShape } from '@toolbox/Shape';
import Config from 'src/Config';

export const ArrowGraphic = (l: Layer) => {
    return builderShape(l, (ctx) => {
        ctx.bp()
            .mv2(l.width / 2, 0)
            .l2(0, l.height)
            .l2(l.width, l.height)
            .tl(l.width / 2, l.height / 2)
            .cp()
            .fl();
    });
};
