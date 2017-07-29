/**
 * Represents an array of render instructions so once require to render, all of
 * its sub render instructions are called in oreder so they all get rendered
 * out.
 */
import Canvas from './Canvas';
import RenderInstruction from './RenderInstruction';
export default class RenderInstructionArray extends RenderInstruction {

  public renderInstructions: Array<RenderInstruction>;

  constructor(instructions?: Array<RenderInstruction>) {
    super();
    this.renderInstructions = instructions || [];
  }

  public renderTo(canvas: CanvasRenderingContext2D, transform: [number, number, number, number, number, number]): void {
    const instructions: Array<RenderInstruction> = this.renderInstructions;
    for (let instruction of instructions) {
      instruction.renderTo(canvas, transform);
    }
  }
  
};