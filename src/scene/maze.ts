import Layer from '@abstract/Layer';
import { GameFeatures } from '@interface/GameFeatures';
import GridLayer from '@layer/grid';
import PlayerLayer from '@layer/player';
import { rectangleShape } from '@toolbox/Shape';
import Config from 'src/Config';
export default class MazeScene extends Layer {
    grid = new GridLayer();
    player = new PlayerLayer();

    start(gameFeatures: GameFeatures): void {
        this.grid.start(gameFeatures);
        this.player.start(gameFeatures);
    }
    update(gameFeatures: GameFeatures): void {
        if (this.player.shared.isKeyPressed) {
            let pp = this.player.nextStep(this.player.shared.direction);
            this.player.shared.nextPos = pp;
            if (this.grid.collideWithXBlocks(pp)) {
                this.player.shared.nextPos = undefined;
            }
            this.player.shared.isKeyPressed = false;
        }
        this.player.update(gameFeatures);
    }

    render(gameFeatures: GameFeatures): void {
        [this.grid, this.player].forEach((l) => l.render(gameFeatures));
    }
}
