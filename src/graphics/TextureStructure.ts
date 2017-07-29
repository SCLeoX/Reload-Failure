/**
 * Represent a group of any sort of texture interpoint except actual texture.
 */
import { TextureInterpoint } from './TextureTree';
export default class TextureStructure extends TextureInterpoint<string, TextureInterpoint<any, any>> {
  isEndpoint: false;
  constructor() {
    super();
  }
  public addInterpoint(key: string, value: TextureInterpoint<any, any>): TextureStructure {
    this.put(key, value);
    return this;
  }
}
