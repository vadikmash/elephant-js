import StateObject from "./StateObject";

export default class Drawer extends StateObject {
  constructor () {
    super();

    this.canvas = null;
    this.state = {
      isCanvasCreated: false
    }
  }

  execute = (script) => {
    const lines = script.split('\n');

    lines.forEach(line => {
      const [command, ...args] = line.split(' ');

      switch (command) {
        case 'C':
          this.createCanvas(...args);
          return;
        case 'L':
          this.drawLine(...args);
          return;
        case 'R':
          this.drawRectangle(...args);
          return;
        case 'B':
          this.bucketFilling(...args);
          return;
        default:
          throw new Error('Command not found!');
      }
    });
  }

  createCanvas = (widthString, heightString) => {
    const height = +heightString;
    const width = +widthString;
    let line = Array(width + 2).fill(' ');
    line[0] = '|';
    line[line.length - 1] = '|';
    let topBottomLine = Array(width).fill('-');
    const matrix = new Array(height + 2).fill().map(() => [...line]);
    matrix[0] = topBottomLine;
    matrix[matrix.length - 1] = topBottomLine;
  
    this.canvas = {
      height,
      width,
      matrix
    };
  }

  isOutOfRange = (x, y) => {
    const { width, height } = this.canvas;

    if (x < 0 || y < 0 || x > width || y > height) {
      return true;
    }

    return false;
  }

  drawLine = (x1Str, y1Str, x2Str, y2Str) => { 
    const x1 = +x1Str;
    const y1 = +y1Str;
    const x2 = +x2Str;
    const y2 = +y2Str;

    if (this.isOutOfRange(x1, y1) || this.isOutOfRange(x2, y2)) {
      throw new Error('Out of range!');
    }

    if (y1 === y2) {
      const from = x1 < x2 ? x1 : x2;
      const to = x1 < x2 ? x2 : x1;
      for (let i = from; i <= to; ++i) {
        this.canvas.matrix[y1][i] = 'x';
      }

      return;
    }

    if (x1 === x2) {
      const from = y1 < y2 ? y1 : y2;
      const to = y1 < y2 ? y2 : y1;
      for (let i = from; i <= to; ++i) {
        this.canvas.matrix[i][x1] = 'x';
      }

      return;
    }
  }

  drawRectangle = (x1, y1, x2, y2) => {
    if (this.isOutOfRange(x1, y1) || this.isOutOfRange(x2, y2)) {
      throw new Error('Out of range!');
    }

    this.drawLine(x1, y1, x1, y2);
    this.drawLine(x1, y1, x2, y1);
    this.drawLine(x2, y2, x1, y2);
    this.drawLine(x2, y2, x2, y1);
  }

  bucketFilling = (x, y, filling) => {

  }

  getResult = () => {
    if (this.canvas) {
      return this.canvas.matrix.map(line => line.join('')).join('\n'); 
    } 

    throw new Error('No result to return!');
  }
}