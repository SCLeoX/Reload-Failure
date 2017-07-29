/**
 * Represents the enemy TAS.
 */
import { LayerIdentifier } from './../../graphics/Layer';
import { PixelTexture, PerspectiveTexture } from './../../graphics/Texture';
import { RotatableOffscreenCanvasRenderInstruction } from './../../graphics/OffscreenCanvasRenderInstruction';
import { TickSubscriber } from './../TickSubscriber';
import Character from './../Character';
import PerspectiveTextureRenderInstruction from './../../graphics/PerspectiveTextureRenderInstruction';
import RelativeVector2 from './../../geometry/RelativeVector2';
import RenderableGameObject from './../RenderableGameObject';
import RenderInstruction from './../../graphics/RenderInstruction';
import RenderInstructionArray from './../../graphics/RenderInstructionArray';
import Segment from './../../geometry/Segment';
import Vector2 from './../../geometry/Vector2';
export default class TheAncientStone extends RenderableGameObject implements TickSubscriber {

  // Subscribe to the tick event so it is being updated every tick.
  TICK_SUBSCRIBER_FLAG: true = true;

  layer: LayerIdentifier = LayerIdentifier.ENEMY;

  private instructions: Array<RenderInstruction> = [];
  public renderInstruction: RenderInstructionArray = new RenderInstructionArray(this.instructions);
  public topOffset: Vector2 = new Vector2(0, 0);
  private side0RenderInstruction: PerspectiveTextureRenderInstruction;
  private topRenderInstruction: RotatableOffscreenCanvasRenderInstruction;

  constructor(
    topTexture: PixelTexture,
    side0Texture: PerspectiveTexture,
    side1Texture: PerspectiveTexture,
    side2Texture: PerspectiveTexture,
    side3Texture: PerspectiveTexture,
    public position: Vector2,
    public pov: Vector2,
    public target: Character,
  ) {
    super()
    // Add the top face and add it into the render instructions.
    this.instructions.push(this.topRenderInstruction = new RotatableOffscreenCanvasRenderInstruction(
      topTexture.content,
      new RelativeVector2(position, this.topOffset),
      8,
      new Vector2(32, 32)
    ));
    // Add the four side faces and add them into the render instructions.
    const leftTop = new RelativeVector2(position, new Vector2(-32, -32));
    const rightTop = new RelativeVector2(position, new Vector2(32, -32));
    const leftBottom = new RelativeVector2(position, new Vector2(-32, 32));
    const rightBottom = new RelativeVector2(position, new Vector2(32, 32));
    this.instructions.push(this.side0RenderInstruction = new PerspectiveTextureRenderInstruction(
      side0Texture,
      new Segment(rightTop, rightBottom),
      pov, false
    ));
    this.instructions.push(new PerspectiveTextureRenderInstruction(
      side1Texture,
      new Segment(rightBottom, leftBottom),
      pov, false
    ));
    this.instructions.push(new PerspectiveTextureRenderInstruction(
      side2Texture,
      new Segment(leftBottom, leftTop),
      pov, false
    ));
    this.instructions.push(new PerspectiveTextureRenderInstruction(
      side3Texture,
      new Segment(leftTop, rightTop),
      pov, false
    ));
  }

  public updateRenderInstruction() {
    // Recalculate of offset for the top face.
    const ratio = this.side0RenderInstruction.getActualHeight() / this.side0RenderInstruction.getPovToSpDistance();
    this.topRenderInstruction.scale = 8 / 0.9;
    this.topOffset.set(
      (this.position.x + 128 * 0.9 - this.pov.x) * ratio,
      (this.position.y + 128 * 0.9 - this.pov.y) * ratio
    );
  }

  private actionTotalTime: number = 1;
  private actionCurrentTime: number = 1;
  private actionFrom: Vector2 = this.position.clone();
  private actionTo: Vector2 = this.position.clone();
  private gridX = Math.floor(this.position.x / 128);
  private gridY = Math.floor(this.position.y / 128);
  private grid = [
    [0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 1, 1],
    [1, 1, 0, 0, 1, 1],
    [1, 1, 0, 0, 1, 1],
    [1, 1, 0, 0, 1, 1],
  ]

  /**
   * Used in AI, when plan to move to a grid, this function is called.
   * @param x 
   * @param y 
   * @param speedRate 
   */
  private planMoveToGrid(x: number, y: number, speedRate: number) {
    this.actionCurrentTime = 0;
    this.actionFrom.set(this.position.x, this.position.y);
    this.actionTo.set(x * 128 + 64, y * 128 + 64);
    this.actionTotalTime = 4 * this.actionFrom.getDistanceTo(this.actionTo) / speedRate;
    this.gridX = x;
    this.gridY = y;
  }

