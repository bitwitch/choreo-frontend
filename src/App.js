import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { login } from './services/choreoBackendApi';
import Figure from './components/figure';

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
