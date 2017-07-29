/**
 * Represents a room which is not currently used in this version.
 */
import { ObjectsPool } from './../ObjectsPool';
import Canvas from "../graphics/Canvas";
import Floor from "./Floor";
import Wall from "./Wall";

export default class Room {
  public loaded: boolean = false;
  public floors: Array<Floor> = [];
  public walls: Array<Wall> = [];
  constructor(objectsPool: ObjectsPool) {

  }
}