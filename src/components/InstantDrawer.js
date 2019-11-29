import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SctiptManager from '../core/ScriptManager';

const defaultScript = `C 20 4
L 1 2 6 2
L 6 3 6 4 
R 16 1 20 3
B 10 3 o`;

const defaultMessage = 'The result is gonna be shown here';


const InstantDrawer = () => {
  const classes = useStyles();
  const [scriptManager, setScriptManager] = useState(null);
  const [result, setResult] = useState(defaultMessage);
  useEffect(() => setScriptManager(new SctiptManager()), []);

  const processScript = (event) => {
    setResult('');
    try {
      scriptManager && scriptManager.execute(event.target.value);
      setResult(scriptManager.getResult());
    } catch (error) {
      setResult(error.message)
    }
  }

  return (
    <div 
      className={classes.main}
    >
      <textarea
        className={classes.textarea}
        onChange={processScript}
        autoFocus
        defaultValue={defaultScript}
      ></textarea>
      <textarea
        className={classes.output}
        readOnly
        value={result || defaultMessage}
      >
      </textarea>
    </div>
  );
}


export default InstantDrawer;


const useStyles = makeStyles(theme => ({
  main: {
    height: '90vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textarea: {
    height: '80vh',
    flex: 1,
    margin: '10px',
    padding: '10px',
    fontSize: '3vh',
    fontFamily: 'Courier'
  },
  output: {
    height: '80vh',
    flex: 1,
    margin: '10px',
    padding: '10px',
    fontSize: '3vh',
    lineHeight: '2.7vh',
    fontFamily: 'Courier'
  }
}));