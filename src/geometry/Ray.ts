/**
 * Represents a Ray.
 */
import Line from './Line';
import Vector2 from './Vector2';
export default class Ray extends Line {
  public isInRange(point: Vector2): boolean {
    if (this.point2.x !== this.point1.x) {
      return (this.point2.x > this.point1.x) === (point.x > this.point1.x);
    } else {
      return (this.point2.y > this.point1.y) === (point.y > this.point1.y);
    }
  }
}