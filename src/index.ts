import C$plus from "./canvas-plus";
import Config from "./Config";

export default function $BM() {
    // canvas&wrapper setup
    const wr = <HTMLDivElement>document.getElementById("w");
    const c = <HTMLCanvasElement>document.getElementById("c");
    c.width = Config.WIDTH;
    c.height = Config.HEIGHT;
    if (navigator.userAgent.match(/andro|ipho|ipa|ipo/i)) {
        c.height += Config.PAD_VIEWPORT_HEIGHT;
    }
    // check resize
    const resizr = (w, h) => {
        const rt = w/h, crt = c.width/c.height;
        let nw = h*crt, nh = h; const style = wr.style;

        if(rt <= crt) {
            nw = w;
            nh = nw / crt;
        }
        style.width = `${nw}px`;
        style.height = `${nh}px`;
    }
    resizr(window.innerWidth, window.innerHeight);
    window.addEventListener('resize',()=> resizr(window.innerWidth, window.innerHeight), this)

}
