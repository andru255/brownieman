export default class ContextWrapper {
    private _ctx: CanvasRenderingContext2D;

    constructor(c: HTMLCanvasElement) {
        this._ctx = <CanvasRenderingContext2D>c.getContext('2d');
    }

    wrap(fn: (ctxWrapper: ContextWrapper) => void) {
        this._ctx.save();
        fn(this);
        this._ctx.restore();
    }

    /**
     * @method ctx.fillRect(x, y, w, h)
     * @returns ContextWrapper
     */
    public fr(x, y, w, h): ContextWrapper {
        this._ctx.fillRect(x, y, w, h);
        return this;
    }
    /**
     * @method ctx.fillStyle = value
     * @returns ContextWrapper
     */
    public fs(value): ContextWrapper {
        this._ctx.fillStyle = value;
        return this;
    }
    /**
     * @method ctx.beginPath()
     * @returns ContextWrapper
     */
    public bp(): ContextWrapper {
        this._ctx.beginPath();
        return this;
    }
    /**
     * @method ctx.closePath()
     * @returns ContextWrapper
     */
    public cp(): ContextWrapper {
        this._ctx.closePath();
        return this;
    }
    /**
     * @method ctx.translate(x, y)
     * @returns ContextWrapper
     */
    public tl(x, y): ContextWrapper {
        this._ctx.translate(x, y);
        return this;
    }
    /**
     * @method ctx.rotate(angle)
     * @returns ContextWrapper
     */
    public r(angle): ContextWrapper {
        this._ctx.rotate(angle);
        return this;
    }
    /**
     * @method ctx.scale(x, y)
     * @returns ContextWrapper
     */
    public sc(x, y): ContextWrapper {
        this._ctx.scale(x, y);
        return this;
    }
    /**
     * @method ctx.moveTo(x, y)
     * @returns ContextWrapper
     */
    public mv2(x, y): ContextWrapper {
        this._ctx.moveTo(x, y);
        return this;
    }
    /**
     * @method ctx.lineTo(x, y)
     * @returns ContextWrapper
     */
    public l2(x, y): ContextWrapper {
        this._ctx.lineTo(x, y);
        return this;
    }
    /**
     * @method ctx.fill()
     * @returns ContextWrapper
     */
    public fl(): ContextWrapper {
        this._ctx.fill();
        return this;
    }
}
