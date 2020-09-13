import React from 'react';
import Sketch from "react-p5";
import {Branch} from './classes/Branch';
import {getRandomArbitrary, degreesToRadians} from './utils';

let branchRoot;
let windTime = 0;

const drawLeaf = (p5, leaf) => {
  p5.fill('rgba(233, 69, 96, 0.5)');
  p5.rotate(degreesToRadians(180 + leaf.rotationDelta));
  p5.beginShape();
    p5.curveVertex(0, 0);
    p5.curveVertex(0, 0);
    p5.curveVertex(2 * leaf.leafMagnitude, 2 * leaf.leafMagnitude);
    p5.curveVertex(0, 5 * leaf.leafMagnitude);
    p5.curveVertex(-2 * leaf.leafMagnitude, 2 * leaf.leafMagnitude);
    p5.curveVertex(0, 0);
    p5.curveVertex(0, 0);
  p5.endShape();
}

const drawBranch = (p5, branch) => {
  const bendMagnitude = branch.bendMagnitude;

  const leftBottom = [-(branch.width/2), 0];
  const leftLower = [-(branch.width/2) + bendMagnitude, -branch.length * .33];
  const leftUpper = [-(branch.width/2) - bendMagnitude, -branch.length * .66];
  const leftTop = [-(branch.width/3), -branch.length];
  const rightBottom = [(branch.width/2), 0];
  const rightLower = [(branch.width/2) + bendMagnitude, -branch.length * .33];
  const rightUpper = [(branch.width/2) - bendMagnitude, -branch.length * .66];
  const rightTop = [(branch.width/5), -branch.length];

  p5.push();
  p5.fill('rgba(255, 255, 255, 1)');
  p5.noStroke();
  p5.rotate(branch.rotation);
  p5.beginShape();
  p5.curveVertex(...leftBottom);
  p5.curveVertex(...leftBottom);
  p5.curveVertex(...leftLower);
  p5.curveVertex(...leftUpper);
  p5.curveVertex(...leftTop);
  p5.curveVertex(...rightTop);
  p5.curveVertex(...rightUpper);
  p5.curveVertex(...rightLower);
  p5.curveVertex(...rightBottom);
  p5.curveVertex(...rightBottom);
  p5.endShape('CLOSE');
  p5.translate(0, -branch.length); // Move to the end of the branch

  for (let i = 0; i < branch.branches.length; i++) {
    const nextBranch = branch.branches[i];
    p5.push();
    p5.translate(0, nextBranch.startingPoint);
    drawBranch(p5, nextBranch);
    p5.pop();
  }


  for (let i = 0; i < branch.leaves.length; i++) {
    const leaf = branch.leaves[i];
    p5.push();
    p5.translate(0, -branch.length);
    drawLeaf(p5, leaf);
    p5.pop();
  }

  p5.pop();
}
 
export default (props) => {
    const width = 800;
    const height = 800;

    const drawBackground = (p5) => {
      p5.noStroke();
      p5.fill('#0f3460');
      p5.rect(0, height-150, width, 150);
      p5.fill('#0f3460');
      p5.rect(0, height-250, width, 100);
      p5.fill('#16213e');
      p5.rect(0, height-450, width, 200);
      p5.fill('#1a1a2e');
      p5.rect(0, 0, width, 350);
    }
 
    const setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        p5.createCanvas(width, height).parent(canvasParentRef);
        branchRoot = branchRoot || new Branch(0, 5, 0);
    };
 
    const draw = (p5) => {
      const windMagnitude = p5.map(p5.noise(windTime), 0, 1, -1, 1, true);

      p5.clear();
      drawBackground(p5);
      p5.frameRate(30);
      p5.translate(width/2, height - 100);
      branchRoot.applyWindRotation(windMagnitude);
      drawBranch(p5, branchRoot);
      windTime = windTime + 0.01;
    };
 
    return <Sketch setup={setup} draw={draw} />;
};
