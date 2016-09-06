import * as types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * logIn Redux reducer.
 * @param state Current loggedIn state, defaults to the initial loggedIn state
 * @param action Action with required type property to distinguish actions
 * @returns object New loggedIn state to store in the Redux store
 */
export default function logInReducer(state = initialState.loggedIn, action) {
    if (action.type == types.TOGGLE_LOG_IN) {
        return !state; // Logged in state is toggled, so invert the current state
    }

    return state; // When dispatched action is not used in this reducer, just return given state
}