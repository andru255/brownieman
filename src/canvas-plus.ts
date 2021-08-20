export default function C$plus() {
    const c$ = CanvasRenderingContext2D.prototype;
    c$["wrap"] = function(f) {
        this.save();
        f();
        this.restore();
    }
    c$["fr"] = c$.fillRect;
    c$["fs"] = function(x) {
        this.fillStyle = x;
    }
}
