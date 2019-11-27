import React, { useRef, useState, useEffect } from 'react';
import Buttton from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import SctiptManager from './ScriptManager';


const Main = () => {
  const classes = useStyles();
  const fileInput = useRef();
  const [fileUri, setFileUri] = useState('');
  const [scriptManager, setScriptManager] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => setScriptManager(new SctiptManager()), []);

  const chooseFile = () => {
    fileInput.current.click();
  }

  const processFile = (event) => {
    setErrorMessage('');
    try {
      scriptManager.loadFromFile(event.target.files[0], setErrorMessage);

      const path = fileInput.current.value;
      setFileUri(path);
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  const downloadFile = () => {
    setErrorMessage('');
    try {
      scriptManager.downloadResult()
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  return (
    <div 
      className={classes.main}
    >
      <input
        id="file-input"
        type="file"
        name="name"
        accept=".txt"
        style={{ display: 'none' }}
        ref={fileInput}
        onChange={processFile}
      />
      <div>
        <div className={classes}>
          <Buttton
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={chooseFile}
          >
            Upload File
          </Buttton>
          <Buttton
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={downloadFile}
          >
            Download Result
          </Buttton>
        </div>
        <div>
          Chosen file: {fileUri}
        </div>
        <div>
          {errorMessage}
        </div>
      </div>
    </div>
  );
}


export default Main;


const useStyles = makeStyles(theme => ({
  main: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    margin: '5px',
    '&:hover': {
      transform: 'scale(1.05)'
    },
    '&:active': {
      transform: 'scale(1)'
    }
  },
  buttonContainer: {
    display: 'flex'
  }
}));