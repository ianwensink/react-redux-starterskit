import * as types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * Function to check if the passed string ends in success, because then the request was successful
 * @param type string String to check
 * @returns boolean Returns if type ends with _SUCCESS or not
 * @private
 */
function actionTypeEndsInSuccess_(type) {
    return type.endsWith('_SUCCESS');
}

/**
 * ajaxStatus Redux reducer.
 * @param state Current ajaxStatus state, defaults to the initial numAjaxCallsInProgress state
 * @param action Action with required type property to distinguish actions
 * @returns object New ajaxStatus state to store in the Redux store
 */
export default function ajaxStatusReducer(state = initialState.numAjaxCallsInProgress, action) {
    if (action.type == types.BEGIN_AJAX_CALL) {
        return state + 1; // New ajax call is started, increment state to, for instance, show a loader during the call
    } else if (action.type == types.AJAX_CALL_ERROR || actionTypeEndsInSuccess_(action.type)) {
        return state - 1; // Ajax call stopped, so decrement state to, for instance, stop loader
    }

    return state; // When dispatched action is not used in this reducer, just return given state
}