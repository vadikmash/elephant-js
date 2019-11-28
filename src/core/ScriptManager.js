import StateObject from './StateObject';
import Drawer from './Drawer';

export default class ScriptManager extends StateObject {
  constructor () {
    super(); 

    this.state = {
      script: '',
      result: ''
    }
  }

  loadFromFile (file, setErrorMessage) {
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onloadend = (e) => {
      if (e.target.readyState === FileReader.DONE) {
        this.setState({ script: e.target.result});

        try {
          this.execute(this.state.script);
        } catch (error) {
          setErrorMessage && setErrorMessage(error.message);
        }   
      } else {
        throw new Error('A problem occured while reading file.');
      }
    };
    reader.readAsBinaryString(file);
  }

  execute = (script) => {
    const drawer = new Drawer();

    if (script) {
      try {
        drawer.execute(script);

        const result = drawer.getResult();

        this.setState({ result });
      } catch (error) {
        throw error
      }   

      return;
    } 

    throw new Error('No script to execute!');
  }

  getResult = () => {
    return this.state.result;
  }

  downloadResult = () => {
    const result = this.getResult();

    const link = document.createElement('a');
    link.download = 'drawing.txt';
    const blob = new Blob([result], { type: 'text/plain' });
    link.href = window.URL.createObjectURL(blob);
    link.click();
  }
}