export interface GameFeatures {
    dt?: number;
    canvas?: HTMLCanvasElement;
    ctx?: CanvasRenderingContext2D;
    on?: () => void;
    off?: () => void;
    isMob?: () => boolean;
}
