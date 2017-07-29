/**
 * Represents a wall in the game.
 */
import { Impassable } from './Impassable';
import { LayerIdentifier } from './../graphics/Layer';
import { PerspectiveStaticRenderableGameObject } from './StaticRenderableObject';
import { WarFogSource } from './WarFogSource';
import RelativeVector2 from '../geometry/RelativeVector2';
import Segment from './../geometry/Segment';
import Vector2 from './../geometry/Vector2';

export default class Wall extends PerspectiveStaticRenderableGameObject implements WarFogSource, Impassable {
  
  WAR_FOG_FLAG: true = true;
  IMPASSABLE_FLAG: true = true;

  layer: LayerIdentifier = LayerIdentifier.WALL;

  readonly point1Offset = new Vector2(0, 0);
  readonly point2Offset = new Vector2(0, 0);

  public warFogBase: Segment = new Segment(
    new RelativeVector2(
      this.base.point1,
      this.point1Offset
    ),
    new RelativeVector2(
      this.base.point2,
      this.point2Offset
    )
  );
  public impassableBase: Segment = this.base;

  public updateWarFogBase() {
    const ratio = this.renderInstruction.getActualHeight() / this.renderInstruction.getPovToSpDistance();
    this.point1Offset.set(
      (this.base.point1.x - this.pov.x) * ratio,
      (this.base.point1.y - this.pov.y) * ratio
    );
    this.point2Offset.set(
      (this.base.point2.x - this.pov.x) * ratio,
      (this.base.point2.y - this.pov.y) * ratio
    );

  }
  
  public updateImpassableBase() {}

}