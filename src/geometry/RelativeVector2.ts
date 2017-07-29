/**
 * Represents a Vector2. However, this Vector2 is based on another 2 Vector2.
 * So when any of the source Vector2 is changed, this will change as well.
 */
import Vector2, { getAngle } from './Vector2';
export default class RelativeVector2 implements Vector2 {

  readonly source: Vector2;
  readonly delta: Vector2;

  constructor(
    source: Vector2,
    delta: Vector2,
  ) {
    this.source = source;
    this.delta = delta;
  }

  public get x() {
    return this.source.x + this.delta.x;
  }

  public set x(value: number) {
    this.delta.x = value - this.source.x;
  }

  public get y() {
    return this.source.y + this.delta.y;
  }

  public set y(value: number) {
    this.delta.y = value - this.source.y;
  }

  public clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }
  public add(other: Vector2): Vector2 {
    this.delta.add(other);
    return this; 
  }
  public addNum(x: number, y: number): Vector2 {
    this.delta.addNum(x, y);
    return this;
  }
  public set(x: number, y: number): Vector2 {
    this.delta.x = x - this.source.x;
    this.delta.y = y - this.source.y;
    return this;
  }
  public subtract(other: Vector2): Vector2 {
    this.delta.subtract(other);
    return this;
  }
  public subtractNum(x: number, y: number): Vector2 {
    this.delta.subtractNum(x, y);
    return this;
  }
  public getDistanceTo(other: Vector2): number {
    return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
  }
  public moveAngleDistance(angle: number, distance: number): Vector2 {
    this.delta.moveAngleDistance(angle, distance);
    return this;
  }
  public getAngleWith(other: Vector2): number {
    return getAngle(this, other);
  }

}