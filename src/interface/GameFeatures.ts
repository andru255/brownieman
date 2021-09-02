export interface GameFeatures {
    dt?: number;
    step?: number;
    canvas?: HTMLCanvasElement;
    ctx?: CanvasRenderingContext2D;
    on?: () => void;
    off?: () => void;
    isMob?: () => boolean;
}
