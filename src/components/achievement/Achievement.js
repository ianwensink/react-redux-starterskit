import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as achievementActions from '../../actions/achievementActions';
import {Link} from 'react-router';
import achievementModel from '../../models/achievementModel';

/**
 * Achievement detail component
 * @param achievement Achievement that is viewed
 * @returns {*} React Component
 * @constructor
 */
const Achievement = ({achievement, loggedIn}) => {
    const references = achievement.references.map(reference =>
      <li key={reference.id}>
          <Link to={`/${reference.content_type}s/${reference.id}`}>{reference.title}</Link>
      </li>
    );

    return (
        <div>
            {loggedIn && <Link to={`/achievements/${achievement.id}/edit`} className="btn btn-lg btn-primary">Edit achievement</Link>}
              <h1>{achievement.title}</h1>
              <p>{achievement.body}</p>
              <span>Status:{' '}
                  <i className={`glyphicon ${achievement.status && achievement.status.class}`}></i>
                  {' '}
                  {achievement.status && achievement.status.label}
              </span>
              <p>Category: {achievement.type}</p>
              <h2>References</h2>
              <p>Read more about this achievement on any of the following pages and/or log items.</p>
              <ol>
                  {references}
              </ol>
        </div>
    );
}

Achievement.propTypes = {
    actions: PropTypes.object.isRequired
};

Achievement.contextTypes = {
    router: PropTypes.object.isRequired
};

/**
 * Find and return an achievement by id.
 * @param achievements Array with all achievements in application state to search through
 * @param id Achievement id to get achievement object of
 * @returns {object} Return found achievement or if not found the achievementModel
 * @private
 */
function getAchievementById_(achievements, id) {
    const achievement = achievements.find(achievement => achievement.id === id);
    if (achievement) return Object.assign({}, achievement);
    return achievementModel;
}

/**
 * Format the props needed by the component.
 * @param state Current application state object
 * @param ownProps Props passed by the parent component
 * @returns {{achievement: {id: string, title: string, body: string, type: string, status: string, references: Array}}} Props to use in the component
 */
function mapStateToProps(state, ownProps) {
    let achievement = achievementModel;

    const achievementId = ownProps.params.id || ownProps.route.achievement; // Achievement ID can be passed through params or the router itself

    if (achievementId && state.achievements.length > 0) { // Get achievement when there is an ID and there are achievements
        achievement = getAchievementById_(state.achievements, achievementId) || achievement;
    }

    if(state.pages.length || state.logs.length) { // Populate achievements references only if pages or logs are present in application state
        achievement.references = achievement.references.map(reference => {
            return state.pages.find(page => page.id === reference.value) || state.logs.find(log => log.id === reference.value) || {
                  id: '',
                  title: '',
                  overview_type: ''
              } // When reference is not found, return default reference object
        });
    }

    return {
        achievement,
        loggedIn: state.loggedIn
    };
}

/**
 * Bind and connect all actions to component and Redux store
 * @param dispatch
 * @returns {{actions: *}}
 */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(achievementActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Achievement); // Connect component to Redux store and pass the component to the result of the Redux connect function
