export function degreesToRadians (degrees) {
    return (degrees * Math.PI / 180);
}

export function getRandomArbitrary(min, max) {
    if (!max) {
        return Math.floor(Math.random() * Math.floor(min));
    }

    return Math.floor(Math.random() * (max - min) + min);
}

export function delayFn(fn, delay = 16) {
    setTimeout(fn, delay);
}
