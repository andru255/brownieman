import Layer from '@abstract/Layer';

export interface Tween {
    id: string;
    layer: Layer;
    property: string;
    target: any;
    duration: number;
    cb?: () => void;
}
