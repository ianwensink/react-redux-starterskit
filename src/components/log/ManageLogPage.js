import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as logActions from '../../actions/logActions';
import LogForm from './LogForm';
import toastr from 'toastr';
import logModel from '../../models/logModel';

/**
 * ManageLogPage Component Class
 */
class ManageLogPage extends React.Component {
    constructor(props, context) {
        super(props, context); // Always call super when overriding the React.Component constructor

        this.state = {
            log: Object.assign({}, logModel, props.log), // Make a copy of the merged logModel and optionally received log when editing
            errors: {},
            saving: false,
            deleteState: 0,
            logTypes: [],
            overviewTypes: [],
            editing: props.editing || false
        }; // Setup form state with initial values

        this.saveLog        = this.saveLog.bind(this); // Bind 'this' to function to 'this' in method is Class and not event target
        this.updateLogState = this.updateLogState.bind(this); // Bind 'this' to function to 'this' in method is Class and not event target
        this.deleteLog      = this.deleteLog.bind(this); // Bind 'this' to function to 'this' in method is Class and not event target
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.log.id != nextProps.log.id) { // Check if receieved (nextProps) log item id is not already the known log id
            this.setState({log: Object.assign({}, nextProps.log), editing: true}); // Necessary to populate form when existing log is loaded directly through url.
        }
    }

    /**
     * Method to call on every change in the form
     * @param event
     * @returns {*}
     */
    updateLogState(event) {
        const log    = this.state.log;
        if(Array.isArray(event)) { // Redux select component calls onChange with value object, not Event object
            log.references = event;
        } else {
            const field        = event.target.name;
            log[field] = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        }
        return this.setState({log});
    }

    /**
     * Method called when submitting the form
     * @param event
     * @param keepEditing Set to true to save log item and go to the edit page. Omit, or set to false to redirect to the log item page after saving
     */
    saveLog(event, keepEditing = false) {
        event.preventDefault();
        this.setState({saving: true});
        toastr.clear();
        this.props.actions.saveLog(this.state.log) // Dispatch save action
          .then(() => this.redirect(keepEditing))
          .catch(error => {
              toastr.error(error);
              this.setState({saving: false});
          });
    }

    /**
     * Method called when delete button is clicked
     * @param event
     */
    deleteLog(event = false) {
        if (!event) { // When false or nothing is passed, initialise deleteState
            this.setState({deleteState: 0});
        } else {
            if (event !== true) { // If event really is an Event, preventDefault submission
                event.preventDefault();
            }
            this.setState({deleteState: ++this.state.deleteState}); // Increment deleteState
        }
        if (this.state.deleteState === 1) { // When user clicks for the first time
            toastr.options.timeOut = 0; // Disable toastr timeout
            toastr.warning('Sure you want to delete this log item? Click again to confirm.'); // Show warning message
            toastr.options.timeOut = 5000; // Reset toastr timeout.
        } else if (this.state.deleteState === 2) { // When users clicks for the second time and confirms deletion
            const log = this.state.log;
            toastr.clear(); // Clear warning toastr
            this.props.actions.deleteLog(log) // Dispatch delete action
              .then(() => this.redirectAfterDelete(log))
              .catch(error => {
                  console.error(error);
                  toastr.error(error);
                  this.setState({deleting: false});
              });
        }
    }

    /**
     * Redirect after saving
     * @param keepEditing Set to true to save log item and go to the edit page. Omit, or set to false to redirect to the log item page after saving
     */
    redirect(keepEditing = false) {
        this.setState({saving: false});
        toastr.success('Log saved');
        this.context.router.push(keepEditing ? `/logs/${this.state.log.id}/edit` : `/logs/${this.state.log.id}`);
    }

    /**
     * Redirect after deletion
     * @param log Deleted log item
     */
    redirectAfterDelete(log) {
        this.setState({deleting: false});
        toastr.success(`Log <strong>${log.title}</strong> deleted`);
        this.context.router.push(`/logs`);
    }

    render() {
        return (
          <div>
              <h1>Manage Log</h1>
              <LogForm
                onChange={this.updateLogState}
                onSave={this.saveLog}
                onDelete={this.deleteLog}
                log={this.state.log}
                errors={this.state.errors}
                saving={this.state.saving}
                deleteState={this.state.deleteState}
                logTypes={this.props.logTypes}
                editing={this.state.editing}
                referenceOptions={this.props.referenceOptions}
                statusTypes={this.props.statusTypes}
              />
          </div>
        );
    }
}

ManageLogPage.propTypes = {
    log: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

ManageLogPage.contextTypes = {
    router: PropTypes.object.isRequired
};

/**
 * Find and return a log item by id.
 * @param logs Array with all logs in application state to search through
 * @param id Log item id to get log object of
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
 * @returns {{log: {id: string, title: string, body: string, type: string}, logTypes: *[], editing: (*|boolean), referenceOptions: Array, statusTypes: *[]}} Props to use in the component
 */
function mapStateToProps(state, ownProps) {
    let log = logModel;

    const logId = ownProps.params.id;

    const editing = logId && state.logs.length > 0;  // Log item id is present

    if (editing) {
        log = getLogById_(state.logs, logId);
    }

    return {
        log,
        editing
    };
}

/**
 * Bind and connect all actions to component and Redux store
 * @param dispatch
 * @returns {{actions: *}}
 */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(logActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageLogPage); // Connect component to Redux store and pass the component to the result of the Redux connect function
