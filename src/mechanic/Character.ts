/**
 * Represents the main character of the game.
 */
import { Impassable, isImpassable } from './Impassable';
import { Key } from './../Input';
import { LayerIdentifier } from './../graphics/Layer';
import { PixelTexture } from './../graphics/Texture';
import { Query } from './../ObjectsPool';
import { RotatablePixelStaticRenderableGameObject } from './StaticRenderableObject';
import { TickSubscriber } from './TickSubscriber';
import Game from './../Game';
import Segment from './../geometry/Segment';
import Vector2 from './../geometry/Vector2';
export default class Character extends RotatablePixelStaticRenderableGameObject implements TickSubscriber {

  TICK_SUBSCRIBER_FLAG: true = true;
  
  layer: LayerIdentifier = LayerIdentifier.PLAYER;

  public impassableQuery: Query<Impassable>;
  public speed: number = 300;
  public alive: boolean = true;
  public fov: number = 0;
  public startFov: number = 0;
  public targetFov: number = Math.PI * 2 / 3;
  public fovChangeTimer: number = 0;

  public onTick(deltaT: number): void {
    if (!this.game) {
      return;
    }

    if (this.fov === this.targetFov || this.fovChangeTimer >= 1) {
      this.fovChangeTimer = 0;
      this.startFov = this.fov = this.targetFov;
    } else {
      this.fovChangeTimer += 0.03;
      const t = this.fovChangeTimer;
      this.fov = this.startFov +
        (this.targetFov - this.startFov) *
          (t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1)
    }

    const input = this.game.input;
    const mousePosition = input.mousePosition;

    const centerX = this.game.canvas.width / 2;
    const centerY = this.game.canvas.height / 2;

    if (this.alive) {

      { // Facing
        if (mousePosition.x === centerX) {
          this.angle = mousePosition.y > centerY ? Math.PI / 2 : Math.PI / 2 * 3;
        } else {
          this.angle = Math.atan((mousePosition.y - centerY) / (mousePosition.x - centerX));
        }
        if (mousePosition.x < centerX) {
          this.angle += Math.PI;
        }
      }

      { // Movement
        let xDirection = 0;
        if (input.isKeyPressed(Key.A)) {
          xDirection -= 1;
        }
        if (input.isKeyPressed(Key.D)) {
          xDirection += 1;
        }
        let yDirection = 0;
        if (input.isKeyPressed(Key.W)) {
          yDirection -= 1;
        }
        if (input.isKeyPressed(Key.S)) {
          yDirection += 1;
        }
        let distance = this.speed * deltaT / 1000;
        let angle: number | null = null;
        if (yDirection > 0) {
          if (xDirection > 0) {
            angle = Math.PI / 4;
          } else if (xDirection === 0) {
            angle = Math.PI / 2;
          } else {
            angle = Math.PI / 4 * 3;
          }
        } else if (yDirection === 0) {
          if (xDirection > 0) {
            angle = 0;
          } else if (xDirection < 0) {
            angle = Math.PI;
          } 
        } else if (yDirection < 0) {
          if (xDirection > 0) {
            angle = Math.PI / 4 * 7;
          } else if (xDirection === 0) {
            angle = Math.PI / 2 * 3;
          } else {
            angle = Math.PI / 4 * 5;
          }
        }
        if (angle !== null) {
          const newPosition = this.position.clone().moveAngleDistance(angle, distance);
          const displacement = new Segment(this.position, newPosition);
          let flag = false;
          for (let impassable of this.impassableQuery.results) {
            if (impassable.updateImpassableBase !== null) {
              impassable.updateImpassableBase();
            }
            if (displacement.intersectWith(impassable.impassableBase) !== null) {
              flag = true;
              break;
            }
          }
          if (!flag) {
            this.position.set(newPosition.x, newPosition.y);
          }
        }
      }
    }

  }

  constructor(
    public aliveTexture: PixelTexture,
    public corpseTexture: PixelTexture,
    initialPosition: Vector2
  ) {
    super(aliveTexture, initialPosition, 8, new Vector2(8, 16));
  }

  public attachToGame(game: Game) {
    super.attachToGame(game);
    this.impassableQuery = game.objectsPool.createQuery(isImpassable);
  }

  public kill() {
    this.alive = false;
    this.targetFov = Math.PI * 2;
    this.changeTexture(this.corpseTexture);
  }

}