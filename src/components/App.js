import React, { Component } from 'react';
import { login } from '../services/choreoBackendApi';
import Figure from './figure';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Figure />
      </div>
    );
  }
}

export default App;
