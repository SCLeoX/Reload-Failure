/**
 * A game object that has render instruction alone with it so it can be directly
 * rendered onto the canvas.
 */
import { LayerIdentifier } from './../graphics/Layer';
import Game from './../Game';
import GameObject from './GameObject';
import Renderable from './../graphics/Renderable';
import RenderInstruction from './../graphics/RenderInstruction';
abstract class RenderableGameObject extends GameObject implements Renderable {

  public updateRenderInstruction() {}

  abstract layer: LayerIdentifier;
  abstract renderInstruction: RenderInstruction | null;
  public isDeleted: boolean = false;
  public delete(): void {
    this.isDeleted = true;
  }
  public attachToGame(game: Game) {
    super.attachToGame(game);
    game.canvas.addToLayer(this.layer, this);
  }
}
export default RenderableGameObject;