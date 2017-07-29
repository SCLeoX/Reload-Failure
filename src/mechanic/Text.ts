import { CHARACTER_SPACE } from './../Constants';
import { OffscreenCanvasRenderInstruction } from './../graphics/OffscreenCanvasRenderInstruction';
import RelativeVector2 from './../geometry/RelativeVector2';
import RenderableGameObject from './RenderableGameObject';
import RenderInstruction from './../graphics/RenderInstruction';
import RenderInstructionArray from './../graphics/RenderInstructionArray';
import TextureGroup from './../graphics/TextureGroup';
import Vector2 from './../geometry/Vector2';
/**
 * A game object that will be rendered onto the screen as a text box.
 */
abstract class text extends RenderableGameObject {
  
  readonly font: TextureGroup;

  public renderInstruction: RenderInstructionArray = new RenderInstructionArray();
  public text: string;
  readonly scale: number;
  readonly position: Vector2;

  constructor(font: TextureGroup, text: string, scale?: number, position?: Vector2) {
    super();
    this.font = font;
    this.text = text;
    this.scale = scale || 1;
    this.position = position || new Vector2(0, 0);
    this.resetInstructions();
  }

  private resetInstructions() {
    const instructions: Array<RenderInstruction> = [];
    let shift = 0;
    for (let letter of this.text) {
      const texture = this.font.get(letter);
      instructions.push(new OffscreenCanvasRenderInstruction(
        texture.content,
        new RelativeVector2(this.position, new Vector2(shift, 0)),
        this.scale
      ));
      shift += (CHARACTER_SPACE + texture.width) * this.scale;
    }
    this.renderInstruction.renderInstructions = instructions;
  }

  public setText(newText: string) {
    this.text = newText;
    this.resetInstructions();
  }

}
export default text;