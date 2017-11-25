import React from 'react';
import { login } from '../services/choreoBackendApi';
import FigureContainer from '../containers/FigureContainer';
import ChoreographyContainer from '../containers/ChoreographyContainer';
import PlaybackContainer from '../containers/PlaybackContainer'; 

const App = (props) => {
  return (
    <div className="App">
      <FigureContainer />
      <PlaybackContainer />
      <ChoreographyContainer />
    </div>
  );
}

export default App;
