import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

/**
 * Redux action that gets dispatched when logging in
 * @returns {{type}} Action to pass through the Redux reducers to update the application state
 */
export function toggleLogInSuccess() {
    return {
        type: types.TOGGLE_LOG_IN
    };
}

/**
 * Method to call to toggle logged in state
 * @returns {*} Promise that gets resolved when API call is done
 */
export function toggleLogIn() {
    return dispatch => {
        dispatch(beginAjaxCall());
        dispatch(toggleLogInSuccess());
    };
}
