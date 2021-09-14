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
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', 'X', '.', 'X', '.', 'X', '.', 'X', '.', 'X', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', 'X', '.', 'X', '.', 'X', '.', 'X', '.', 'X', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', 'X', '.', 'X', '.', 'X', '.', 'X', '.', 'X', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', 'X', '.', 'X', '.', 'X', '.', 'X', '.', 'X', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ];

    layerMap: Layer[] = [];
    cm: any[][] = [];
    intervalToDestroyEachBlock = 300;
    _countInterval = 0;
    cellSize = Config.CELL_SIZE;

    start(gameFeatures: GameFeatures): void {
        this.cellSize = gameFeatures.viewport.cellSize;
        this.width = this.map[0].length * this.cellSize;
        this.height = this.map.length * this.cellSize;
        this.x = this.cellSize;
        this.y = this.cellSize;
        this.map.forEach((row, rowIndex) => {
            const y = this.y * (rowIndex + 1);
            const ci = [];
            let rowLayer = row.map((cell, cellIndex) => {
                const x = this.x + this.cellSize * cellIndex + 1;
                const bl = <Layer>{ width: this.cellSize, height: this.cellSize, x, y, collideWith: this.collideWith };
                const gpos = { x: cellIndex, y: rowIndex };
                ci.push(gpos);
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
            this.cm.push(ci);
        });
        //console.log('seq', this.gseq(this.cm));
        //this.prepareDestroy();
    }

    update(gameFeatures: GameFeatures): void {
        this.cellSize = gameFeatures.viewport.cellSize;
    }

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

    public gseq(arr: string[][]): string[] {
        return arr.length > 1
            ? arr.splice(0, 1)[0].concat(
                  this.gseq(
                      arr[0]
                          .map((c, i) => {
                              return arr.map((r) => r[i]);
                          })
                          .reverse()
                  )
              )
            : arr[0];
    }

    public prepareDestroy() {
        this.layerMap.forEach((item) => {
            if (item.shared.gpos.x == 2 && item.shared.gpos.y == 1) {
                item.fillStyle = 'rgba(255,255,255,0)';
                item.shared.t = 'X';
            }
        });
        //steps.forEach((step) => {
        //    this.map[]
        //})
    }
}
