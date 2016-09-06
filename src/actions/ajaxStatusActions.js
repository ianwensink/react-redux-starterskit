import * as types from './actionTypes';

/**
 * Redux action that gets dispatched when API call is started
 * @returns {{type}} Action to pass through the Redux reducers to update the application state
 */
export function beginAjaxCall() {
    return {
        type: types.BEGIN_AJAX_CALL
    };
}

/**
 * Redux action that gets dispatched when API call has failed
 * @returns {{type}} Action to pass through the Redux reducers to update the application state
 */
export function ajaxCallError() {
    return {
        type: types.AJAX_CALL_ERROR
    };
}
