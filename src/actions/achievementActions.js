import * as types from './actionTypes';
import achievementApi from '../api/mockAchievementApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

/**
 * Redux action that gets dispatched when API call to load all achievements is successful
 * @param achievements Array with all achievements
 * @returns {{type, achievements: Array}} Action to pass through the Redux reducers to update the application state
 */
export function loadAchievementsSuccess(achievements) {
    return {
        type: types.LOAD_ACHIEVEMENTS_SUCCESS,
        achievements
    };
}

/**
 * Redux action that gets dispatched when API call to create new achievement is successful
 * @param achievement Object with newly created achievement
 * @returns {{type, achievement: Array}} Action to pass through the Redux reducers to update the application state
 */
export function createAchievementSuccess(achievement) {
    return {
        type: types.CREATE_ACHIEVEMENT_SUCCESS,
        achievement
    };
}

/**
 * Redux action that gets dispatched when API call to update existing achievement is successful
 * @param achievement Object with updated achievement
 * @returns {{type, achievement: Array}} Action to pass through the Redux reducers to update the application state
 */
export function updateAchievementSuccess(achievement) {
    return {
        type: types.UPDATE_ACHIEVEMENT_SUCCESS,
        achievement
    };
}

/**
 * Redux action that gets dispatched when API call to delete achievement is successful
 * @param achievement Object with just deleted achievement
 * @returns {{type, achievement: Array}} Action to pass through the Redux reducers to update the application state
 */
export function deleteAchievementSuccess(achievement) {
    return {
        type: types.DELETE_ACHIEVEMENT_SUCCESS,
        achievement
    };
}

/**
 * Method to call to load all achievements from the API and dispatch actions to update application state
 * @returns {*} Promise that gets resolved when API call is done
 */
export function loadAchievements() {
    return dispatch => {
        dispatch(beginAjaxCall());
        return achievementApi.getAllAchievements()
          .then(achievements => {
              dispatch(loadAchievementsSuccess(achievements));
          })
          .catch(error => {
              throw(error);
          });
    };
}

/**
 * Method to call to load save or update an achievement from the API and dispatch actions to update application state
 * @param achievement Achievement to save or update
 * @returns {*} Promise that gets resolved when API call is done
 */
export function saveAchievement(achievement) {
    const a = Object.assign({}, achievement);
    return dispatch => {
        dispatch(beginAjaxCall());
        return achievementApi.saveAchievement(achievement)
          .then(achievement => {
              a.id ? dispatch(updateAchievementSuccess(achievement)) : dispatch(createAchievementSuccess(achievement));
          })
          .catch(error => {
              dispatch(ajaxCallError(error));
              throw(error);
          });
    };
}

/**
 * Method to call to delete an achievement from the API and dispatch actions to update application state
 * @param achievement Achievement to delete
 * @returns {*} Promise that gets resolved when API call is done
 */
export function deleteAchievement(achievement) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return achievementApi.deleteAchievement(achievement)
          .then(() => {
              dispatch(deleteAchievementSuccess(achievement));
          })
          .catch(error => {
              dispatch(ajaxCallError(error));
              throw(error);
          });
    };
}
