/**
 * Interface for objects that cannot be passed through by the player.
 */
import Segment from './../geometry/Segment';

export interface Impassable {
  IMPASSABLE_FLAG: true;
  impassableBase: Segment;
  updateImpassableBase: null | (() => void);
}

export function isImpassable(obj: any): obj is Impassable {
  if (typeof obj !== 'object') {
    return false;
  }
  return (obj as Impassable).IMPASSABLE_FLAG !== undefined;
}