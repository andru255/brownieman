import Layer from '@abstract/Layer';
import { GameFeatures } from '@interface/GameFeatures';
import { KeyName, on } from '@toolbox/EventWrapper';
import { rectangleShape } from '@toolbox/Shape';
import Config from 'src/Config';

export default class PlayerLayer extends Layer {
    width = Config.CELL_SIZE - 10;
    height = Config.CELL_SIZE - 10;
    x = Config.CELL_SIZE + 5;
    y = Config.CELL_SIZE + 5;
    strokeStyle = '';
    vx = Config.PLAYER_VELOCITY;
    vy = Config.PLAYER_VELOCITY;
    shared: {
        isCollided: boolean;
        isKeyPressed: boolean;
        direction: KeyName;
        nextPos: Layer;
    };

    start(gameFeatures: GameFeatures): void {
        this.shared.isCollided = false;
        on(document, 'keyup', (evt) => {
            this.shared.isKeyPressed = true;
            if (evt.keyCode == KeyName.ARROW_RIGHT) {
                this.shared.direction = KeyName.ARROW_RIGHT;
            }
            if (evt.keyCode == KeyName.ARROW_LEFT) {
                this.shared.direction = KeyName.ARROW_LEFT;
            }
            if (evt.keyCode == KeyName.ARROW_UP) {
                this.shared.direction = KeyName.ARROW_UP;
            }
            if (evt.keyCode == KeyName.ARROW_DOWN) {
                this.shared.direction = KeyName.ARROW_DOWN;
            }
        });
    }
    update(gameFeatures: GameFeatures): void {
        if (this.shared.nextPos !== undefined) {
            this.x = this.shared.nextPos.x;
            this.y = this.shared.nextPos.y;
        }
    }
    render(gameFeatures: GameFeatures): void {
        if (this.shared.nextPos !== undefined) {
            rectangleShape(this.shared.nextPos, gameFeatures);
        }
        rectangleShape(this, gameFeatures);
    }

    public nextStep(keyName: KeyName): Layer {
        if (keyName === KeyName.ARROW_RIGHT) {
            return <Layer>{ ...this, x: this.x + this.vx, y: this.y, fillStyle: '#a777b7' };
        }
        if (keyName === KeyName.ARROW_LEFT) {
            return <Layer>{ ...this, x: this.x - this.vx, y: this.y, fillStyle: '#cf9f00' };
        }
        if (keyName === KeyName.ARROW_UP) {
            return <Layer>{ ...this, x: this.x, y: this.y - this.vy, fillStyle: '#cf4f2f' };
        }
        if (keyName === KeyName.ARROW_DOWN) {
            return <Layer>{ ...this, x: this.x, y: this.y + this.vy, fillStyle: '#479f57' };
        }
        return this;
    }
}
