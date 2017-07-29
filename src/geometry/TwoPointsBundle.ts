/**
 * The base class for anything that is essentials two points. For example,
 * rectangulars, lines, etc...
 */
import Vector2 from './Vector2';
class TwoPointsBundle {

  public point1: Vector2;
  public point2: Vector2

  constructor(
    point1: Vector2,
    point2: Vector2,
  ) {
    this.point1 = point1;
    this.point2 = point2;
  }

  /**
   * To calculate if the given point is inside the rectangular constructed by
   * the two points in this bundle.
   * @param point 
   */
  protected isPointInside(point: Vector2): boolean {
    return (this.point1.x === this.point2.x
      ? Math.abs(point.x - this.point1.x) < 0.1 // Preventing rounding errors.
      : (point.x >= Math.min(this.point1.x, this.point2.x)
        && point.x <= Math.max(this.point1.x, this.point2.x))
    )
    && (this.point1.y === this.point2.y
      ? Math.abs(point.y - this.point1.y) < 0.1
      : (point.y <= Math.max(this.point1.y, this.point2.y)
        && point.y >= Math.min(this.point1.y, this.point2.y))
    );
  }

};
export default TwoPointsBundle;