/**
 * Represents a line (or a ray or segment when extended).
 */
import TwoPointsBundle from './TwoPointsBundle';
import Vector2 from './Vector2';
export default class Line extends TwoPointsBundle {
  constructor(point1: Vector2, point2: Vector2) {
    super(point1, point2);
  }

  /**
   * Calculates the slope of this line.
   */
  public getSlope(): number {
    const slope: number = (this.point2.y - this.point1.y) / (this.point2.x - this.point1.x);
    // Always use postive Infinity for vertical line
    if (slope === -Infinity) {
      return Infinity;
    } else {
      return slope;
    }
  }

  /**
   * Give a point which is guaranteed on the line which this geometry is located
   * on. Returns whether this point is on this geometry. (Lines are always true,
   * but not always for rays or segments.)
   * @param Vector2 The point that is being checked
   */
  public isInRange(point: Vector2): boolean {
    return true;
  }

  /**
   * Get the intersection point where this line and other meets, assuming both
   * lines are lines (so they are not segments nor rays). If the two lines are
   * parallel, return null.
   * @param Vector2 Another line being tested on
   */
  private intersectWithLine(line2: Line): Vector2 | null {
    const line1: Line = this;
    const line1Slope: number = line1.getSlope();
    const line2Slope: number = line2.getSlope();
    // Parallel
    if (line1Slope === line2Slope) {
      return null;
    }
    // Since in this case we only need to worry about lines, we only need a
    // point and a slope to represent a line.
    let point1: Vector2; // The point with larger slope
    let slope1: number; // point1's slope
    let point2: Vector2; // The point with smaller slope
    let slope2: number; // point2's slope
    if (line1Slope > line2Slope) {
      point1 = line1.point1;
      slope1 = line1Slope;
      point2 = line2.point1;
      slope2 = line2Slope;
    } else {
      point1 = line2.point1;
      slope1 = line2Slope;
      point2 = line1.point1;
      slope2 = line1Slope;
    }
    // One of two lines is vertical
    if (slope1 === Infinity) {
      return new Vector2(point1.x, point2.y + slope2 * (point1.x - point2.x));
    }
    // First, align two points into same vertical line by moving point1
    const deltaX: number = point2.x - point1.x;
    point1 = point1.clone().addNum(deltaX, deltaX * slope1);
    const moveLeft: number = (point1.y - point2.y) / (slope1 - slope2);
    return new Vector2(
      point1.x - moveLeft,
      point2.y - slope2 * moveLeft
    );
  }

  /**
   * Check if this line (or segment or ray if extended) intersect with other
   * line (or segment or ray if extended). This is based on method
   * Line#intersectWithLine, and then using Line#isInRange to check if the
   * intersection is actually on the line/segment/ray.
   * @param otherLine 
   */
  public intersectWith(otherLine: Line): Vector2 | null {
    const intersection: Vector2 | null = this.intersectWithLine(otherLine);
    if (intersection === null) {
      return null;
    }
    if (this.isInRange(intersection) && otherLine.isInRange(intersection)) {
      return intersection;
    }
    return null;
  }
  /**
   * Find the perpendicular foot of this line and another point.
   * @param point
   */
  public findSpPoint(point: Vector2) {
    // Idea took from http://stackoverflow.com/a/12499474/
    const px = this.point2.x - this.point1.x;
    const py = this.point2.y - this.point1.y;
    const dAB = px * px + py * py;
    const u = ((point.x - this.point1.x) * px + (point.y - this.point1.y) * py) / dAB;
    return new Vector2(this.point1.x + u * px, this.point1.y + u * py);
  }
  /**
   * Get the y = mx + b expression of the current line.
   */
  public getExpression(): [number, number] | null {
    const slope = this.getSlope();
    if (slope === Infinity) {
      return null;
    }
    return [slope, this.point1.y - this.point1.x * slope];
  }
  /**
   * Find which side the given point is located alone this line.
   * @param point
   */
  public getPointSide(point: Vector2): boolean {
    const expression = this.getExpression();
    if (expression === null) {
      if (this.point1.y < this.point2.y) {
        return point.x < this.point1.x;
      } else {
        return point.x > this.point1.x;
      }
    } else {
      return (point.y > expression[0] * point.x + expression[1]) !== (this.point1.x > this.point2.x);
    }
  }
}