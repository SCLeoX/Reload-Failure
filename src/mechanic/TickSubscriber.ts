/**
 * Interface for objects that should respond to tick events.
 */
export interface TickSubscriber {
  onTick(deltaT: number): void;
  TICK_SUBSCRIBER_FLAG: true;
}

export function isTickSubscriber(obj: any): obj is TickSubscriber {
  if (typeof obj !== 'object') {
    return false;
  }
  return (obj as TickSubscriber).TICK_SUBSCRIBER_FLAG !== undefined;
}