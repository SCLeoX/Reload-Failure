/**
 * The data for the picture for the font.
 */
import { BitMap } from './../graphics/Texture';
// Since most characters share same meta data (height, color, palette), I used
// a mixin to same some space.
const glyphMixin: {
  height: 5,
  palette: Array<[
    number,
    number,
    number,
    number
  ]>,
} = {
  height: 5,
  palette: [
    [   0,   0,   0,   0 ],
    [ 255, 255, 255, 255 ],
  ]
}
export const glyphs: {
  [name: string]: BitMap
} = {
  ' ': {
    width: 3,
    pixels: [
      0, 0, 0,
      0, 0, 0,
      0, 0, 0,
      0, 0, 0,
      0, 0, 0,
    ],
    ...glyphMixin,
  },
  A: {
    width: 4,
    pixels: [
      0, 1, 1, 0,
      1, 0, 0, 1,
      1, 1, 1, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,
    ],
    ...glyphMixin,
  },
  B: {
    width: 4,
    pixels: [
      1, 1, 1, 0,
      1, 0, 0, 1,
      1, 1, 1, 0,
      1, 0, 0, 1,
      1, 1, 1, 0,
    ],
    ...glyphMixin,
  },
  C: {
    width: 4,
    pixels: [
      0, 1, 1, 0,
      1, 0, 0, 1,
      1, 0, 0, 0,
      1, 0, 0, 1,
      0, 1, 1, 0,
    ],
    ...glyphMixin,
  },
  D: {
    width: 4,
    pixels: [
      1, 1, 1, 0,
      1, 0, 0, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,
      1, 1, 1, 0,
    ],
    ...glyphMixin,
  },
  E: {
    width: 3,
    pixels: [
      1, 1, 1,
      1, 0, 0,
      1, 1, 1,
      1, 0, 0,
      1, 1, 1,
    ],
    ...glyphMixin,
  },
  F: {
    width: 3,
    pixels: [
      1, 1, 1,
      1, 0, 0,
      1, 1, 1,
      1, 0, 0,
      1, 0, 0,
    ],
    ...glyphMixin,
  },
  G: {
    width: 4,
    pixels: [
      0, 1, 1, 1,
      1, 0, 0, 0,
      1, 0, 1, 1,
      1, 0, 0, 1,
      0, 1, 1, 0,
    ],
    ...glyphMixin,
  },
  H: {
    width: 4,
    pixels: [
      1, 0, 0, 1,
      1, 0, 0, 1,
      1, 1, 1, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,
    ],
    ...glyphMixin,
  },
  I: {
    width: 1,
    pixels: [
      1,
      1,
      1,
      1,
      1,
    ],
    ...glyphMixin,
  },
  J: {
    width: 3,
    pixels: [
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      1, 0, 1,
      0, 1, 0,
    ],
    ...glyphMixin,
  },
  K: {
    width: 4,
    pixels: [
      1, 0, 0, 1,
      1, 0, 1, 0,
      1, 1, 0, 0,
      1, 0, 1, 0,
      1, 0, 0, 1,
    ],
    ...glyphMixin,
  },
  L: {
    width: 3,
    pixels: [
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 1, 1,
    ],
    ...glyphMixin,
  },
  M: {
    width: 5,
    pixels: [
      1, 0, 0, 0, 1,
      1, 1, 0, 1, 1,
      1, 0, 1, 0, 1,
      1, 0, 0, 0, 1,
      1, 0, 0, 0, 1,
    ],
    ...glyphMixin,
  },
  N: {
    width: 5,
    pixels: [
      1, 0, 0, 0, 1,
      1, 1, 0, 0, 1,
      1, 0, 1, 0, 1,
      1, 0, 0, 1, 1,
      1, 0, 0, 0, 1,
    ],
    ...glyphMixin,
  },
  O: {
    width: 4,
    pixels: [
      0, 1, 1, 0,
      1, 0, 0, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,
      0, 1, 1, 0,
    ],
    ...glyphMixin,
  },
  P: {
    width: 4,
    pixels: [
      1, 1, 1, 0,
      1, 0, 0, 1,
      1, 1, 1, 0,
      1, 0, 0, 0,
      1, 0, 0, 0,
    ],
    ...glyphMixin,
  },
  Q: {
    width: 4,
    pixels: [
      0, 1, 1, 0,
      1, 0, 0, 1,
      1, 0, 0, 1,
      0, 1, 1, 0,
      0, 0, 0, 1,
    ],
    ...glyphMixin,
  },
  R: {
    width: 4,
    pixels: [
      1, 1, 1, 0,
      1, 0, 0, 1,
      1, 1, 1, 0,
      1, 0, 1, 0,
      1, 0, 0, 1,
    ],
    ...glyphMixin,
  },
  S: {
    width: 4,
    pixels: [
      0, 1, 1, 1,
      1, 0, 0, 0,
      0, 1, 1, 0,
      0, 0, 0, 1,
      1, 1, 1, 0,
    ],
    ...glyphMixin,
  },
  T: {
    width: 3,
    pixels: [
      1, 1, 1,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
    ],
    ...glyphMixin,
  },
  U: {
    width: 4,
    pixels: [
      1, 0, 0, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,
      0, 1, 1, 0,
    ],
    ...glyphMixin,
  },
  V: {
    width: 5,
    pixels: [
      1, 0, 0, 0, 1,
      1, 0, 0, 0, 1,
      0, 1, 0, 1, 0,
      0, 1, 0, 1, 0,
      0, 0, 1, 0, 0,
    ],
    ...glyphMixin,
  },
  W: {
    width: 5,
    pixels: [
      1, 0, 0, 0, 1,
      1, 0, 1, 0, 1,
      1, 0, 1, 0, 1,
      1, 0, 1, 0, 1,
      0, 1, 0, 1 ,0,
    ],
    ...glyphMixin,
  },
  X: {
    width: 5,
    pixels: [
      1, 0, 0, 0, 1,
      0, 1, 0, 1, 0,
      0, 0, 1, 0, 0,
      0, 1, 0, 1, 0,
      1, 0, 0, 0, 1,
    ],
    ...glyphMixin,
  },
  Y: {
    width: 5,
    pixels: [
      1, 0, 0, 0, 1,
      0, 1, 0, 1, 0,
      0, 0, 1, 0, 0,
      0, 0, 1, 0, 0,
      0, 0, 1, 0, 0,
    ],
    ...glyphMixin,
  },
  Z: {
    width: 3,
    pixels: [
      1, 1, 1,
      0, 0, 1,
      0, 1, 0,
      1, 0, 0,
      1, 1, 1,
    ],
    ...glyphMixin,
  },
  ',': {
    width: 1,
    pixels: [
      0, 0, 0,
      0, 0, 0,
      0, 0, 0,
      0, 1, 0,
      1, 0, 0,
    ],
    ...glyphMixin,
  },
  '.': {
    width: 1,
    pixels: [
      0,
      0,
      0,
      0,
      1,
    ],
    ...glyphMixin,
  },
  '!': {
    width: 2,
    pixels: [
      1, 0,
      1, 0,
      1, 0,
      0, 0,
      1, 0,
    ],
    ...glyphMixin,
  },
  '?': {
    width: 4,
    pixels: [
      1, 1, 1, 0,
      0, 0, 0, 1,
      0, 1, 1, 0,
      0, 0, 0, 0,
      0, 1, 0, 0,
    ],
    ...glyphMixin,
  },
  ':': {
    width: 2,
    pixels: [
      0, 0,
      1, 0,
      0, 0,
      1, 0,
      0, 0,
    ],
    ...glyphMixin,
  },
  '"': {
    width: 3,
    pixels: [
      1, 0, 1,
      1, 0, 1,
      0, 0, 0,
      0, 0, 0,
      0, 0, 0,
    ],
    ...glyphMixin,
  },
  "'": {
    width: 3,
    pixels: [
      0, 1, 0,
      0, 1, 0,
      0, 0, 0,
      0, 0, 0,
      0, 0, 0,
    ],
    ...glyphMixin,
  },
  '0': {
    width: 4,
    pixels: [
      0, 1, 1, 0,
      1, 0, 0, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,
      0, 1, 1, 0,
    ],
    ...glyphMixin,
  },
  '1': {
    width: 4,
    pixels: [
      0, 1, 1, 0,
      0, 0, 1, 0,
      0, 0, 1, 0,
      0, 0, 1, 0,
      0, 1, 1, 1,
    ],
    ...glyphMixin,
  },
  '2': {
    width: 4,
    pixels: [
      1, 1, 1, 0,
      0, 0, 0, 1,
      0, 1, 1, 0,
      1, 0, 0, 0,
      1, 1, 1, 1,
    ],
    ...glyphMixin,
  },
  '3': {
    width: 4,
    pixels: [
      1, 1, 1, 0,
      0, 0, 0, 1,
      0, 1, 1, 0,
      0, 0, 0, 1,
      1, 1, 1, 0,
    ],
    ...glyphMixin,
  },
  '4': {
    width: 4,
    pixels: [
      1, 0, 1, 0,
      1, 0, 1, 0,
      1, 0, 1, 0,
      1, 1, 1, 1,
      0, 0, 1, 0,
    ],
    ...glyphMixin,
  },
  '5': {
    width: 4,
    pixels: [
      1, 1, 1, 1,
      1, 0, 0, 0,
      1, 1, 1, 0,
      0, 0, 0, 1,
      1, 1, 1, 0,
    ],
    ...glyphMixin,
  },
  '6': {
    width: 4,
    pixels: [
      0, 1, 1, 0,
      1, 0, 0, 0,
      1, 1, 1, 0,
      1, 0, 0, 1,
      0, 1, 1, 0,
    ],
    ...glyphMixin,
  },
  '7': {
    width: 4,
    pixels: [
      1, 1, 1, 1,
      0, 0, 0, 1,
      0, 0, 1, 0,
      0, 1, 0, 0,
      0, 1, 0, 0,
    ],
    ...glyphMixin,
  },
  '8': {
    width: 4,
    pixels: [
      0, 1, 1, 0,
      1, 0, 0, 1,
      0, 1, 1, 0,
      1, 0, 0, 1,
      0, 1, 1, 0,
    ],
    ...glyphMixin,
  },
  '9': {
    width: 4,
    pixels: [
      0, 1, 1, 0,
      1, 0, 0, 1,
      0, 1, 1, 1,
      0, 0, 0, 1,
      0, 1, 1, 0,
    ],
    ...glyphMixin,
  },
  '/': {
    width: 3,
    pixels: [
      0, 0, 1,
      0, 0, 1,
      0, 1, 0,
      1, 0, 0,
      1, 0, 0,
    ],
    ...glyphMixin,
  },
  '\\': {
    width: 3,
    pixels: [
      1, 0, 0,
      1, 0, 0,
      0, 1, 0,
      0, 0, 1,
      0, 0, 1,
    ],
    ...glyphMixin,
  },
  '[': {
    width: 2,
    pixels: [
      1, 1,
      1, 0,
      1, 0,
      1, 0,
      1, 1,
    ],
    ...glyphMixin,
  },
  ']': {
    width: 2,
    pixels: [
      1, 1,
      0, 1,
      0, 1,
      0, 1,
      1, 1,
    ],
    ...glyphMixin,
  },
  '(': {
    width: 2,
    pixels: [
      0, 1,
      1, 0,
      1, 0,
      1, 0,
      0, 1,
    ],
    ...glyphMixin,
  },
  ')': {
    width: 2,
    pixels: [
      1, 0,
      0, 1,
      0, 1,
      0, 1,
      1, 0,
    ],
    ...glyphMixin,
  },
  '{': {
    width: 3,
    pixels: [
      0, 1, 1,
      0, 1, 0,
      1, 0, 0,
      0, 1, 0,
      0, 1, 1,
    ],
    ...glyphMixin,
  },
  '}': {
    width: 3,
    pixels: [
      1, 1, 0,
      0, 1, 0,
      0, 0, 1,
      0, 1, 0,
      1, 1, 0,
    ],
    ...glyphMixin,
  },
  '-': {
    width: 3,
    pixels: [
      0, 0, 0,
      0, 0, 0,
      1, 1, 1,
      0, 0, 0,
      0, 0, 0,
    ],
    ...glyphMixin,
  },
  '_': {
    width: 3,
    pixels: [
      0, 0, 0,
      0, 0, 0,
      0, 0, 0,
      0, 0, 0,
      1, 1, 1,
    ],
    ...glyphMixin,
  },
  '=': {
    width: 3,
    pixels: [
      0, 0, 0,
      1, 1, 1,
      0, 0, 0,
      1, 1, 1,
      0, 0, 0,
    ],
    ...glyphMixin,
  },
  '%': {
    width: 5,
    pixels: [
      1, 1, 0, 0, 1,
      1, 1, 0, 1, 0,
      0, 0, 1, 0, 0,
      0, 1, 0, 1, 1,
      1, 0, 0, 1, 1,
    ],
    ...glyphMixin,
  },
}