import Game from './Game';
eval('window.loaded = true;');
new Game(
  document.getElementById('root') as HTMLCanvasElement,
  window
);