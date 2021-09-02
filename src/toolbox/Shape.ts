import Layer from '@abstract/Layer';
import ContextWrapper from '@toolbox/ContextWrapper';

export function rectangleShape(layer: Layer, gf: any) {
    const ctx = <CanvasRenderingContext2D>gf.ctx;
    ctx.save();
    ctx.filter = layer.filter;
    ctx.fillStyle = layer.fillStyle;
    ctx.translate(layer.x, layer.y);
    ctx.rotate(layer.rotation);
    ctx.fillRect(0, 0, layer.width, layer.height);
    if (layer.strokeStyle) {
        ctx.lineWidth = layer.lineWidth;
        ctx.strokeStyle = layer.strokeStyle;
        ctx.strokeRect(0, 0, layer.width, layer.height);
    }
    ctx.restore();
}

export function textShape(layer: Layer, gf: any) {
    const ctx = <CanvasRenderingContext2D>gf.ctx;
    ctx.save();
    ctx.beginPath();
    ctx.font = layer.font;
    ctx.strokeStyle = layer.strokeStyle;
    ctx.fillStyle = layer.fillStyle;
    ctx.fillText(layer.text, layer.x, layer.y);
    if (layer.strokeStyle) {
        ctx.lineWidth = layer.lineWidth;
        ctx.strokeStyle = layer.strokeStyle;
        ctx.strokeText(layer.text, layer.x, layer.y);
    }
    ctx.restore();
}

export function imgShape(layer: Layer, gf) {
    const ctx = <CanvasRenderingContext2D>gf.ctx;
    ctx.save();
    ctx.translate(layer.x + layer.width / 2, layer.y + layer.height / 2);
    ctx.rotate(layer.rotation);
    ctx.drawImage(layer.img, -layer.width / 2, -layer.height / 2);
    ctx.restore();
}

export function builderShape(
    layer: Layer,
    steps: (ctx: ContextWrapper, c: HTMLCanvasElement) => void | HTMLCanvasElement
) {
    const c = <HTMLCanvasElement>document.createElement('canvas');
    c.width = layer.width;
    c.height = layer.height;
    const ctx = new ContextWrapper(c);
    return steps(ctx, c) || c;
}
