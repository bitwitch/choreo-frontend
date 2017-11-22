import React from 'react';
import { login } from '../services/choreoBackendApi';
import FigureContainer from '../containers/FigureContainer';
import ChoreographyContainer from '../containers/ChoreographyContainer';

const App = (props) => {
  return (
    <div className="App">
      <FigureContainer />
      <ChoreographyContainer />
    </div>
  );
}

export default App;
