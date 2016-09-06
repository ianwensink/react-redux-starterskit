import * as types from './actionTypes';
import pageApi from '../api/mockPageApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

/**
 * Redux action that gets dispatched when API call to load all pages is successful
 * @param pages Array with all pages
 * @returns {{type, pages: Array}} Action to pass through the Redux reducers to update the application state
 */
export function loadPagesSuccess(pages) {
    return {
        type: types.LOAD_PAGES_SUCCESS,
        pages
    };
}

/**
 * Redux action that gets dispatched when API call to create new page is successful
 * @param page Object with newly created page
 * @returns {{type, page: Array}} Action to pass through the Redux reducers to update the application state
 */
export function createPageSuccess(page) {
    return {
        type: types.CREATE_PAGE_SUCCESS,
        page
    };
}

/**
 * Redux action that gets dispatched when API call to update existing page is successful
 * @param page Object with updated page
 * @returns {{type, page: Array}} Action to pass through the Redux reducers to update the application state
 */
export function updatePageSuccess(page) {
    return {
        type: types.UPDATE_PAGE_SUCCESS,
        page
    };
}

/**
 * Redux action that gets dispatched when API call to delete page is successful
 * @param page Object with just deleted page
 * @returns {{type, page: Array}} Action to pass through the Redux reducers to update the application state
 */
export function deletePageSuccess(page) {
    return {
        type: types.DELETE_PAGE_SUCCESS,
        page
    };
}

/**
 * Method to call to load all pages from the API and dispatch actions to update application state
 * @returns {*} Promise that gets resolved when API call is done
 */
export function loadPages() {
    return dispatch => {
        dispatch(beginAjaxCall());
        return pageApi.getAllPages()
          .then(pages => {
              dispatch(loadPagesSuccess(pages));
          })
          .catch(error => {
              throw(error);
          });
    };
}

/**
 * Method to call to load save or update an page from the API and dispatch actions to update application state
 * @param page Page to save or update
 * @returns {*} Promise that gets resolved when API call is done
 */
export function savePage(page) {
    const p = Object.assign({}, page);
    return dispatch => {
        dispatch(beginAjaxCall());
        return pageApi.savePage(page)
          .then(page => {
              p.id ? dispatch(updatePageSuccess(page)) : dispatch(createPageSuccess(page));
          })
          .catch(error => {
              dispatch(ajaxCallError(error));
              throw(error);
          });
    };
}

/**
 * Method to call to delete an page from the API and dispatch actions to update application state
 * @param page Page to delete
 * @returns {*} Promise that gets resolved when API call is done
 */
export function deletePage(page) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return pageApi.deletePage(page)
          .then(() => {
              dispatch(deletePageSuccess(page));
          })
          .catch(error => {
              dispatch(ajaxCallError(error));
              throw(error);
          });
    };
}
