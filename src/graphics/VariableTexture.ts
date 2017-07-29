import { TextureInterpoint, TextureEndpoint, TextureNode } from './TextureTree';

/**
 * Represents a group of textures that are just variations of each other.
 */
export default class VariableTextureInterpoint<T extends TextureNode> extends TextureInterpoint<number, T> {
  public length: number = 0;
  public add(texture: TextureEndpoint): VariableTextureInterpoint<T>;
  public add(textures: Array<TextureEndpoint>): VariableTextureInterpoint<T>;
  public add(param: any): VariableTextureInterpoint<T> {
    if (Array.isArray(param)) {
      for (let texture of param) {
        this.add(texture);
      }
    } else {
      this.put(String(this.length++), param);
    }
    return this;
  }
  public pick(): T {
    return this.get(Math.floor(Math.random() * this.length));
  }
}