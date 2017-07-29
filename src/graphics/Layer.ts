/**
 * Represents a layer in the canvas.
 */
import Canvas from './Canvas';
export class Layer {
  public htmlCanvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;

  public transform: Array<number> = [1, 0, 0, 1, 0, 0];

  constructor(
    public canvas: Canvas,
    public name: string,
  ) {
    // Create the off-screen canvas for this layer.
    const htmlCanvas = this.htmlCanvas = document.createElement('canvas');
    htmlCanvas.width = canvas.width;
    htmlCanvas.height = canvas.height;
    htmlCanvas.style.position = 'absolute';
    const ctx = htmlCanvas.getContext('2d');
    if (ctx === null) {
      return;
    }
    // Turn off the antialiasing
    ctx.imageSmoothingEnabled = false;
    (ctx as any).msImageSmoothingEnabled = false; // IE
    this.ctx = ctx;
  };
}
export enum LayerIdentifier {
  FLOOR    = 0,
  OBJECT   = 1,
  WALL     = 2,
  PLAYER   = 3,
  ENEMY    = 4,
  LIGHTING = 5,
  GUI      = 6,
  CURSOR   = 7,
}