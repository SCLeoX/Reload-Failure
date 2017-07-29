/**
 * Interface for objects that blocks sight (thus produces war fog).
 */
import Segment from './../geometry/Segment';

export interface WarFogSource {
  warFogBase: Segment | Array<Segment>;
  updateWarFogBase: null | (() => void);
  WAR_FOG_FLAG: true;
}

export function isWarFogSource(obj: any): obj is WarFogSource  {
  if (typeof obj !== 'object') {
    return false;
  }
  return (obj as WarFogSource).WAR_FOG_FLAG !== undefined;
}