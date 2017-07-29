/**
 * Which is just a border that moves alone with the camera. It is not used in
 * the current game but useful when testing in an open area where there is no
 * walls blocking the sight.
 */
import { WarFogSource } from './WarFogSource';
import Camera from './Camera';
import Game from './../Game';
import GameObject from './GameObject';
import RelativeVector2 from './../geometry/RelativeVector2';
import Segment from './../geometry/Segment';
import Vector2 from './../geometry/Vector2';

export default class CameraBorder extends GameObject implements WarFogSource {

  updateWarFogBase: (() => void) | null = null;
  WAR_FOG_FLAG: true = true;

  public warFogBase: Array<Segment>;

  public camera: Camera;

  public attachToGame(game: Game) {
    super.attachToGame(game);
    const halfWidth = game.canvas.width / 2;
    const halfHeight = game.canvas.height / 2;
    const camera = this.camera;
    this.warFogBase = [
      new Segment(
        new RelativeVector2(
          camera.position,
          new Vector2(-halfWidth, -halfHeight)
        ),
        new RelativeVector2(
          camera.position,
          new Vector2(halfWidth, -halfHeight)
        )
      ),
      new Segment(
        new RelativeVector2(
          camera.position,
          new Vector2(halfWidth, -halfHeight)
        ),
        new RelativeVector2(
          camera.position,
          new Vector2(halfWidth, halfHeight)
        )
      ),
      new Segment(
        new RelativeVector2(
          camera.position,
          new Vector2(halfWidth, halfHeight)
        ),
        new RelativeVector2(
          camera.position,
          new Vector2(-halfWidth, halfHeight)
        )
      ),
      new Segment(
        new RelativeVector2(
          camera.position,
          new Vector2(-halfWidth, halfHeight)
        ),
        new RelativeVector2(
          camera.position,
          new Vector2(-halfWidth, -halfHeight)
        )
      )
    ];
  }

  constructor(camera: Camera) {
    super();
    this.camera = camera;
  }

}