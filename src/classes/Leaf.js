import {getRandomArbitrary} from '../utils';

export class Leaf {
    constructor() {
        this.rotationDelta = getRandomArbitrary(-30, 30);
        this.leafMagnitude = getRandomArbitrary(50, 200) / 100;
    }
  }
