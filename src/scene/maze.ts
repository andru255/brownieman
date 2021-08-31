import Layer from '@abstract/Layer';
import { GameFeatures } from '@interface/GameFeatures';
import BombLayer from '@layer/bomb';
import GridLayer from '@layer/grid';
import HudLayer from '@layer/hud';
import PlayerLayer from '@layer/player';
export default class MazeScene extends Layer {
    hud = new HudLayer();
    grid = new GridLayer();
    player = new PlayerLayer();

    bombs: BombLayer[] = [];

    start(gameFeatures: GameFeatures): void {
        this.hud.start(gameFeatures);
        this.grid.start(gameFeatures);
        this.player.start(gameFeatures);
    }
    update(gameFeatures: GameFeatures): void {
        if (this.player.isKeyPressed) {
            let pp = this.player.nextStep(this.player.direction);
            this.player.nextPos = pp;
            if (this.grid.collideWithXBlocks(pp)) {
                this.player.nextPos = undefined;
            }
            if (this.player.attack) {
                const c = this.grid.gblock(this.player);
                this.createBomb(gameFeatures, c);
                this.player.attack = false;
            }
            this.player.isKeyPressed = false;
        }
        this.hud.update(gameFeatures);
        this.bombs.forEach((b) => b.update(gameFeatures));
        this.player.update(gameFeatures);
    }

    createBomb(gameFeatures, c: Layer) {
        const b = new BombLayer();
        b.x = b.sP(c).x;
        b.y = b.sP(c).y;
        b.start(gameFeatures);
        this.bombs.push(b);
        //this.boom(b, gameFeatures);
    }

    boom(b: BombLayer, gameFeatures) {
        b.wave = this.grid.gvalidB(b.wave); // conditioning initial explotion
        b.wave.forEach((w, index) => {
            if (w !== undefined) {
                b.expand(index);
            }
        }); // expation without rules
        b.wave = this.grid.gvalidB(b.wave); // conditioning in the maze
    }

    render(gameFeatures: GameFeatures): void {
        this.hud.render(gameFeatures);
        this.grid.render(gameFeatures);
        this.bombs.forEach((b) => b.render(gameFeatures));
        this.player.render(gameFeatures);
    }
}
