import * as types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * Page Redux reducer.
 * @param state Current achievements state, defaults to the initial achievements state
 * @param action Action with required type property to distinguish actions
 * @returns object New achievements state to store in the Redux store
 */
export default function achievementReducer(state = initialState.achievements, action) {
    switch (action.type) {
        case types.LOAD_ACHIEVEMENTS_SUCCESS:
            return action.achievements; // Just store the reveiced achievements
        case types.CREATE_ACHIEVEMENT_SUCCESS:
            return [
                ...state,
                Object.assign({}, action.achievement) // Add copy of new achievement to state
            ];
        case types.UPDATE_ACHIEVEMENT_SUCCESS:
            const indexToUpdate = state.findIndex(achievement => achievement.id === action.achievement.id);
            return [
                ...state.slice(0, indexToUpdate),
                Object.assign({}, action.achievement),
                ...state.slice(indexToUpdate + 1) // Replace edited achievement
            ];
        case types.DELETE_ACHIEVEMENT_SUCCESS:
            return [
                ...state.filter(achievement => achievement.id !== action.achievement.id) // Filter out achievement to delete
            ]
        default:
            return state; // When dispatched action is not used in this reducer, just return given state
    }
}