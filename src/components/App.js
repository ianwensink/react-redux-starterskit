import React, {PropTypes} from 'react';
import Header from './common/Header';
import {connect} from 'react-redux';

/**
 * React root component that handles the App template used on every page
 * @param loading Whether application is currently performing an async request
 * @param pages Array with pages to use in the Header component
 * @param children Child components to render as main content
 * @returns {*} React Component
 * @constructor
 */
const App = ({loading, pages, children, loggedIn}) => {
    return (
      <div className="container-fluid">
          <Header
            loading={loading}
            pages={pages}
            loggedIn={loggedIn}
          />
          {children}
      </div>
    );
}

App.propTypes = {
    children: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    loggedIn: PropTypes.bool.isRequired
};

/**
 * Format the props needed by the component.
 * @param state Current application state object
 * @param ownProps Props passed by the parent component
 * @returns {{loading: boolean, pages: Array}} Props to use in the component
 */
function mapStateToProps(state, ownProps) {
    return {
        loading: state.numAjaxCallsInProgress > 0,
        pages: state.pages,
        loggedIn: state.loggedIn
    };
}

export default connect(mapStateToProps)(App); // Connect component to Redux store and pass the component to the result of the Redux connect function
