/**
 * Represents the objects pool for the game so there is a place for every
 * single game object that is active.
 */
import GameObject from './mechanic/GameObject';
export class ObjectsPool {

  public objects: Array<GameObject> = [];

  public createQuery<T>(filter: ((object: any) => object is T)): Query<T> {
    return new Query<T>(this, filter);
  }

  public version = 0;

  public changed() {
    this.version++;
  }

  public add(obj: GameObject) {
    this.objects.push(obj);
    this.changed();
  }

}
export class Query<T> {

  public version: number;

  constructor(
    readonly pool: ObjectsPool,
    readonly filter: ((object: any) => object is T)
  ) {
    this.version = pool.version;
  }

  public lastResults: Array<T> = [];
  get results(): Array<T> {
    if (this.version < this.pool.version) {
      this.updateResults();
    }
    return this.lastResults;
  }

  public updateResults() {
    this.lastResults = this.pool.objects.filter(this.filter) as any as Array<T>;
    this.version = this.pool.version;
  }

}