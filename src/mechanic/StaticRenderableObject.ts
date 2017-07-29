import { PixelTexture, PerspectiveTexture } from "../graphics/Texture";
import { OffscreenCanvasRenderInstruction, RotatableOffscreenCanvasRenderInstruction } from './../graphics/OffscreenCanvasRenderInstruction';
import PerspectiveTextureRenderInstruction from "../graphics/PerspectiveTextureRenderInstruction";
import RenderableGameObject from './RenderableGameObject';
import RenderInstruction from './../graphics/RenderInstruction';
import Segment from "../geometry/Segment";
import VariableTexture from './../graphics/VariableTexture';
import Vector2 from './../geometry/Vector2';

/**
 * A renderble game object which uses pixel render instruction.
 */
export abstract class PixelStaticRenderableGameObject extends RenderableGameObject {

  public texture: PixelTexture;
  public position: Vector2;
  public renderInstruction: OffscreenCanvasRenderInstruction;
  public scale: number;

  constructor(texture: PixelTexture, position: Vector2, scale?: number, skipRenderInstructionCreation?: true) {
    super();
    this.texture = texture;
    this.position = position;
    this.scale = scale || 1;
    if (!skipRenderInstructionCreation) {
      this.renderInstruction = new OffscreenCanvasRenderInstruction(this.texture.content, position, this.scale);
    }
  }

  public updateRenderInstruction() {
    this.renderInstruction.scale = this.scale;
  }

  public changeTexture(texture: PixelTexture) {
    this.texture = texture;
    this.renderInstruction.image = texture.content;
  }

}

/**
 * A renderble game object which uses rotatable pixel render instruction.
 */
export abstract class RotatablePixelStaticRenderableGameObject extends PixelStaticRenderableGameObject {

  public originOffset: Vector2;
  public angle: number;

  constructor(texture: PixelTexture, position: Vector2, scale?: number, originOffset?: Vector2, angle?: number) {
    super(texture, position, scale, true);
    this.originOffset = originOffset || new Vector2(0, 0);
    this.angle = angle || 0;
    this.renderInstruction = new RotatableOffscreenCanvasRenderInstruction(this.texture.content, position, this.scale, this.originOffset, this.angle);
  }

  public updateRenderInstruction() {
    super.updateRenderInstruction();
    (this.renderInstruction as RotatableOffscreenCanvasRenderInstruction).angle = this.angle;
  }

}

/**
 * A renderble game object which uses perspective render instruction.
 */
export abstract class PerspectiveStaticRenderableGameObject extends RenderableGameObject {

  public texture: PerspectiveTexture;
  public base: Segment;
  public pov: Vector2;

  public renderInstruction: PerspectiveTextureRenderInstruction;

  constructor(texture: PerspectiveTexture, base: Segment, pov: Vector2) {
    super();
    this.texture = texture;
    this.base = base;
    this.pov = pov;
    this.renderInstruction = new PerspectiveTextureRenderInstruction(this.texture, base, pov);
  }

}