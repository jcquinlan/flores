import {degreesToRadians, getRandomArbitrary, delayFn} from '../utils';
import {Leaf} from './Leaf';

export class Branch {
    constructor(startingPoint, width, rotation, previousBranchDepth) {
      this.startingPoint = startingPoint;
      this.width = width;
      this.originalRotation = rotation;
      this.rotation = rotation;
      this.length = this.calculateLength();
      this.branches = this.calculateBranches();
      this.bendMagnitude = this.calculateBendMagnitude();
      this.depth = (previousBranchDepth || 0) + 1;
      this.leaves = this.calculateLeaves();
    }
    
    calculateLeaves() {
        if (this.width < 5) {
            const leaves = [];
            const numOfLeaves = getRandomArbitrary(1, 5);
            for (let i = 0; i < numOfLeaves; i++) {
                leaves.push(new Leaf());
            }

            return leaves;
        }

        return [];
    }

    calculateBranches() {
        if (this.width < 1) return [];
        
        const numOfBranches = getRandomArbitrary(1, 3);
        const branches = [];
      
        for (let i = 0; i < numOfBranches; i++) {
            const isLeft = getRandomArbitrary(100) >= 50;
            const width = (getRandomArbitrary(80, 90) / 100) * this.width;
            const rotationBase = getRandomArbitrary(-30, 30) + this.rotation;
            const rotation = degreesToRadians(isLeft ? rotationBase * -1 : rotationBase);
            const startingPoint = getRandomArbitrary(this.length - (this.length / 2), this.length);
            
            branches.push(new Branch(startingPoint, width, rotation, this.depth));
        }

        // A fork represents a split at the end of a branch
        const numOfForks = getRandomArbitrary(2, 4);
        for (let i = 0; i < numOfForks; i++) {
            const isLeft = getRandomArbitrary(100) >= 50;
            const width = (getRandomArbitrary(10, 50) / 100) * this.width;
            const rotationBase = getRandomArbitrary(-30, 30) + this.rotation;
            const rotation = degreesToRadians(isLeft ? rotationBase * -1 : rotationBase);
        
            branches.push(new Branch(0, width, rotation, this.depth));
        } 
      
        return branches;
    }
    
    calculateLength() {
      return this.width * getRandomArbitrary(10, 35);  
    }

    calculateBendMagnitude() {
        return getRandomArbitrary(-this.width / 2, this.width / 2);
    }

    applyWindRotation(windRotationDelta) {
        const widthResistance = 5 - this.width; // IMPORTANT: the 5 here should always actually be the max width of tree
        const newRotation = this.rotation + (degreesToRadians(windRotationDelta) * widthResistance);
        const originalToCurrentRotationDelta = Math.abs(this.originalRotation - newRotation);

        if (originalToCurrentRotationDelta <= 1 * (5 - this.width) && this.width < 4) {
            this.rotation = newRotation;
        }

        this.branches.forEach(branch => {
            branch.applyWindRotation(windRotationDelta);
        });
    }
  }
