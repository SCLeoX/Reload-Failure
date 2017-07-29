/**
 * Represents a pair of values.
 */
export default class Vector2 {

  public x: number;
  public y: number;
  
  constructor(
    x: number,
    y: number,
  ) {
    this.x = x;
    this.y = y;
  }
  public clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }
  public add(other: Vector2): Vector2 {
    this.x += other.x;
    this.y += other.y;
    return this;
  }
  public addNum(x: number, y: number): Vector2 {
    this.x += x
    this.y += y
    return this;
  }
  public set(x: number, y: number): Vector2 {
    this.x = x;
    this.y = y;
    return this;
  }
  public subtract(other: Vector2): Vector2 {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  }
  public subtractNum(x: number, y: number): Vector2 {
    this.x -= x
    this.y -= y
    return this;
  }
  /**
   * Get this Vector2's distance to another on a plane.
   * @param other 
   */
  public getDistanceTo(other: Vector2): number {
    return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
  }
  /**
   * Try to move this Vector2 along an angled line for a certain distance.
   * @param angle 
   * @param distance 
   */
  public moveAngleDistance(angle: number, distance: number): Vector2 {
    return this.addNum(Math.cos(angle) * distance, Math.sin(angle) * distance);
  }
  /**
   * Get his Vector2's angle with another.
   * @param other 
   */
  public getAngleWith(other: Vector2): number {
    return getAngle(this, other);
  }
}

export function getAngle(point1: Vector2, point2: Vector2): number {
  if (point1.x === point2.x) {
    return point1.y < point2.y ? Math.PI / 2 : Math.PI / 2 * 3;
  } else {
    let angle = Math.atan((point1.y - point2.y) / (point1.x - point2.x));
    if (point1.x > point2.x) {
      angle += Math.PI;
    }
    return angle;
  }
}