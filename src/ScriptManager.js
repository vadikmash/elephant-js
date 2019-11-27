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

  loadFromFile (file, setErrorMessage) {
    const reader = new FileReader();
    reader.onloadend = (e) => {
      if (e.target.readyState === FileReader.DONE) {
        this.setState({ script: e.target.result});

        try {
          this.execute();
        } catch (error) {
          setErrorMessage && setErrorMessage(error.message);
        }   
      } else {
        throw new Error('A problem occured while reading file.');
      }
    };
    reader.readAsBinaryString(file);
  }

  execute = () => {
    const { script } = this.state;

    if (script) {
      try {
      this.drawer.execute(script);
    } catch (error) {
      throw error
        }   

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