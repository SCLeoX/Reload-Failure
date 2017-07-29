// An abstraction for the inputs so user inputs can be read more easily.
import * as _ from 'lodash';
import RectZone from './geometry/RectZone';
import Vector2 from './geometry/Vector2';
export enum Key {
  SHIFT    = 16,
  CTRL     = 17,
  ALT      = 18,
  SPACE    = 32,
  ENTER    = 13,
  NUMBER_0 = 48,
  NUMBER_1 = 49,
  NUMBER_2 = 50,
  NUMBER_3 = 51,
  NUMBER_4 = 52,
  NUMBER_5 = 53,
  NUMBER_6 = 54,
  NUMBER_7 = 55,
  NUMBER_8 = 56,
  NUMBER_9 = 57,
  A        = 65,
  B        = 66,
  C        = 67,
  D        = 68,
  E        = 69,
  F        = 70,
  G        = 71,
  H        = 72,
  I        = 73,
  J        = 74,
  K        = 75,
  L        = 76,
  M        = 77,
  N        = 78,
  O        = 79,
  P        = 80,
  Q        = 81,
  R        = 82,
  S        = 83,
  T        = 84,
  U        = 85,
  V        = 86,
  W        = 87,
  X        = 88,
  Y        = 89,
  Z        = 90,
}
export class ClickableZone {
  constructor(
    public area: RectZone,
    public callback: (event: ClickableZoneClickedEvent) => void,
    public reactToLeftClick: boolean = true,
    public reactToRightClick: boolean = false,
  ) {}
}
export interface ClickableZoneClickedEvent {
  nativeEvent: MouseEvent,
  relativeToPoint1: Vector2,
  relativeToPoint2: Vector2,
}
export class Input {
  private keyState: Array<boolean> = [];
  public mousePosition: Vector2 = new Vector2(0, 0);
  public leftMouseDown: boolean = false;
  public rightMouseDown: boolean = false;
  private clickableZones: Array<ClickableZone> = [];

  private updateMousePosition(event: MouseEvent): void {
    this.mousePosition.set(event.clientX, event.clientY);
  }

  /**
   * Depends on whether the provided position is located inside the
   * clickableZone, trigger clickableZone's callback with proper arguments.
   * @param zone The ClickableZone
   * @param event Native MouseEvent
   */
  private attemptTriggerClickableZoneClickedEvent(
    zone: ClickableZone,
    event: MouseEvent,
  ): void {
    const position: Vector2 = this.mousePosition;
    if (zone.area.isPointInside(position)) {
      zone.callback({
        nativeEvent: event,
        relativeToPoint1: position.clone().subtract(zone.area.point1),
        relativeToPoint2: position.clone().subtract(zone.area.point2),
      });
    }
  }

  constructor(
    private window: Window,
  ) {
    // Remove right click contextmenu
    window.addEventListener('contextmenu', event => event.preventDefault());
    // Init the key state array
    Object.keys(Key).filter(v => typeof v === 'number').forEach(keyCode => {
      this.keyState[parseInt(keyCode)] = false;
    });
    // Register listeners for keyboard events
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      this.keyState[event.keyCode] = true;
    });
    window.addEventListener('keyup', (event: KeyboardEvent) => {
      this.keyState[event.keyCode] = false;
    });
    // Register listerners for mouse events
    window.addEventListener('mousemove', this.updateMousePosition.bind(this));
    window.addEventListener('mousedown', (event: MouseEvent) => {
      this.updateMousePosition(event);
      if (event.which === 1) {
        this.leftMouseDown = true;
        for (let clickableZone of this.clickableZones) {
          if (clickableZone.reactToLeftClick) {
            this.attemptTriggerClickableZoneClickedEvent(clickableZone, event);
          }
        }
      } else if (event.which === 3) {
        this.rightMouseDown = true;
        for (let clickableZone of this.clickableZones) {
          if (clickableZone.reactToRightClick) {
            this.attemptTriggerClickableZoneClickedEvent(clickableZone, event);
          }
        }
      }
    });
    window.addEventListener('mouseup', (event: MouseEvent) => {
      if (event.which === 1) {
        this.leftMouseDown = false;
      } else if (event.which === 3) {
        this.rightMouseDown = false;
      }
    });
  }

  /**
   * Check a give key is pressed or not.
   * @param key
   */
  public isKeyPressed(key: Key | number): boolean {
    return this.keyState[key];
  }

  public registerClickableZone(clickableZone: ClickableZone): () => void {
    this.clickableZones.push(clickableZone);
    return () => {
      _.pull(this.clickableZones, clickableZone);
    };
  }
}