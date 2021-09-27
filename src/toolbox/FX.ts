export const Easing = {
    linear: (time: number, begin: number, change: number, duration: number): number => {
        const diff = change - begin;
        const f = time / duration;
        if (diff > time) {
            return begin + diff * f;
        }
        if (diff < -time) {
            return begin - (begin - change) * f;
        }
        return change;
    },
};

export interface LiteralRGBA {
    red: number;
    green: number;
    blue: number;
    alpha: number;
}

const HexToRGBA = (hexValue: string): LiteralRGBA => {
    if (!/^#([A-Fa-f0-9]{3}){1,2}([A-Fa-f0-9]{2})?$/.test(hexValue)) {
        throw `Bad Hex: ${hexValue}`;
    }
    let color = hexValue.substring(1).split('');
    let alpha = 1;
    const getWithHexPrefix = (value: string) => `0x${value}`;
    const getRGBATplOBJ = (hexColor, alphaValue): LiteralRGBA => {
        return {
            red: (hexColor >> 16) & 255,
            green: (hexColor >> 8) & 255,
            blue: hexColor & 255,
            alpha: alphaValue,
        };
    };

    if (color.length == 3) {
        color = [color[0], color[0], color[1], color[1], color[2], color[2]];
        return getRGBATplOBJ(getWithHexPrefix(color.join('')), alpha);
    }

    if (color.length == 6) {
        return getRGBATplOBJ(getWithHexPrefix(color.join('')), alpha);
    }

    let _color = getWithHexPrefix(color.join(''));
    const _alpha = parseInt(getWithHexPrefix(_color.substring(8, 10))) / 255;
    _color = _color.substring(0, 8);
    return getRGBATplOBJ(_color, _alpha);
};

const RGBAtoHEX = (literalRGBA: LiteralRGBA): string => {
    const red = (literalRGBA.red | (1 << 8)).toString(16).slice(1);
    const green = (literalRGBA.green | (1 << 8)).toString(16).slice(1);
    const blue = (literalRGBA.blue | (1 << 8)).toString(16).slice(1);
    const alpha = ((literalRGBA.alpha * 255) | (1 << 8)).toString(16).slice(1);
    return `#${red}${green}${blue}${alpha}`;
};
// animations

// linear color transition
export function linearColor(time: number, begin: LiteralRGBA, change: LiteralRGBA, duration: number): LiteralRGBA {
    const red = Easing.linear(time, begin.red, change.red, duration);
    const green = Easing.linear(time, begin.green, change.green, duration);
    const blue = Easing.linear(time, begin.blue, change.blue, duration);
    const _alpha = Easing.linear(time, begin.alpha, change.alpha, duration);
    return {
        red,
        green,
        blue,
        alpha: Number(`${Math.round(Number(`${_alpha}e3`))}e-3`),
    };
}

export function isEqualToRGBA(a: LiteralRGBA, b: LiteralRGBA) {
    return a.red == b.red && a.green == b.green && a.blue == b.blue && a.alpha == b.alpha;
}

export const fxColor = {
    HexToRGBA: HexToRGBA,
    RGBAtoHEX: RGBAtoHEX,
};
