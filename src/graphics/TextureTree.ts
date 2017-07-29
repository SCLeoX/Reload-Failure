import * as _ from 'lodash';

/**
 * Represents a node in the texture tree.
 */
export type TextureNode = TextureEndpoint | TextureInterpoint<any, any>;

abstract class TextureNodeBase {
  readonly abstract isEndpoint: boolean;
  public abstract getEndPoints(): Array<TextureEndpoint>;
  public async load(progressListener: (current: number, total: number) => void) {
    const endpoints = _.filter(this.getEndPoints(), ['isLoaded', false]);
    const total: number = endpoints.length;
    let finished: number = 0;
    for (let endpoint of endpoints) {
      await endpoint.loadThis();
      progressListener(++finished, total);
    }
  }
}

/**
 * Represents a texture endpoint which is essentially a texture.
 */
export abstract class TextureEndpoint extends TextureNodeBase {
  constructor() {
    super();
  }
  readonly isEndpoint = true;
  public isLoaded: boolean = false;
  public abstract content: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement;
  public abstract async loadThis(): Promise<void>;
  public getEndPoints(): Array<TextureEndpoint> {
    return [ this ];
  }
  public abstract width: number;
  public abstract height: number;
}

/** 
 * Represents a texture interpoint which is essentially anything in the texture
 * tree that is not a actual texture. 
 */
export abstract class TextureInterpoint<K extends any, T extends TextureNode> extends TextureNodeBase {
  readonly isEndpoint = false;
  protected children: { [key: string]: T } = {};
  protected convertKey(input: K): string {
    return String(input);
  }
  public get(key: K): T {
    return this.children[this.convertKey(key)] as T;
  }
  public getEndPoints(): Array<TextureEndpoint> {
    return _.flatten(_.values(this.children).map(node => node.getEndPoints()));
  }
  public put(key: string, value: T) {
    if (this.children[key] === undefined) {
      this.children[key] = value;
    } else {
      throw new Error(`Key ${key} already exist.`);
    }
  }
}