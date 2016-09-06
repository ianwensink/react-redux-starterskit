import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import {loadAchievements} from './actions/achievementActions';
import {loadPages} from './actions/pageActions';
import {loadLogs} from './actions/logActions';

import './styles/styles.scss'; // Import SASS so webpack plugin Extract text plugin can load it from the JavaScript and the sass-loader can compile it to CSS

const serverState = JSON.stringify(window.INITIAL_STATE); // Initial state provided by the server and injected into the window
const localStorageCopy = typeof localStorage !== 'undefined' && localStorage.length ? localStorage.getItem('stageverslagState') : serverState ||  serverState; // Try to get a state from the browser's localStorage, when none is availble, use the server side generated state

const initialState = JSON.parse(localStorageCopy); // Parse JSON string to JSON object
const store        = configureStore(initialState); // Create store from initialState

render(
  <Provider store={store}>
      <Router history={browserHistory} routes={routes}/>
  </Provider>,
  document.getElementById('app')
);