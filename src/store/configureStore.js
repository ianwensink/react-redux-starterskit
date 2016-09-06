import { createStore, applyMiddleware, compose } from 'redux';
import invariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';
import rootReducer from '../reducers';
import * as processVars from '../../tools/webpack/vars';

/**
 * Method to create a store for Redux to store the app state in. Middleware is added here
 * @param initialState
 * @returns Redux store
 */
export default function configureStore(initialState) {
  const middleware = process.env.NODE_ENV !== 'production' ?
      [thunk, invariant()] :
      [thunk]; // Only add invariant middleware on development environment
  return createStore(
      rootReducer, // Combined Redux reducers
      initialState, // Initial app state (form localStorage or server side rendering)
      compose( // Compose middleware
        applyMiddleware(...middleware),
        processVars.vars.stateStorage.use && typeof window === 'object' ? persistState(processVars.vars.stateStorage.paths, {
          key: processVars.vars.stateStorage.key
        }) : f => f, // Only add persistState (for localStorage state support) client side, not server side
        typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' && process.env.NODE_ENV !== 'production' ? window.devToolsExtension() : f => f // Only add Redux devtools client side, not server side, and only when on development environment
      )
    );
}
