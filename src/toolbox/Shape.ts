import Layer from '@abstract/Layer';

export function rectangleShape(layer: Layer, gf: any) {
    const ctx = <CanvasRenderingContext2D>gf.ctx;
    ctx.save();
    ctx.filter = layer.filter;
    ctx.fillStyle = layer.fillStyle;
    let ts = { x: layer.x, y: layer.y };
    let fr = { x: 0, y: 0 };
    let sr = { x: 0, y: 0 };
    if (layer.center) {
        ts.x = layer.x + layer.width / 2;
        ts.y = layer.y + layer.height / 2;
        fr.x = -layer.width / 2;
        fr.y = -layer.height / 2;
        sr.x = -layer.width / 2;
        sr.y = -layer.height / 2;
    }
    ctx.translate(ts.x, ts.y);
    ctx.rotate(layer.rotation);
    ctx.fillRect(fr.x, fr.y, layer.width, layer.height);
    if (layer.strokeStyle) {
        ctx.lineWidth = layer.lineWidth;
        ctx.strokeStyle = layer.strokeStyle;
        ctx.strokeRect(sr.x, sr.y, layer.width, layer.height);
    }
    ctx.restore();
}

export function textShape(layer: Layer, gf: any) {
    if (!layer.text) {
        return;
    }
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
    if (!layer.img) {
        return;
    }
    const ctx = <CanvasRenderingContext2D>gf.ctx;
    ctx.save();
    ctx.translate(layer.x + layer.width / 2, layer.y + layer.height / 2);
    ctx.rotate(layer.rotation);
    ctx.drawImage(layer.img, -layer.width / 2, -layer.height / 2);
    ctx.restore();
}

export function circleShape(layer: Layer, gf) {
    const ctx = <CanvasRenderingContext2D>gf.ctx;
    agCircleShape(layer, ctx);
}

export function agCircleShape(layer: Layer, ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.fillStyle = layer.fillStyle;
    ctx.beginPath();
    ctx.translate(layer.radius, layer.radius);
    ctx.rotate(layer.rotation);
    ctx.arc(0, 0, layer.radius - layer.lineWidth, 0, Math.PI * 2, true);
    ctx.fill();
    if (layer.strokeStyle) {
        ctx.lineWidth = layer.lineWidth;
        ctx.strokeStyle = layer.strokeStyle;
        ctx.stroke();
    }
    ctx.closePath();
    ctx.restore();
}

export function builderShape(
    layer: Layer,
    steps: (ctx: CanvasRenderingContext2D, c: HTMLCanvasElement) => void | HTMLCanvasElement
) {
    const c = <HTMLCanvasElement>document.createElement('canvas');
    c.width = layer.width;
    c.height = layer.height;
    const ctx = c.getContext('2d');
    return steps(ctx, c) || c;
}
