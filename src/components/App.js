import React from 'react';
import { login } from '../services/choreoApi';
import FigureContainer from '../containers/FigureContainer';
import ChoreographyContainer from '../containers/ChoreographyContainer';
import Navbar from './Navbar'; 
import PlaybackContainer from '../containers/PlaybackContainer'; 
import { Route } from 'react-router-dom';

class App extends React.Component {
  
  componentDidMount() {
    login({username: 'Jon', password: 'password'})
  }

  render() {
    return (
      <div className='app'>
        <Navbar />

        <div className='main'>
          <FigureContainer />
          <PlaybackContainer />
          <ChoreographyContainer />
        </div>
      </div>
    );
  }
}

export default App;
