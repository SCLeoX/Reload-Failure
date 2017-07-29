/**
 * Represents a basic game object that can be add in to the game's objects pool.
 */
import { ObjectsPool } from './../ObjectsPool';
import Game from './../Game';
import Room from './Room';
abstract class GameObject {
  public game: Game | null;
  public objectsPool: ObjectsPool | null;
  public room: Room | null;
  constructor(game?: Game, objectsPool?: ObjectsPool, room?: Room) {
    this.game = game || null;
    this.objectsPool = objectsPool || null;
    this.room = room || null;
  }
  public attachToGame(game: Game) {
    this.game = game;
    this.objectsPool = game.objectsPool;
    game.objectsPool.add(this);
  }
  public attachToRoom(room: Room) {
    this.room = room;
  }
}
export default GameObject;