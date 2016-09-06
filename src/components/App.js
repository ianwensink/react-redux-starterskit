import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * React root component that handles the App template used on every page
 * @param children Child components to render as main content
 * @returns {*} React Component
 * @constructor
 */
const App = ({ children }) => {
  return (
      <div className="container-fluid">
          {children}
      </div>
    );
};

App.propTypes = {
  children: PropTypes.object.isRequired
};

/**
 * Format the props needed by the component.
 * @param state Current application state object
 * @returns {{state: *}} Props to use in the component
 */
function mapStateToProps(state) {
  return {
    state
  };
}

export default connect(mapStateToProps)(App); // Connect component to Redux store and pass the component to the result of the Redux connect function
