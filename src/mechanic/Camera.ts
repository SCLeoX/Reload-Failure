/**
 * Represents the camera which will always be on the same spot as the character.d
 */
import { LayerIdentifier } from './../graphics/Layer';
import { TickSubscriber } from './TickSubscriber';
import GameObject from './GameObject';
import Vector2 from './../geometry/Vector2';
export default class Camera extends GameObject implements TickSubscriber {

  TICK_SUBSCRIBER_FLAG: true = true;

  public onTick(deltaT: number): void {
    if (!this.game) {
      return;
    }
    const newTransform = [1, 0, 0, 1, -this.position.x + this.size.x / 2, -this.position.y + this.size.y / 2]
    const canvas = this.game.canvas;
    canvas.getLayer(LayerIdentifier.FLOOR).transform = newTransform;
    canvas.getLayer(LayerIdentifier.PLAYER).transform = newTransform;
    canvas.getLayer(LayerIdentifier.WALL).transform = newTransform;
    canvas.getLayer(LayerIdentifier.LIGHTING).transform = newTransform;
    canvas.getLayer(LayerIdentifier.ENEMY).transform = newTransform;
  }

  constructor(
    public position: Vector2,
    public size: Vector2,
  ) {
    super();
  }
}