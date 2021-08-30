import Layer from '@abstract/Layer';
import { GameFeatures } from '@interface/GameFeatures';
import { rectangleShape } from '@toolbox/Shape';
import Config from 'src/Config';

export default class GridLayer extends Layer {
    map: string[][] = [
        ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
        ['X', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'X'],
        ['X', '.', 'X', '.', 'X', '.', 'X', '.', 'X', '.', 'X'],
        ['X', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'X'],
        ['X', '.', 'X', '.', 'X', '.', 'X', '.', 'X', '.', 'X'],
        ['X', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'X'],
        ['X', '.', 'X', '.', 'X', '.', 'X', '.', 'X', '.', 'X'],
        ['X', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'X'],
        ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ];

    layerMap: Layer[] = [];
    start(gameFeatures: GameFeatures): void {
        let cellSize = Config.CELL_SIZE;
        this.map.forEach((row, rowIndex) => {
            const y = cellSize * rowIndex + 1;
            let rowLayer = row.map((cell, cellIndex) => {
                const x = cellSize * cellIndex + 1;
                if (cell === 'X') {
                    return <Layer>{
                        width: cellSize,
                        height: cellSize,
                        fillStyle: '#fff',
                        x,
                        y,
                        shared: { t: 'X' },
                        collideWith: this.collideWith,
                    };
                }
                if (cell === '.') {
                    return <Layer>{ width: cellSize, height: cellSize, fillStyle: '#000', x, y, shared: { t: '.' } };
                }
            });
            this.layerMap.push(...rowLayer);
        });
    }
    update(gameFeatures: GameFeatures): void {}
    render(gameFeatures: GameFeatures): void {
        this.layerMap.forEach((l) => rectangleShape(l, gameFeatures));
    }

    public collideWithXBlocks(b: Layer): boolean {
        return this.layerMap
            .filter((layer) => layer.shared.t === 'X')
            .some((layer) => {
                return layer.collideWith(b);
            });
    }
}
