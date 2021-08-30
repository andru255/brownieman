import Layer from '@abstract/Layer';
import { GameFeatures } from '@interface/GameFeatures';
import BombLayer from '@layer/bomb';
import GridLayer from '@layer/grid';
import PlayerLayer from '@layer/player';
export default class MazeScene extends Layer {
    grid = new GridLayer();
    player = new PlayerLayer();

    bombs: BombLayer[] = [];

    start(gameFeatures: GameFeatures): void {
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
                this.createBomb(gameFeatures, this.player.x, this.player.y);
                this.player.attack = false;
            }
            this.player.isKeyPressed = false;
        }
        this.player.update(gameFeatures);
        this.bombs.forEach((b) => b.update(gameFeatures));
    }

    createBomb(gameFeatures, x, y) {
        const b = new BombLayer();
        b.x = x;
        b.y = y;
        b.start(gameFeatures);
        b.wave = b.wave.map((l) => {
            if (this.grid.collideWithXBlocks(l)) {
                return undefined;
            }
            return l;
        });
        b.wave.forEach((w, index) => {
            if (w !== undefined) {
                b.expand(index);
            }
        });
        b.wave = b.wave
            .filter((l) => l !== undefined)
            .map((l) => {
                if (this.grid.collideWithXBlocks(l)) {
                    return undefined;
                }
                return l;
            });

        console.log('b.wave', b.wave);
        this.bombs.push(b);
    }

    render(gameFeatures: GameFeatures): void {
        this.grid.render(gameFeatures);
        this.bombs.forEach((b) => b.render(gameFeatures));
        this.player.render(gameFeatures);
    }
}
