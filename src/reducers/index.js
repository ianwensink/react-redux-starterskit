import {combineReducers} from 'redux';
import achievements from './achievementReducer';
import pages from './pageReducer';
import logs from './logReducer';
import numAjaxCallsInProgress from './ajaxStatusReducer';
import loggedIn from './logInReducer';

const rootReducer = combineReducers({ // Combine all reducers into one so Redux can pass a dispatched action to the rootReducer
    achievements, // Achievements Redux reducer. Name is used as key in application state
    pages, // Pages Redux reducer. Name is used as key in application state
    logs, // Logs Redux reducer. Name is used as key in application state
    numAjaxCallsInProgress, // AjaxCalls Redux reducer. Name is used as key in application state
    loggedIn, // LogIn Redux reducer. Name is used as key in application state
});

export default rootReducer;