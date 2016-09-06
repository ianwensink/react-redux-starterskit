import * as types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * Page Redux reducer.
 * @param state Current pages state, defaults to the initial pages state
 * @param action Action with required type property to distinguish actions
 * @returns object New pages state to store in the Redux store
 */
export default function pageReducer(state = initialState.pages, action) {
    switch (action.type) {
        case types.LOAD_PAGES_SUCCESS:
            return action.pages; // Just store the reveiced pages
        case types.CREATE_PAGE_SUCCESS:
            return [
                ...state,
                Object.assign({}, action.page) // Add copy of new page to state
            ];
        case types.UPDATE_PAGE_SUCCESS:
            const indexToUpdate = state.findIndex(page => page.id === action.page.id);
            return [
                ...state.slice(0, indexToUpdate),
                Object.assign({}, action.page),
                ...state.slice(indexToUpdate + 1) // Replace edited page
            ];
        case types.DELETE_PAGE_SUCCESS:
            return [
                ...state.filter(page => page.id !== action.page.id) // Filter out page to delete
            ]
        default:
            return state; // When dispatched action is not used in this reducer, just return given state
    }
}