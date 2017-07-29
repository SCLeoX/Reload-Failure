/**
 * Represents a render instruction whih actually tells how to render.
 */
import Canvas from './Canvas';
abstract class RenderInstruction {
  abstract renderTo(canvas: CanvasRenderingContext2D, transform: [number, number, number, number, number, number]): void;
}
export default RenderInstruction;