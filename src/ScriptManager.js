import StateObject from './StateObject';
import Drawer from './Drawer';

export default class ScriptManager extends StateObject {
  constructor () {
    super(); 
    
    this.state = {
      script: '',
      result: ''
    }

    this.drawer = new Drawer();
  }

  loadFromFile (file) {
    const reader = new FileReader();
    reader.onloadend = (e) => {
      if (e.target.readyState === FileReader.DONE) {
        this.setState({ script: e.target.result});

        this.execute();
      } else {
        throw new Error('A problem occured while reading file.');
      }
    };
    reader.readAsBinaryString(file);
  }

  execute = () => {
    const { script } = this.state;

    if (script) {
      this.drawer.execute(script);

      return;
    } 

    throw new Error('No script to execute!');
  }

  getResult = () => {
    return this.drawer.getResult();
  }

  downloadResult = () => {
    const result = this.getResult();

    console.log(result);

    // do smth
  }
}