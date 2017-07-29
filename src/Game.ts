/**
 * The entry point of the game.
 */
import { glyphs } from './assets/Font';
import { Input, ClickableZone } from './Input';
import { LayerIdentifier } from './graphics/Layer';
import { ObjectsPool, Query } from './ObjectsPool';
import { textures } from './assets/Textures';
import { TickSubscriber, isTickSubscriber } from './mechanic/TickSubscriber';
import Canvas from './graphics/Canvas';
import Character from './mechanic/Character';
import Floor from './mechanic/Floor';
import Initializer from './Initializer';
import RectZone from './geometry/RectZone';
import Segment from "./geometry/Segment";
import Text from './mechanic/Text';
import TextureGroup from './graphics/TextureGroup';
import Vector2 from './geometry/Vector2';
import Ray from './geometry/Ray';
class Wow extends RectZone {
  public a: Vector2 = new Vector2(1,2);
}
export default class Game {
  public input: Input;
  public canvas: Canvas;
  public objectsPool: ObjectsPool;
  public tickSubscribersQuery: Query<TickSubscriber>;
  public lastTickTime: number;
  constructor(
    private rootElement: HTMLCanvasElement,
    private window: Window,
  ) {
    const input = this.input = new Input(window);
    const canvas = this.canvas = new Canvas(this, rootElement);
    const objectsPool = this.objectsPool = new ObjectsPool();
    this.tickSubscribersQuery = objectsPool.createQuery<TickSubscriber>(isTickSubscriber);
    this.lastTickTime = new Date().getTime();
    (async () => {
      // Load the textures.
      await textures.load((current, total) => {
        console.info('Texture loaded: ' + current + '/' + total);
      });
      // Start the event loop.
      const self = this;
      requestAnimationFrame(function frame() {
        self.onAnimationFrame();
        requestAnimationFrame(frame);
      });
      // Initialize the level.
      new Initializer(this).initialize();
    })();
  }
  public onAnimationFrame() {
    const newTime = new Date().getTime();
    const deltaT = newTime - this.lastTickTime;
    this.lastTickTime = newTime;
    const tickSubscribers = this.tickSubscribersQuery.results;
    // At each tick, inform all the tick subscribers.
    for (let tickSubscriber of tickSubscribers) {
      tickSubscriber.onTick(deltaT);
    }
    // And then, render the canvas onto the screen.
    this.canvas.render();
  }
}