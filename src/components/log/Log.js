import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as logActions from '../../actions/logActions';
import {Link} from 'react-router';
import logModel from '../../models/logModel';

/**
 * Log detail component
 * @param log Log that is viewed
 * @returns {*} React Component
 * @constructor
 */
const Log = ({log, loggedIn}) => {
    return (
      <div>
          {loggedIn && <Link to={`/logs/${log.id}/edit`} className="btn btn-lg btn-primary">Edit log</Link>}
          <h1>{log.title}</h1>
          <p>{log.body}</p>
      </div>
    );
}

Log.propTypes = {
    actions: PropTypes.object.isRequired
};

Log.contextTypes = {
    router: PropTypes.object.isRequired
};

/**
 * Find and return a log item by id.
 * @param log items Array with all log items in application state to search through
 * @param id Achievement id to get log item object of
 * @returns {object} Return found log item or if not found the logModel
 * @private
 */
function getLogById_(logs, id) {
    const log = logs.find(log => log.id === id);
    if (log) return log;
    return logModel;
}

/**
 * Format the props needed by the component.
 * @param state Current application state object
 * @param ownProps Props passed by the parent component
 * @returns {{log: {id: string, title: string, body: string, type: string}}} Props to use in the component
 */
function mapStateToProps(state, ownProps) {
    let log = logModel;

    const logId = ownProps.params.id || ownProps.route.log; // Log item ID can be passed through params or the router itself

    if (logId && state.logs.length > 0) { // Get log item when there is an ID and there are logs
        log = getLogById_(state.logs, logId) || log;
    }

    return {
        log,
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
        actions: bindActionCreators(logActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Log); // Connect component to Redux store and pass the component to the result of the Redux connect function
