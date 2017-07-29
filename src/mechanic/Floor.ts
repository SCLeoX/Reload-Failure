/**
 * Represents a floor in the game.
 */
import { LayerIdentifier } from './../graphics/Layer';
import { PixelStaticRenderableGameObject } from './StaticRenderableObject';

export default class Floor extends PixelStaticRenderableGameObject {

  layer: LayerIdentifier = LayerIdentifier.FLOOR;

}