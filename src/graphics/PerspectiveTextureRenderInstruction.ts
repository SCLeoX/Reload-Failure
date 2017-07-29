/**
 * Represents a render instruction which renders perspective texture onto the
 * screen with respect to the given point of view.
 */
import { PerspectiveTexture } from "./Texture";
import RenderInstruction from './RenderInstruction';
import Segment from "../geometry/Segment";
import Vector2 from "../geometry/Vector2";

export default class PerspectiveTextureRenderInstruction extends RenderInstruction {

  public base: Segment;
  public pov: Vector2;
  public texture: PerspectiveTexture;
  public bothSide: boolean;

  /** The distance from pov to the base segment. */
  public getPovToSpDistance() {
    return this.base.findSpPoint(this.pov).getDistanceTo(this.pov);
  }

  /** The actual height of the trapzoid which will be rendered to the screen. */
  public getActualHeight(): number {
    return this.getPovToSpDistance() * this.texture.shift / this.texture.topLineWidth * 2;
  }

  constructor(texture: PerspectiveTexture, base: Segment, pov: Vector2, bothSide?: boolean) {
    super();
    this.texture = texture;
    this.base = base;
    this.pov = pov;
    this.bothSide = bothSide || false;
  }

  public renderTo(ctx: CanvasRenderingContext2D, transform: [number, number, number, number, number, number]): void {
    const base = this.base;
    const p = this.pov;
    let negative = 1;
    if (base.getPointSide(p)) {
      if (this.bothSide) {
        negative = -1;
      } else {
        return;
      }
    }
    const p1 = base.point1;
    const p2 = base.point2;
    const width = this.texture.width;
    const height = this.texture.height;
    const length = base.getLength();
    const top = this.texture.topLineWidth;
    const shift = this.texture.shift;
    const ratioShiftToTop = shift / top;
    const dx = p1.x - ratioShiftToTop * (p2.x - p1.x);
    const dy = p1.y - ratioShiftToTop * (p2.y - p1.y);
    const scaleX = length / top;
    const sp = base.findSpPoint(p);
    const distance = this.getPovToSpDistance() * negative;
    const scaleY = distance / height * shift / top * 2;
    const reversed = p2.x < p1.x;
    const skew = p1.x === p2.x
      ? (-2 * (sp.y - (p1.y + p2.y) / 2) / (p2.y - p1.y)) * (shift * scaleX) / height
      : (-2 * (sp.x - (p1.x + p2.x) / 2) / (p2.x - p1.x)) * (shift * scaleX) / height;
    ctx.transform(1, 0, 0, 1, dx, dy);
    ctx.rotate(-Math.atan((p1.y - p2.y) / (p2.x - p1.x)) + (reversed ? Math.PI : 0));
    ctx.transform(scaleX, 0, skew, scaleY, 0, 0);
    ctx.drawImage(
      this.texture.content, 0, 0, width, height, 0, 0, width, height
    );
    ctx.setTransform.apply(ctx, transform);
  }
}