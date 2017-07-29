/**
 * The score counter on the left top corner.
 */
import { LayerIdentifier } from './../graphics/Layer';
import { TickSubscriber } from './TickSubscriber';
import Character from './Character';
import Text from './Text';
import TextureGroup from './../graphics/TextureGroup';
import Vector2 from './../geometry/Vector2';
export default class Score extends Text implements TickSubscriber {

  TICK_SUBSCRIBER_FLAG: true = true;
  
  layer: LayerIdentifier = LayerIdentifier.GUI;

  public score: number = 0;

  public onTick(deltaT: number): void {
    if (this.character.alive) {
      this.score += deltaT;
      // Put the zeroes before the number so it always looks the same length.
      const int = Math.floor(this.score / 1000);
      let dec = String(this.score % 1000);
      if (dec.length === 3) {
        dec = dec.substr(0, 2);
      } else if (dec === '0') {
        dec = '00';
      } else if (dec.length == 1) {
        dec = dec + '0';
      }
      this.setText('SCORE: ' + int + '.' + dec);
    }
  }

  constructor(
    public font: TextureGroup,
    public character: Character,
  ) {
    super(font, '', 4, new Vector2(16, 16))
  }

}