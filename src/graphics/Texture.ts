/**
 * The class for textures.
 */
import { TextureEndpoint } from './TextureTree';
import { PERSPECTIVE_TEXTURE_DETAIL } from './../Constants';
export interface BitMap {
  width: number,
  height: number,
  pixels: Array<number>,
  palette: Array<[
    number,
    number,
    number,
    number
  ]>,
}
/**
 * A pixel texture is a classic tile that lies on the plane completely flat.
 */
export class PixelTexture extends TextureEndpoint {
  public content: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public width: number;
  public height: number;
  constructor(
    public bitmap: BitMap,
  ) {
    super();
    this.width = bitmap.width;
    this.height = bitmap.height;
  }
  public async loadThis() {
    const bitmap = this.bitmap;
    const htmlCanvas = this.content = document.createElement('canvas');
    htmlCanvas.width = this.width;
    htmlCanvas.height = this.height;
    const unsafeCtx = htmlCanvas.getContext('2d');
    if (unsafeCtx === null) {
      return;
    }
    const ctx = this.ctx = unsafeCtx;
    const palette = bitmap.palette;
    const imgData = ctx.createImageData(this.width, this.height);
    const imgDataRaw = imgData.data;
    const pixelCount = this.width * this.height;
    const pixels = bitmap.pixels;
    for (let i = 0; i < pixelCount; i++) {
      const color = palette[pixels[i]];
      imgDataRaw[i * 4] = color[0];
      imgDataRaw[i * 4 + 1] = color[1];
      imgDataRaw[i * 4 + 2] = color[2];
      imgDataRaw[i * 4 + 3] = color[3];
    }
    ctx.putImageData(imgData, 0, 0);
    await new Promise(resolve => setTimeout(resolve, 0));
  }
}
/**
 * A perspective texture is a 3-D tile which sit perpendicular to the plane.
 */
export class PerspectiveTexture extends TextureEndpoint {
  public content: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public width: number;
  public xPixels: number;
  public height: number;
  public yPixels: number;
  public shift: number;
  public topLineWidth: number;
  public padding: number;
  constructor(
    public bitMap: BitMap,
    public perspective: number,
  ) {
    super();
    this.width = bitMap.width * PERSPECTIVE_TEXTURE_DETAIL;
    this.height = bitMap.height * PERSPECTIVE_TEXTURE_DETAIL;
    this.xPixels = bitMap.width;
    this.yPixels = bitMap.height;
  }
  public async loadThis() {
    const bitMap = this.bitMap;
    const width = this.width;
    const xPixels = this.xPixels;
    const height = this.height;
    const yPixels = this.yPixels;
    const htmlCanvas = this.content = document.createElement('canvas');
    htmlCanvas.width = width;
    htmlCanvas.height = height;
    const unsafeCtx = htmlCanvas.getContext('2d');
    if (unsafeCtx === null) {
      return;
    }
    const ctx = this.ctx = unsafeCtx;
    const palette = bitMap.palette;
    const imgData = ctx.createImageData(width, height);
    const imgDataRaw = imgData.data;
    const shift = this.shift = Math.floor((1 - this.perspective) * width / 2);
    const padding = this.padding = shift * 2;
    const topLineWidth = this.topLineWidth = Math.floor(this.perspective * width);
    const pixels = bitMap.pixels;
    // Pixel-level manipulation to change it into a trapzoid so it can be
    // rendered onto the screen in a 3-d way.
    for (let line = 0; line < height; line++) {
      const lineShift = Math.floor((height - line) / height * shift);
      const lineWidth = Math.floor(topLineWidth + padding * line / height) + 2;
      const lineImgDataRawOffset = (line * width + lineShift) * 4;
      for (let i = 0; i < lineWidth; i++) {
        const color = palette[pixels[Math.floor(line / PERSPECTIVE_TEXTURE_DETAIL) * xPixels + Math.floor(i / lineWidth * xPixels )]];
        const imgDataRawOffset = lineImgDataRawOffset + i * 4;
        imgDataRaw[imgDataRawOffset] = color[0];
        imgDataRaw[imgDataRawOffset + 1] = color[1];
        imgDataRaw[imgDataRawOffset + 2] = color[2];
        imgDataRaw[imgDataRawOffset + 3] = color[3];
      }
    }
    ctx.putImageData(imgData, 0, 0);
    await new Promise(resolve => setTimeout(resolve, 0));
  }
}