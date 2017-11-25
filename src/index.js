import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers/index'; 
import { createStore } from 'redux'; 
import { Provider } from 'react-redux'; 
import { BrowserRouter as Router } from 'react-router-dom'; 

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>, document.getElementById('root')
);

registerServiceWorker();
