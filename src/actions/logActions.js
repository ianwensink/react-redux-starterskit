import * as types from './actionTypes';
import logApi from '../api/mockLogApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

/**
 * Redux action that gets dispatched when API call to load all logs is successful
 * @param logs Array with all logs
 * @returns {{type, logs: Array}} Action to pass through the Redux reducers to update the application state
 */
export function loadLogsSuccess(logs) {
    return {
        type: types.LOAD_LOGS_SUCCESS,
        logs
    };
}

/**
 * Redux action that gets dispatched when API call to create new log is successful
 * @param log Object with newly created log
 * @returns {{type, log: Array}} Action to pass through the Redux reducers to update the application state
 */
export function createLogSuccess(log) {
    return {
        type: types.CREATE_LOG_SUCCESS,
        log
    };
}

/**
 * Redux action that gets dispatched when API call to update existing log is successful
 * @param log Object with updated log
 * @returns {{type, log: Array}} Action to pass through the Redux reducers to update the application state
 */
export function updateLogSuccess(log) {
    return {
        type: types.UPDATE_LOG_SUCCESS,
        log
    };
}

/**
 * Redux action that gets dispatched when API call to delete log is successful
 * @param log Object with just deleted log
 * @returns {{type, log: Array}} Action to pass through the Redux reducers to update the application state
 */
export function deleteLogSuccess(log) {
    return {
        type: types.DELETE_LOG_SUCCESS,
        log
    };
}

/**
 * Method to call to load all logs from the API and dispatch actions to update application state
 * @returns {*} Promise that gets resolved when API call is done
 */
export function loadLogs() {
    return dispatch => {
        dispatch(beginAjaxCall());
        return logApi.getAllLogs()
          .then(logs => {
              dispatch(loadLogsSuccess(logs));
          })
          .catch(error => {
              throw(error);
          });
    };
}

/**
 * Method to call to load save or update an log from the API and dispatch actions to update application state
 * @param log Log to save or update
 * @returns {*} Promise that gets resolved when API call is done
 */
export function saveLog(log) {
    const l = Object.assign({}, log);
    return dispatch => {
        dispatch(beginAjaxCall());
        return logApi.saveLog(log)
          .then(log => {
              l.id ? dispatch(updateLogSuccess(log)) : dispatch(createLogSuccess(log));
          })
          .catch(error => {
              dispatch(ajaxCallError(error));
              throw(error);
          });
    };
}

/**
 * Method to call to delete an log from the API and dispatch actions to update application state
 * @param log Log to delete
 * @returns {*} Promise that gets resolved when API call is done
 */
export function deleteLog(log) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return logApi.deleteLog(log)
          .then(() => {
              dispatch(deleteLogSuccess(log));
          })
          .catch(error => {
              dispatch(ajaxCallError(error));
              throw(error);
          });
    };
}
