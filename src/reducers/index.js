import { combineReducers } from 'redux';
import numAjaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({ // Combine all reducers into one so Redux can pass a dispatched action to the rootReducer
  numAjaxCallsInProgress // AjaxCalls Redux reducer. Name is used as key in application state
});

export default rootReducer;
