import RenderInstruction from './RenderInstruction';
import Vector2 from "../geometry/Vector2";

/**
 * Represents an off-screen canvas render instruction which basically renders a
 * picture from an off-screen canvas onto the target.
 */
export class OffscreenCanvasRenderInstruction extends RenderInstruction {

  public position: Vector2;
  public scale: number;
  public image: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement;

  constructor(
    image: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement,
    position: Vector2,
    scale?: number,
  ) {
    super();
    this.image = image;
    this.position = position;
    this.scale = scale || 1;
  }

  public renderTo(ctx: CanvasRenderingContext2D, originTransform: [number, number, number, number, number, number]): void {
    const width = this.image.width;
    const height = this.image.height;
    ctx.drawImage(
      this.image,
      0, 0, width, height,
      this.position.x,
      this.position.y,
      width * this.scale,
      height * this.scale
    );
  }

}

/**
 * Repredents an rotatable off-screen canvas render instruction which basically
 * rotate before put the picture onto the target.
 */
export class RotatableOffscreenCanvasRenderInstruction extends OffscreenCanvasRenderInstruction {

  public originOffset: Vector2;
  public angle: number;

  constructor(
    image: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement,
    position: Vector2,
    scale?: number,
    originOffset?: Vector2,
    angle?: number,
  ) {
    super(image, position, scale);
    this.originOffset = originOffset || new Vector2(0, 0);
    this.angle = angle || 0;
  }

  public renderTo(ctx: CanvasRenderingContext2D, originTransform: [number, number, number, number, number, number]): void {
    const width = this.image.width;
    const height = this.image.height;
    ctx.translate(
      this.position.x - this.originOffset.x / 2,
      this.position.y - this.originOffset.y / 2
    );
    ctx.rotate(this.angle);
    ctx.drawImage(
      this.image,
      0, 0, width, height, -this.originOffset.x, -this.originOffset.y,
      width * this.scale,
      height * this.scale
    );
    ctx.setTransform.apply(ctx, originTransform);
  }

}