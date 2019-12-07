import React from 'react';
import './App.css';

import Explorer from './Explorer';

import CssBaseline from '@material-ui/core/CssBaseline';


function App() {
  return (
      <React.Fragment>
        <CssBaseline />        
        <div className="App">
            <Explorer />
        </div>
        </React.Fragment>
  );
}

export default App;
