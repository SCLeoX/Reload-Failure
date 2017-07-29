/**
 * The data for the picture for the main Character.
 */
import { BitMap } from './../graphics/Texture';
export const krystol: {
  alive: BitMap,
  corpse: BitMap
} = {
  alive: {
    width: 3,
    height: 4,
    palette: [
      [   0,   0,   0,   0 ],
      [ 200, 200, 100, 255 ],
      [ 150, 150,  70, 255 ],
      [ 255, 255, 255, 255 ],
    ],
    pixels: [
      1, 1, 0,
      2, 2, 0,
      2, 2, 0,
      1, 1, 3,
    ]
  },
  corpse: {
    width: 6,
    height: 7,
    palette: [
      [   0,   0,   0,   0 ],
      [ 170, 170,  70, 255 ],
      [ 120, 120,  40, 255 ],
      [ 140, 140,  60, 255 ],
    ],
    pixels: [
      0, 1, 0, 0, 0, 1,
      0, 1, 2, 2, 1, 0,
      0, 0, 3, 3, 0, 0,
      0, 0, 3, 3, 0, 0,
      0, 0, 3, 3, 0, 0,
      0, 1, 0, 0, 1, 0,
      1, 0, 0, 0, 1, 0,
    ]
  }
}