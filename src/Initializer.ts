/**
 * The preset level of the game stores here.
 */
import { LayerIdentifier } from './graphics/Layer';
import { ObjectsPool } from './ObjectsPool';
import { textures } from './assets/Textures';
import Camera from './mechanic/Camera';
import CameraBorder from './mechanic/CameraBorder';
import Character from './mechanic/Character';
import Floor from './mechanic/Floor';
import Game from './Game';
import Score from './mechanic/Score';
import Segment from "./geometry/Segment";
import TextureGroup from './graphics/TextureGroup';
import TheAncientStone from './mechanic/enemy/TheAncientStone';
import Vector2 from './geometry/Vector2';
import Wall from './mechanic/Wall';
import WarFog from './mechanic/WarFog';

export default class Initializer {
  
  public objectsPool: ObjectsPool
  public character: Character;

  constructor(
    public game: Game,
  ) {
    this.objectsPool = game.objectsPool;
  }

  private placeWall(x1: number, y1: number, x2: number, y2: number) {
    const wall = new Wall(
      textures.get('wall').get('basic').pick(),
      new Segment(new Vector2(x1, y1), new Vector2(x2, y2)),
      this.character.position
    )
    wall.attachToGame(this.game);
  }

  private placeFloor(x: number, y: number) {
    const floor = new Floor(
      textures.get('floor').get('basic').pick(),
      new Vector2(x, y),
      8
    );
    floor.attachToGame(this.game);
  }

  public initialize() {
    const character = this.character = new Character(
      textures.get('character').get('krystol').get('alive'),
      textures.get('character').get('krystol').get('corpse'),
      new Vector2(384, 1152)
    );
    character.attachToGame(this.game);
    const camera = new Camera(character.position, new Vector2(this.game.canvas.width, this.game.canvas.height));
    camera.attachToGame(this.game);
    const warFog = new WarFog(character, camera);
    warFog.attachToGame(this.game);
    const score = new Score(textures.get('font') as TextureGroup, character);
    score.attachToGame(this.game);
    const tas1 = new TheAncientStone(
      textures.get('enemy').get('tas').get('top').pick(),
      textures.get('enemy').get('tas').get('side').pick(),
      textures.get('enemy').get('tas').get('side').pick(),
      textures.get('enemy').get('tas').get('side').pick(),
      textures.get('enemy').get('tas').get('side').pick(),
      new Vector2(64, 64),
      character.position,
      character
    );
    tas1.attachToGame(this.game);

    const tas2 = new TheAncientStone(
      textures.get('enemy').get('tas').get('top').pick(),
      textures.get('enemy').get('tas').get('side').pick(),
      textures.get('enemy').get('tas').get('side').pick(),
      textures.get('enemy').get('tas').get('side').pick(),
      textures.get('enemy').get('tas').get('side').pick(),
      new Vector2(724, 64),
      character.position,
      character
    );
    tas2.attachToGame(this.game);

    for (let i = 0; i < 6; i++) {
      this.placeWall(i * 128 + 128, 0, i * 128, 0);
      this.placeWall(0, i * 128, 0, i * 128 + 128);
      this.placeWall(768, i * 128 + 128, 768, i* 128);
    }
    this.placeWall(128, 128, 256, 128);
    this.placeWall(256, 128, 256, 256);
    this.placeWall(256, 256, 128, 256);
    this.placeWall(128, 256, 128, 128);

    this.placeWall(512, 128, 640, 128);
    this.placeWall(640, 128, 640, 256);
    this.placeWall(640, 256, 512, 256);
    this.placeWall(512, 256, 512, 128);

    this.placeWall(128, 512, 256, 512);
    this.placeWall(256, 512, 256, 640);
    this.placeWall(256, 640, 128, 640);
    this.placeWall(128, 640, 128, 512);

    this.placeWall(512, 512, 640, 512);
    this.placeWall(640, 512, 640, 640);
    this.placeWall(640, 640, 512, 640);
    this.placeWall(512, 640, 512, 512);

    for (let i = 0; i < 6; i++) {
      this.placeFloor(i * 128, 0);
      this.placeFloor(i * 128, 256);
      this.placeFloor(i * 128, 384);
      this.placeFloor(i * 128, 640);
    }
    this.placeFloor(0, 128);
    this.placeFloor(256, 128);
    this.placeFloor(384, 128);
    this.placeFloor(640, 128);
    this.placeFloor(0, 512);
    this.placeFloor(256, 512);
    this.placeFloor(384, 512);
    this.placeFloor(640, 512);

    this.placeWall(0, 768, 128, 768);
    this.placeWall(128, 768, 256, 768);
    this.placeWall(512, 768, 640, 768);
    this.placeWall(640, 768, 768, 768);

    for (let i = 0; i < 4; i++) {
      this.placeWall(256, i * 128 + 768, 256, i * 128 + 896);
      this.placeWall(512, i * 128 + 896, 512, i * 128 + 768);
      this.placeFloor(256, i * 128 + 768);
      this.placeFloor(384, i * 128 + 768);
    }

    this.placeWall(256, 1280, 384, 1280);
    this.placeWall(384, 1280, 512, 1280);
  }

}