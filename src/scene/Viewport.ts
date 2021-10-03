import Layer from '@abstract/Layer';
import { GameFeatures } from '@interface/GameFeatures';
import { rectangleShape } from '@toolbox/Shape';
import Timeline from '@toolbox/Timeline';
import Config from 'src/Config';
import DebugScene from './Debug';
import MazeScene from './Maze';
import TransitionScene from './Transition';

export default class ViewportLayer extends Layer {
    fillStyle = '#f00';
    layers: { id: string; scene: Layer; active: boolean }[] = [
        { id: 'maze', scene: new MazeScene(), active: false },
        { id: 'debug', scene: new DebugScene(), active: true },
    ];
    transitionScene = new TransitionScene();
    cellSize: number = Config.CELL_SIZE;

    start(gameFeatures: GameFeatures): void {
        const { height, width, x, cellSize } = this.resize(gameFeatures);
        this.height = height;
        this.width = width;
        this.x = x;
        this.cellSize = cellSize;
        this.layers.forEach((l, i) => l.active && l.scene.start(gameFeatures));
        this.transitionScene.start(gameFeatures);
    }

    update(gameFeatures: GameFeatures): void {
        const { height, width, x, cellSize } = this.resize(gameFeatures);
        this.height = height;
        this.width = width;
        this.x = x;
        this.cellSize = cellSize;
        this.layers.forEach((l, i) => l.active && l.scene.update(gameFeatures));
        this.transitionScene.update(gameFeatures);
    }

    render(gameFeatures: GameFeatures): void {
        rectangleShape(this, gameFeatures);
        this.layers.forEach((l, i) => l.active && l.scene.render(gameFeatures));
        this.transitionScene.render(gameFeatures);
    }

    switchScene(gameFeatures: GameFeatures, sceneId, duration) {
        this.transitionScene.animate(gameFeatures, duration, () => {
            this.layers = this.layers.map((layer) => {
                layer.active = false;
                if (layer.id == sceneId) {
                    layer.active = true;
                }
                return layer;
            });
            this.layers.forEach((l, i) => l.active && l.scene.start(gameFeatures));
            console.log('change scene here :D', this.layers);
        });
    }

    private resize(gameFeatures: GameFeatures) {
        return {
            height: Config.HEIGHT,
            width: Config.WIDTH,
            x: 0,
            cellSize: Config.CELL_SIZE,
        };
    }
}
