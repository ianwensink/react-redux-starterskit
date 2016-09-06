import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as achievementActions from '../../actions/achievementActions';
import AchievementForm from './AchievementForm';
import toastr from 'toastr';
import achievementModel from '../../models/achievementModel';
import achievementTypes from '../../models/achievementTypes';
import statusTypes from '../../models/statusTypes';

/**
 * ManageAchievementPage Component Class
 */
class ManageAchievementPage extends React.Component {
    constructor(props, context) {
        super(props, context); // Always call super when overriding the React.Component constructor

        this.state = {
            achievement: Object.assign({}, achievementModel, props.achievement), // Make a copy of the merged achievementModel and optionally received achievement when editing
            errors: {},
            saving: false,
            deleteState: 0,
            achievementTypes: [],
            overviewTypes: [],
            editing: props.editing || false
        }; // Setup form state with initial values

        this.saveAchievement        = this.saveAchievement.bind(this); // Bind 'this' to function to 'this' in method is Class and not event target
        this.updateAchievementState = this.updateAchievementState.bind(this); // Bind 'this' to function to 'this' in method is Class and not event target
        this.deleteAchievement      = this.deleteAchievement.bind(this); // Bind 'this' to function to 'this' in method is Class and not event target
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.achievement.id != nextProps.achievement.id) { // Check if receieved (nextProps) achievement id is not already the known achievement id
            this.setState({achievement: Object.assign({}, nextProps.achievement), editing: true}); // Necessary to populate form when existing achievement is loaded directly through url.
        }
    }

    /**
     * Method to call on every change in the form
     * @param event
     * @returns {*}
     */
    updateAchievementState(event) {
        const achievement    = this.state.achievement;
        if(Array.isArray(event)) { // Redux select component calls onChange with value object, not Event object
            achievement.references = event;
        } else if(event) {
            const field        = event.target.name;
            achievement[field] = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        } else {
            achievement.references = [];
        }
        return this.setState({achievement});
    }

    /**
     * Method called when submitting the form
     * @param event
     * @param keepEditing Set to true to save achievement and go to the edit page. Omit, or set to false to redirect to the achievement page after saving
     */
    saveAchievement(event, keepEditing = false) {
        event.preventDefault();
        this.setState({saving: true});
        toastr.clear();
        this.props.actions.saveAchievement(this.state.achievement) // Dispatch save action
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
    deleteAchievement(event = false) {
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
            toastr.warning('Sure you want to delete this achievement? Click again to confirm.'); // Show warning message
            toastr.options.timeOut = 5000; // Reset toastr timeout.
        } else if (this.state.deleteState === 2) { // When users clicks for the second time and confirms deletion
            const achievement = this.state.achievement;
            toastr.clear(); // Clear warning toastr
            this.props.actions.deleteAchievement(achievement) // Dispatch delete action
              .then(() => this.redirectAfterDelete(achievement))
              .catch(error => {
                  console.error(error);
                  toastr.error(error);
                  this.setState({deleting: false});
              });
        }
    }

    /**
     * Redirect after saving
     * @param keepEditing Set to true to save achievement and go to the edit page. Omit, or set to false to redirect to the achievement page after saving
     */
    redirect(keepEditing = false) {
        this.setState({saving: false});
        toastr.success('Achievement saved');
        this.context.router.push(keepEditing ? `/achievements/${this.state.achievement.id}/edit` : `/achievements/${this.state.achievement.id}`);
    }

    /**
     * Redirect after deletion
     * @param achievement Deleted achievement
     */
    redirectAfterDelete(achievement) {
        this.setState({deleting: false});
        toastr.success(`Achievement <strong>${achievement.title}</strong> deleted`);
        this.context.router.push(`/achievements`);
    }

    render() {
        return (
          <div>
              <h1>Manage Achievement</h1>
              <AchievementForm
                onChange={this.updateAchievementState}
                onSave={this.saveAchievement}
                onDelete={this.deleteAchievement}
                achievement={this.state.achievement}
                errors={this.state.errors}
                saving={this.state.saving}
                deleteState={this.state.deleteState}
                achievementTypes={this.props.achievementTypes}
                editing={this.state.editing}
                referenceOptions={this.props.referenceOptions}
                statusTypes={this.props.statusTypes}
              />
          </div>
        );
    }
}

ManageAchievementPage.propTypes = {
    achievement: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

ManageAchievementPage.contextTypes = {
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
    if (achievement) return achievement;
    return achievementModel;
}

/**
 * Format the props needed by the component.
 * @param state Current application state object
 * @param ownProps Props passed by the parent component
 * @returns {{achievement: {id: string, title: string, body: string, type: string, status: string, references: Array}, achievementTypes: *[], editing: (*|boolean), referenceOptions: Array, statusTypes: *[]}} Props to use in the component
 */
function mapStateToProps(state, ownProps) {
    let achievement = achievementModel;

    const achievementId = ownProps.params.id;

    const editing = achievementId && state.achievements.length > 0; // Achievement id is present

    if (editing) {
        achievement = getAchievementById_(state.achievements, achievementId);
    }

    const formattedStatusTypes = statusTypes.map(type => {
        return {
            value: type.value,
            text: type.label
        }
    })

    let referenceOptions = [];
    if(state.pages.length) { // Pages are present
        const options = [...state.pages, ...state.logs]; // Merge pages and logs to one references array
        referenceOptions = options.map(option => { // Format items to real option values
            return {
                value: option.id,
                label: `${option.title} (${option.content_type})`
            }
        });
    }

    const formattedAchievementTypes = achievementTypes.map(type => {
        return {
            value: type.value,
            text: type.label
        }
    });

    return {
        achievement,
        achievementTypes: formattedAchievementTypes,
        editing,
        referenceOptions,
        statusTypes: formattedStatusTypes
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageAchievementPage); // Connect component to Redux store and pass the component to the result of the Redux connect function
