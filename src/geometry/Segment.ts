/**
 * Represents a segment.
 */
import Line from './Line';
import Vector2 from "./Vector2";
export default class Segment extends Line {
  public isInRange(point: Vector2): boolean {
    return this.isPointInside(point);
  }
  public getLength(): number {
    return this.point1.getDistanceTo(this.point2);
  }
}