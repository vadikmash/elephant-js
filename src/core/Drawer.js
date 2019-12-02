import StateObject from "./StateObject";

const MAX_CANVAS_SIZE = 50;
export default class Drawer extends StateObject {
  constructor () {
    super();

    this.canvas = null;
    this.state = {
      isCanvasCreated: false,
      result: ''
    }
  }

  execute = (script) => {
    const lines = script.trim().split('\n');

    lines.forEach(line => {
      const [command, ...args] = line.split(' ').filter(arg => arg);

      if (command) {
        if (command === 'C') {
          if(!this.canvas) {
            this.createCanvas(...args);
          } else {
            throw new Error('Canvas has already been created!');
          }
        } else {
          if (!this.canvas) {
            throw new Error(
              `Cannot execute command ${command}. 
              Create canvas (use 'C' command) before drawing!`
            );
          }
        }

        switch (command) {
          case 'C':
            break;
          case 'L':
            this.drawLine(...args);
            break;
          case 'R':
            this.drawRectangle(...args);
            break;
          case 'B':
            this.bucketFilling(...args);
            break;
          default:
            throw new Error(`Command '${command}' was not found!`);
        }

        this.updateResult();
      }
    });
  }

  checkArguments(args, command, description) {   
    args.forEach(arg => {
      if (!Number.isInteger(+arg)) {
        throw new Error(`Invalid arguments (${args.join(', ')}) for command '${command}' - ${description}!`);
      }
    });
  }

  createCanvas = (widthString, heightString) => {
    this.checkArguments([widthString, heightString], 'C', 'create canvas');

    const height = +heightString;
    const width = +widthString;

    if (height > MAX_CANVAS_SIZE || width > MAX_CANVAS_SIZE) {
      throw new Error(`Canvas can't be bigger than ${MAX_CANVAS_SIZE}x${MAX_CANVAS_SIZE}!`);
    }

    let line = Array(width + 2).fill(' ');
    line[0] = '|';
    line[line.length - 1] = '|';
    let topBottomLine = Array(width + 2).fill('-');
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

    if (+x <=0 || +y <= 0 || +x > width || +y > height) {
      return true;
    }

    return false;
  }

  drawLine = (x1Str, y1Str, x2Str, y2Str) => { 
    this.checkArguments([x1Str, y1Str, x2Str, y2Str], 'L', 'draw line');

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

    throw new Error('Only vertical and horisintal lines are allowed!')
  }

  drawRectangle = (x1, y1, x2, y2) => {
    this.checkArguments([x1, y1, x2, y2], 'R', 'draw rectangle');

    if (this.isOutOfRange(x1, y1) || this.isOutOfRange(x2, y2)) {
      throw new Error('Out of range!');
    }

    this.drawLine(x1, y1, x1, y2);
    this.drawLine(x1, y1, x2, y1);
    this.drawLine(x2, y2, x1, y2);
    this.drawLine(x2, y2, x2, y1);
  }

  bucketFilling = (xFirstStr, yFirstStr, filling) => {    
    const { isOutOfRange } = this;

    this.checkArguments([xFirstStr, yFirstStr], 'B', 'paint bucket');

    if (isOutOfRange(xFirstStr, yFirstStr)) {
      throw new Error('Out of range!');
    }

    if (!filling) {
      throw new Error('No filling argument provided!');
    }

    const xFirst = +xFirstStr;
    const yFirst = +yFirstStr;

    filling = filling[0];


    // recursive filling algorithm
    const fill = (x, y, initialFilling) => {
      if (!isOutOfRange(x, y) && initialFilling !== this.canvas.matrix[y][x]) {
        // top
        if (!isOutOfRange(x, y - 1) && this.canvas.matrix[y - 1][x] === initialFilling) {
          this.canvas.matrix[y - 1][x] = filling;
          fill(x, y - 1, initialFilling);
        }
        // right
        if (!isOutOfRange(x + 1, y) && this.canvas.matrix[y][x + 1] === initialFilling) {
          this.canvas.matrix[y][x + 1] = filling;
          fill(x + 1, y, initialFilling);
        }
        // bottom
        if (!isOutOfRange(x, y + 1) && this.canvas.matrix[y + 1][x] === initialFilling) {
          this.canvas.matrix[y + 1][x] = filling;
          fill(x, y + 1, initialFilling);
        }
        // left
        if (!isOutOfRange(x - 1, y) && this.canvas.matrix[y][x - 1] === initialFilling) {
          this.canvas.matrix[y][x - 1] = filling;
          fill(x - 1, y, initialFilling);
        }
      }
    }

    const initialFilling = this.canvas.matrix[yFirst][xFirst];
    this.canvas.matrix[yFirst][xFirst] = filling;

    fill(xFirst, yFirst, initialFilling);
  }

  updateResult() {
    this.state.result += this.canvas.matrix.map(line => line.join('')).join('\n') + '\n'; 
  }

  getResult = () => {
    if (this.canvas) {
      return this.state.result;
    } 

    throw new Error('No result to return!');
  }
}