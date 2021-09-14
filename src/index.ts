import Config from './Config';
import Game from './Game';
import MainLayer from './MainLayer';

export default function $BM() {
    // canvas&wrapper setup
    const wr = <HTMLDivElement>document.getElementById('w');
    const c = <HTMLCanvasElement>document.getElementById('c');
    const L = new MainLayer();
    const game = new Game('c', L);

    // check resize
    const resizr = (w, h) => {
        c.width = Config.WIDTH;
        c.height = Config.HEIGHT;
        if (game.isMob()) {
            c.height = Config.HEIGHT + Config.PAD_VIEWPORT_HEIGHT;
        }
        const rt = w / h,
            crt = c.width / c.height;
        let nw = h * crt,
            nh = h;
        const style = wr.style;

        if (rt <= crt) {
            nw = w;
            nh = nw / crt;
        }
        style.width = `${nw}px`;
        style.height = `${nh}px`;
    };
    resizr(window.innerWidth, window.innerHeight);
    game.setup();
    window.addEventListener('resize', () => resizr(window.innerWidth, window.innerHeight), this);
}
