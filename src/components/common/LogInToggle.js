import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as logInActions from '../../actions/logInActions';
import toastr from 'toastr';

/**
 * LogInToggle Component Class
 */
class LogInToggle extends React.Component {
    constructor(props, context) {
        super(props, context); // Always call super when overriding the React.Component constructor

        this.onToggle = this.onToggle.bind(this); // Bind 'this' to function to 'this' in method is Class and not event target
    }

    /**
     * Method called when toggling log in
     * @param event
     */
    onToggle(event) {
        event.preventDefault();
        this.props.actions.toggleLogIn(); // Dispatch toggle action
        toastr.success(`You are now logged ${this.props.loggedIn ? 'out' : 'in'}`);
    }

    render() {
        return (
          <button onClick={this.onToggle} className='btn btn-primary'>Toggle log in (now logged {this.props.loggedIn ? 'in' : 'out'})</button>
        );
    }
}

LogInToggle.propTypes = {
    actions: PropTypes.object.isRequired
};

LogInToggle.contextTypes = {
    router: PropTypes.object.isRequired
};

/**
 * Bind and connect all actions to component and Redux store
 * @param dispatch
 * @returns {{actions: *}}
 */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(logInActions, dispatch),
    };
}

export default connect(undefined, mapDispatchToProps)(LogInToggle); // Connect component to Redux store and pass the component to the result of the Redux connect function
