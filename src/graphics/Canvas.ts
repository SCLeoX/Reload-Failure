/**
 * Represents the entire canvas of this game.
 */
import { CANVAS_GC_AT } from './../Constants';
import { Layer, LayerIdentifier } from './Layer';
import * as _ from 'lodash';
import Game from './../Game';
import Renderable from './Renderable';
export default class Canvas {
  public layers: Array<Layer> = [];
  public layersItems: Array<Array<Renderable>> = [];
  public width: number = 1800;
  public height: number = 1000;
  public ctx: CanvasRenderingContext2D;
  constructor(
    public game: Game,
    public rootElement: HTMLCanvasElement,
  ) {
    // Creating layers.
    for (let i: number = 0; i < Object.keys(LayerIdentifier).length / 2; i++) {
      this.layers.push(new Layer(this, LayerIdentifier[i]));
      this.layersItems.push([]);
    }
    // Get the context object.
    this.ctx = rootElement.getContext('2d') as CanvasRenderingContext2D;
    // Turn off the antialiasing so it is pixel perfect.
    this.ctx.imageSmoothingEnabled = false;
    (this.ctx as any).msImageSmoothingEnabled = false; // IE
  }
  /**
   * Get a certain layer object.
   * @param layerIdentifier
   */
  public getLayer(layerIdentifier: LayerIdentifier): Layer {
    return this.layers[layerIdentifier];
  }
  /**
   * Add an item to a layer to be rendered.
   * @param layer
   * @param item 
   */
  public addToLayer(layer: LayerIdentifier, item: Renderable) {
    this.layersItems[layer].push(item);
  }
  /**
   * Render all layers into the HTML Canvas.
   */
  public render() {
    // For each off-screen canvas (layer)
    for (let i: number = 0; i < this.layers.length; i++) {
      const layerItems = this.layersItems[i];
      const layer = this.layers[i];
      const ctx = layer.ctx;
      // Reset the transform so it can be cleared.
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      // Apply the transfom for the particular canvas
      ctx.setTransform.apply(ctx, layer.transform);
      let deletedCount = 0;
      for (let item of layerItems) {
        // Not rendering deleted items.
        if (item.isDeleted) {
          deletedCount++;
          continue;
        }
        // If the renderable's render instruction can be updated, update it.
        if (item.updateRenderInstruction) {
          item.updateRenderInstruction();
        }
        // If the renderable has a renderInstruction, render it onto the layer.
        let instruction = item.renderInstruction;
        if (instruction === null) {
          continue;
        }
        instruction.renderTo(ctx, layer.transform as [number, number, number, number, number, number]);
      }
      // Render the layer onto the canvas.
      this.ctx.drawImage(layer.htmlCanvas, 0, 0);
      // If the deleted count hits the GC threshold, do a canvas GC
      // debugger;
      if (deletedCount >= CANVAS_GC_AT) {
        _.remove(layerItems, item => !item.isDeleted);
      }
    }
  }
}