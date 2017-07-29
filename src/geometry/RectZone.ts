/**
 * Represents a rectangular zone.
 */
import TwoPointsBundle from './TwoPointsBundle'
import Vector2 from './Vector2';
export default class RectZone extends TwoPointsBundle {
  constructor(point1: Vector2, point2: Vector2) {
    super(point1, point2);
  }
  public isPointInside(point: Vector2): boolean {
    return super.isPointInside(point);
  }
}