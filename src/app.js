import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import processVars from '../tools/webpack/vars';

import './styles/styles.scss'; // Import SASS so webpack plugin Extract text plugin can load it from the JavaScript and the sass-loader can compile it to CSS

let stateStorage = JSON.stringify(window.INITIAL_STATE); // Initial state provided by the server and injected into the window
stateStorage = processVars.vars.stateStorage.use && typeof localStorage !== 'undefined' && localStorage.length ? localStorage.getItem(processVars.vars.stateStorage.key) : stateStorage ||  stateStorage; // Try to get a state from the browser's localStorage, when none is available, use the server side generated state
const initialState = JSON.parse(stateStorage); // Parse JSON string to JSON object
const store        = configureStore(initialState); // Create store from initialState

render(
  <Provider store={store}>
      <Router history={browserHistory} routes={routes}/>
  </Provider>,
  document.getElementById('app')
);