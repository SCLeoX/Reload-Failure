/**
 * The war fog of the game. Which is essentially the black area in the game.
 */
import { LayerIdentifier } from './../graphics/Layer';
import { Query, ObjectsPool } from './../ObjectsPool';
import { TickSubscriber } from './TickSubscriber';
import { WarFogSource, isWarFogSource } from './WarFogSource';
import * as _ from 'lodash';
import Camera from './Camera';
import Character from "./Character";
import Game from './../Game';
import Ray from './../geometry/Ray';
import RelativeVector2 from './../geometry/RelativeVector2';
import RenderableGameObject from './RenderableGameObject';
import RenderInstruction from './../graphics/RenderInstruction';
import Room from './Room';
import Segment from './../geometry/Segment';
import Vector2 from './../geometry/Vector2';
class WarFogRenderInstruction extends RenderInstruction {

  public points: Array<Vector2> = [];

  constructor(
    public camera: Camera
  ) {
    super();
  }

  public renderTo(ctx: CanvasRenderingContext2D, transform: [number, number, number, number, number, number]): void {
    const points = this.points;
    if (points.length === 0) {
      return;
    }
    // First fill everything with black
    ctx.fillStyle = "black";
    ctx.fillRect(this.camera.position.x - ctx.canvas.width / 2, this.camera.position.y - ctx.canvas.height / 2, ctx.canvas.width, ctx.canvas.height);
    // Start to "carve out" the visible zone
    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath();
    // Use destination-out mode to remove stuff
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fill();
    // Set back after done
    ctx.globalCompositeOperation = 'source-over';
  }
}
export default class WarFog extends RenderableGameObject {

  layer: LayerIdentifier = LayerIdentifier.LIGHTING;

  public renderInstruction: WarFogRenderInstruction;

  public query: Query<WarFogSource>;
  public pov: Vector2;
  public character: Character;

  public attachToGame(game: Game) {
    super.attachToGame(game);
    this.query = (this.objectsPool as ObjectsPool).createQuery<WarFogSource>(isWarFogSource);
  }
  
  constructor(character: Character, camera: Camera) {
    super();
    this.renderInstruction = new WarFogRenderInstruction(camera);
    this.pov = character.position;
    this.character = character;
  }

  public updateRenderInstruction() {
    // Get all objects that will produce war fog.
    this.query.updateResults();
    const objs = this.query.results;
    // Obtaining those objects' war fog segments.
    const segments = _.flatten(objs.map(obj => {
      if (obj.updateWarFogBase) {
        obj.updateWarFogBase();
      }
      return obj.warFogBase;
    }));
    const origin = this.pov;
    // Fot the sake of performance, we use same ray object to cast all light,
    // which will save some GC.
    const reusedTarget = new Vector2(0, 0);
    const reusedRay = new Ray(origin, reusedTarget);
    // Cast a light to a given location, return the first encounter.
    const shootLight = (targetX: number, targetY: number): Vector2 | null => {
      let closetAt: Vector2 | null = null;
      let closetDistance: number = Infinity;
      // Set target.
      reusedTarget.set(targetX, targetY);
      for (let segment of segments) {
        // Check for intersection.
        const intersection = reusedRay.intersectWith(segment);
        if (intersection === null) {
          continue;
        }
        const distance = intersection.getDistanceTo(origin);
        // If this intersection is closer then the previous one, record it.
        if (distance < closetDistance) {
          closetDistance = distance;
          closetAt = intersection;
        }
      }
      return closetAt;
    }
    const px = this.pov.x;
    const py = this.pov.y;
    const characterAngle = this.character.angle;
    const fov = this.character.fov;
    this.renderInstruction.points = _(segments)
      // Cast three lines towards the surroundings of each endpoint of each
      // segment.
      .map(segment => [
        [segment.point1.x + 0.01, segment.point1.y       ],
        [segment.point1.x - 0.01, segment.point1.y + 0.01],
        [segment.point1.x - 0.01, segment.point1.y - 0.01],
        [segment.point2.x + 0.01, segment.point2.y       ],
        [segment.point2.x - 0.01, segment.point2.y + 0.01],
        [segment.point2.x - 0.01, segment.point2.y - 0.01],
      ])
      .flatten()
      .concat([
        [
          px + Math.cos(characterAngle + fov / 2) * 100,
          py + Math.sin(characterAngle + fov / 2) * 100
        ],
        [
          px + Math.cos(characterAngle - fov / 2) * 100,
          py + Math.sin(characterAngle - fov / 2) * 100
        ],
      ])
      .map(([x, y]) => shootLight(x, y))
      .filter(point => point !== null)
      .map(point => [ point, origin.getAngleWith(point as Vector2) ])
      .sortBy(pointAngle => pointAngle[1])
      .map(pointAngle => {
        const angle = (pointAngle as [Vector2, number])[1];
        let bound1 = characterAngle - fov / 2 - 0.01;
        let bound2 = characterAngle + fov / 2 + 0.01;
        if (bound1 <= 0) {
          bound1 += 2 * Math.PI;
          bound2 += 2 * Math.PI;
        }
        if ((angle > bound1 && angle < bound2) || (angle + 2 * Math.PI > bound1 && angle + 2 * Math.PI < bound2)) {
          return pointAngle[0];
        } else {
          return this.pov;
        }
      })
      .value() as Array<Vector2>;
  }
  
}