  /**
   * On tick event is triggered, TAS should consider what to do in this tick.
   */
  public onTick(deltaT: number): void {
    this.actionCurrentTime += deltaT;
    let finished;
    // If the cuurent time exceed the total time, the action is finished.
    if (this.actionCurrentTime >= this.actionTotalTime) {
      this.actionCurrentTime = this.actionTotalTime;
      finished = true;
    } else {
      finished = false;
    }
    // Calculates the progression of current action, from 0 - 1.
    let progress = this.actionCurrentTime / this.actionTotalTime;
    // Ease, essentialy to parabola, one concave up, one concave down.
    progress = progress < 0.5
      ? 2 * (progress ** 2)
      : -2 * (progress ** 2) + 4 * progress - 1;
    // Move accoriding to the porgression.
    this.position.set(
      this.actionFrom.x + (this.actionTo.x - this.actionFrom.x) * progress,
      this.actionFrom.y + (this.actionTo.y - this.actionFrom.y) * progress
    );
    const x = this.gridX;
    const y = this.gridY;
    const targetX = Math.floor(this.target.position.x / 128);
    const targetY = Math.floor(this.target.position.y / 128);
    const grid = this.grid;
    // If the target is in the range, instant kill the target.
    if (this.target.alive && this.position.getDistanceTo(this.target.position) < 65 * Math.SQRT2) {
      this.target.kill();
    }
    // If the current is finished, plan on next action.
    if (finished) {
      // If target and TAS is on the same column, 80% chance to move towards the target.
      if (this.target.alive && targetX === x && targetY !== y && Math.random() < 0.8) {
        let flag = true;
        const from = Math.min(y, targetY);
        const to = Math.max(y, targetY);
        // If there is nothing block in middle.
        for (let i = from; i <= to; i++) {
          if (grid[i][x] === 1) {
            flag = false;
            break;
          }
        }
        if (flag) {
          this.planMoveToGrid(x, targetY, 0.5 + Math.random() * 1.5);
          return;
        }
      }
      // If target and TAS is on the same row, 80% chance to move towards the target.
      if (this.target.alive && targetY === y && targetX !== x && Math.random() < 0.8) {
        let flag = true;
        const from = Math.min(x, targetX);
        const to = Math.max(x, targetX);
        // If there is nothing block in middle.
        for (let i = from; i <= to; i++) {
          if (grid[y][i] === 1) {
            flag = false;
            break;
          }
        }
        if (flag) {
          this.planMoveToGrid(targetX, y, 0.5 + Math.random() * 1.5);
          return;
        }
      }
      // Then, there is a 40% chance to pick a direction and go along for at
      // least 2 blocks.
      if (Math.random() < 0.4) {
        const choices = [];
        if (x <= 3 && grid[y][x + 1] !== 1 && grid[y][x + 2] !== 1) {
          choices.push(0);
        }
        if (y <= 7 && grid[y + 1][x] !== 1 && grid[y + 2][x] !== 1) {
          choices.push(1);
        }
        if (x >= 2 && grid[y][x - 1] !== 1 && grid[y][x - 2] !== 1) {
          choices.push(2);
        }
        if (y >= 2 && grid[y - 1][x] !== 1 && grid[y - 2][x] !== 1) {
          choices.push(3);
        }
        if (choices.length >= 1) {
          const choice = choices[Math.floor(Math.random() * choices.length)];
          switch(choice) {
            case 0: {
              let i = 2;
              while (x + i < 5 && grid[y][x + i + 1] !== 1 && Math.random() < ((x + i === targetX) ? 0.25 : 0.8)) i++;
              this.planMoveToGrid(x + i, y, 1.5 + Math.random());
              return;
            }
            case 1: {
              let i = 2;
              while (y + i < 9 && grid[y + i + 1][x] !== 1 && Math.random() < ((y + i === targetY) ? 0.25 : 0.8)) i++;
              this.planMoveToGrid(x, y + i, 1. + Math.random());
              return;
            }
            case 2: {
              let i = 2;
              while (x - i > 0 && grid[y][x - i - 1] !== 1 && Math.random() < ((x - i === targetX) ? 0.25 : 0.8)) i++;
              this.planMoveToGrid(x - i, y, 1.5 + Math.random());
              return
            }
            case 3: {
              let i = 2;
              while (y - i > 0 && grid[y - i - 1][x] !== 1 && Math.random() < ((y - i === targetY) ? 0.25 : 0.8)) i++;
              this.planMoveToGrid(x, y - i, 1.5 + Math.random());
              return;
            }
          }
        }
      }
      // Then there is a 50% chance to go diagonal.
      if (Math.random() < 0.5) {
        const choices = [];
        if (x >= 1 && y >= 1 && grid[y][x - 1] !== 1 && grid[y - 1][x] !== 1 && grid[y - 1][x - 1] !== 1) {
          choices.push(0);
        }
        if (x >= 1 && y <= 8 && grid[y][x - 1] !== 1 && grid[y + 1][x] !== 1 && grid[y + 1][x - 1] !== 1) {
          choices.push(1);
        }
        if (x <= 4 && y >= 1 && grid[y][x + 1] !== 1 && grid[y - 1][x] !== 1 && grid[y - 1][x + 1] !== 1) {
          choices.push(2);
        }
        if (x <= 4 && y <= 8 && grid[y][x + 1] !== 1 && grid[y + 1][x] !== 1 && grid[y + 1][x + 1] !== 1) {
          choices.push(3);
        }
        if (choices.length >= 1) {
          const choice = choices[Math.floor(Math.random() * choices.length)];
          switch (choice) {
            case 0: {
              this.planMoveToGrid(x - 1, y - 1, 1 + Math.random());
              return;
            }
            case 1: {
              this.planMoveToGrid(x - 1, y + 1, 1 + Math.random());
              return;
            }
            case 2: {
              this.planMoveToGrid(x + 1, y - 1, 1 + Math.random());
              return;
            }
            case 3: {
              this.planMoveToGrid(x + 1, y + 1, 1 + Math.random());
              return;
            }
          }
        }
      }
      // Otherwise just plan on next tick instead.
    }
  }

}