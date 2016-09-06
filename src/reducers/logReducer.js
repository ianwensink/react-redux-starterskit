import * as types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * Logs Redux reducer.
 * @param state Current logs state, defaults to the initial logs state
 * @param action Action with required type property to distinguish actions
 * @returns object New logs state to store in the Redux store
 */
export default function logReducer(state = initialState.logs, action) {
    switch (action.type) {
        case types.LOAD_LOGS_SUCCESS:
            return action.logs; // Just store the reveiced logs
        case types.CREATE_LOG_SUCCESS:
            return [
                ...state,
                Object.assign({}, action.log) // Add copy of new log to state
            ];
        case types.UPDATE_LOG_SUCCESS:
            return [
                ...state.filter(log => log.id !== action.log.id),
                Object.assign({}, action.log) // Filter out existing log and add copy of new log to state
            ];
        case types.DELETE_LOG_SUCCESS:
            return [
                ...state.filter(log => log.id !== action.log.id) // Filter out log to delete
            ]
        default:
            return state; // When dispatched action is not used in this reducer, just return given state
    }
}