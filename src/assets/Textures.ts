/**
 * The texture tree of the game. So I can access any of the textures in the,
 * from the exported object "textures";
 */
import { basic as basicFloor } from './Floor';
import { basic as basicWall } from './Wall';
import { glyphs } from './Font';
import { krystol } from './Character';
import { PixelTexture, BitMap, PerspectiveTexture } from './../graphics/Texture';
import { top as tasTop, side as tasSide } from './enemy/TheAncientStone';
import TextureGroup from './../graphics/TextureGroup';
import TextureStructure from './../graphics/TextureStructure';
import VariableTextureInterpoint from './../graphics/VariableTexture';
// Wrap a bitmap into a high (in terms of z-axis) perspectivlized texture object.
const bitMapToPerspectiveTextureHigh = (bitMap: BitMap) => new PerspectiveTexture(bitMap, 0.8);
// Wrap a bitmap into a low (in terms of z-axis) perspectivlized texture object.
const bitMapToPerspectiveTextureLow = (bitMap: BitMap) => new PerspectiveTexture(bitMap, 0.9);
// Wrap a bitmap into a standard pixel texture object.
const bitMapToPixelTexture = (bitMap: BitMap) => new PixelTexture(bitMap);
export const textures = new TextureStructure()
  .addInterpoint('font', new TextureGroup()
     .addBitMaps(glyphs)
  )
  .addInterpoint('floor', new TextureStructure()
    .addInterpoint('basic', new VariableTextureInterpoint<PixelTexture>()
      .add(basicFloor.map(bitMapToPixelTexture))
    )
  )
  .addInterpoint('wall', new TextureStructure()
    .addInterpoint('basic', new VariableTextureInterpoint<PerspectiveTexture>()
      .add(basicWall.map(bitMapToPerspectiveTextureHigh))
      .add(basicWall.map(bitMapToPerspectiveTextureHigh))
    )
  )
  .addInterpoint('character', new TextureStructure()
    .addInterpoint('krystol', new TextureGroup()
      .addBitMap('alive', krystol.alive)
      .addBitMap('corpse', krystol.corpse)
    )
  )
  .addInterpoint('enemy', new TextureStructure()
    .addInterpoint('tas', new TextureStructure()
      .addInterpoint('top', new VariableTextureInterpoint<PixelTexture>()
        .add(tasTop.map(bitMapToPixelTexture))
      )
      .addInterpoint('side', new VariableTextureInterpoint<PerspectiveTexture>()
        .add(tasSide.map(bitMapToPerspectiveTextureLow))
      )
    )
  )