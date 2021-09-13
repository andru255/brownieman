import Layer from '@abstract/Layer';
import { GameFeatures } from '@interface/GameFeatures';
import BombLayer from '@layer/Bomb';
import GridLayer from '@layer/Grid';
import HudLayer from '@layer/HUD';
import PlayerLayer from '@layer/Player';
import Config from 'src/Config';
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
        this.clean();
        this.grid.update(gameFeatures);
        if (this.player.isKeyPressed) {
            let pp = this.player.nextStep(this.player.direction);
            this.player.nextPos = pp;
            if (
                !this.grid.gvalidB([pp]).filter((e) => e !== undefined).length ||
                this.bombs.some((b) => b.collideWith(pp))
            ) {
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
        this.bombs.forEach((b) => {
            b.update(gameFeatures);
            if (b.isExpanded) {
                this.boom(b, gameFeatures, (wave) => {
                    if (wave.some((b) => b.collideWith(this.player))) {
                        this.player.lost();
                    }
                });
                b.isExpanded = false;
            }
        });
        this.player.update(gameFeatures);
    }

    createBomb(gameFeatures, c: Layer) {
        const x = c.x + Config.UNIT;
        const y = c.y + Config.UNIT;
        if (this.bombs.some((b) => b.x === x && b.y === y)) {
            return;
        }
        const b = new BombLayer();
        b.x = x;
        b.y = y;
        b.start(gameFeatures);
        this.bombs.push(b);
    }

    boom(b: BombLayer, gameFeatures, cb: (wave: Layer[]) => void) {
        b.wave = this.grid.gvalidB(b.wave); // conditioning initial explotion
        b.wave.forEach((w, index) => {
            if (w !== undefined) {
                b.expand(index);
            }
        }); // expantion without rules
        b.wave = this.grid.gvalidB(b.wave); // conditioning in the maze
        cb(b.wave.filter((b) => b !== undefined));
    }

    render(gameFeatures: GameFeatures): void {
        this.hud.render(gameFeatures);
        this.grid.render(gameFeatures);
        this.bombs.forEach((b) => b.render(gameFeatures));
        this.player.render(gameFeatures);
    }

    private clean() {
        this.bombs = this.bombs.filter((b) => b.rm == false);
    }
}
