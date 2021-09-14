import padMobileLayer from '@layer/PadMobile';
import ViewportLayer from 'src/scene/Viewport';

export interface GameFeatures {
    dt?: number;
    step?: number;
    canvas?: HTMLCanvasElement;
    viewport?: ViewportLayer;
    padMobile?: padMobileLayer;
    ctx?: CanvasRenderingContext2D;
    on?: () => void;
    off?: () => void;
    isMob?: () => boolean;
}
