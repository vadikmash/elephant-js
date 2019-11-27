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

      console.log(args);

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

  createCanvas = (height, width) => {
  }

  drawLine = (x1, y1, x2, y2) => {
  }

  drawRectangle = (x1, y1, x2, y2) => {

  }

  bucketFilling = (x, y, filling) => {

  }

  getResult = () => {
    if (this.canvas) {
      return this.canvas.join('\n'); 
    } 

    throw new Error('No result to return!');
  }
}