import Layer from '@abstract/Layer';
import { builderShape } from '@toolbox/Shape';

export const ArrowGraphic = (l: Layer) => {
    return builderShape(l, (ctx) => {
        ctx.beginPath();
        ctx.fillStyle = l.fillStyle;
        ctx.moveTo(l.width / 2, 0);
        ctx.lineTo(0, l.height);
        ctx.lineTo(l.width, l.height);
        ctx.lineTo(-l.width / 2, -l.height - l.width);
        ctx.translate(l.width / 2, l.height / 2);
        if (l.strokeStyle) {
            ctx.lineWidth = l.lineWidth;
            ctx.strokeStyle = l.strokeStyle;
            ctx.stroke();
        }
        ctx.closePath();
        ctx.fill();
    });
};
