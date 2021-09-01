import Layer from '@abstract/Layer';
import { GameFeatures } from '@interface/GameFeatures';
import { rectangleShape } from '@toolbox/Shape';
import Config from 'src/Config';

export default class GridLayer extends Layer {
    /*
    MAIN_MAP
    map: string[][] = [
        ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
        ['X', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'X'],
        ['X', '.', 'X', '.', 'X', '.', 'X', '.', 'X', '.', 'X', '.', 'X'],
        ['X', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'X'],
        ['X', '.', 'X', '.', 'X', '.', 'X', '.', 'X', '.', 'X', '.', 'X'],
        ['X', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'X'],
        ['X', '.', 'X', '.', 'X', '.', 'X', '.', 'X', '.', 'X', '.', 'X'],
        ['X', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'X'],
        ['X', '.', 'X', '.', 'X', '.', 'X', '.', 'X', '.', 'X', '.', 'X'],
        ['X', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'X'],
        ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ]; */
    map: string[][] = [
        ['.', '.', '.', '.', '.', '.', '.'],
        ['.', 'X', '.', 'X', '.', 'X', '.'],
        ['.', '.', '.', '.', '.', '.', '.'],
        ['.', 'X', '.', 'X', '.', 'X', '.'],
        ['.', '.', '.', '.', '.', '.', '.'],
        ['.', 'X', '.', 'X', '.', 'X', '.'],
        ['.', '.', '.', '.', '.', '.', '.'],
        ['.', 'X', '.', 'X', '.', 'X', '.'],
        ['.', '.', '.', '.', '.', '.', '.'],
    ];

    layerMap: Layer[] = [];
    start(gameFeatures: GameFeatures): void {
        let cellSize = Config.CELL_SIZE;
        this.width = this.map[0].length * cellSize;
        this.height = this.map.length * cellSize;
        this.x = cellSize;
        this.y = cellSize;
        this.map.forEach((row, rowIndex) => {
            const y = this.y * (rowIndex + 1);
            let rowLayer = row.map((cell, cellIndex) => {
                const x = this.x + cellSize * cellIndex + 1;
                const bl = <Layer>{ width: cellSize, height: cellSize, x, y, collideWith: this.collideWith };
                const gpos = { x: cellIndex, y: rowIndex };
                if (cell === 'X') {
                    return {
                        ...bl,
                        fillStyle: 'rgba(255,255,255,0.6)',
                        shared: { t: 'X', gpos },
                    };
                }
                if (cell === '.') {
                    return { ...bl, fillStyle: '#000', shared: { t: '.', gpos } };
                }
            });
            this.layerMap.push(...rowLayer);
        });
    }

    update(gameFeatures: GameFeatures): void {}

    render(gameFeatures: GameFeatures): void {
        //rectangleShape(this, gameFeatures);
        this.layerMap.forEach((l) => rectangleShape(l, gameFeatures));
    }

    public gblock(b: Layer): Layer {
        return this.layerMap.find((l) => {
            return l.collideWith(b);
        });
    }

    public gpxpos(x, y): Layer {
        return this.layerMap.find((l) => {
            return l.shared.gpos.x == x && l.shared.gpos.y == y;
        });
    }

    public gvalidB(lg: Layer[]): Layer[] {
        const _lg = [];
        for (let l = 0; l < lg.length; l++) {
            const _l = lg[l];
            if (_l === undefined) {
                continue;
            }
            const g = this.gblock(_l);
            if (g !== undefined) {
                const { x, y } = g.shared.gpos;
                const np = this.gpxpos(x, y);
                if (np.shared.t !== 'X') {
                    _lg.push(_l);
                    continue;
                }
                _lg.push(undefined);
                continue;
            }
            _lg.push(undefined);
        }
        return _lg;
    }

    public collideWithXBlocks(b: Layer): boolean {
        return this.layerMap
            .filter((layer) => layer.shared.t === 'X')
            .some((layer) => {
                return layer.collideWith(b);
            });
    }

    // generates the sequence of black hole
    public genSeq(w, h): { x: number; y: number }[] {
        let s = [];
        let x = [...Array(w).keys()];
        let y = [...Array(h).keys()];
        // I
        x.forEach((i) => s.push({ x: i, y: 0 }));

        // II
        y.forEach((j) => s.push({ x: w, y: j }));

        return s;
    }
}
