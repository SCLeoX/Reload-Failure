/**
 * Represents a group of textures.
 */
import * as _ from 'lodash';
import { PixelTexture, BitMap } from './Texture';
import { TextureInterpoint, TextureEndpoint } from './TextureTree';

export default class TextureGroup extends TextureInterpoint<string, TextureEndpoint> {
  public addTexture(key: string, texture: TextureEndpoint): TextureGroup {
    this.put(key, texture);
    return this;
  }
  public addTextures(textures: { [key: string]: TextureEndpoint }): TextureGroup {
    for (let entry of _.toPairs(textures)) {
      this.addTexture(entry[0], entry[1]);
    }
    return this;
  }
  public addBitMap(key: string, bitMap: BitMap): TextureGroup {
    this.put(key, new PixelTexture(bitMap));
    return this;
  }
  public addBitMaps(bitMaps: { [key: string]: BitMap }): TextureGroup {
    for (let entry of _.toPairs(bitMaps)) {
      this.addBitMap(entry[0], entry[1]);
    }
    return this;
  }
}