import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as pageActions from '../../actions/pageActions';
import PageForm from './PageForm';
import toastr from 'toastr';
import pageModel from '../../models/pageModel';

/**
 * ManagePagePage Component Class
 */
class ManagePagePage extends React.Component {
    constructor(props, context) {
        super(props, context); // Always call super when overriding the React.Component constructor

        this.state = {
            page: Object.assign({}, pageModel, props.page), // Make a copy of the merged achievementModel and optionally received achievement when editing
            errors: {},
            saving: false,
            deleteState: 0,
            pageTypes: [],
            overviewTypes: [],
            editing: props.editing || false
        }; // Setup form state with initial values

        this.savePage        = this.savePage.bind(this); // Bind 'this' to function to 'this' in method is Class and not event target
        this.updatePageState = this.updatePageState.bind(this); // Bind 'this' to function to 'this' in method is Class and not event target
        this.deletePage      = this.deletePage.bind(this); // Bind 'this' to function to 'this' in method is Class and not event target
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.page.id != nextProps.page.id) { // Check if receieved (nextProps) page id is not already the known page id
            this.setState({page: Object.assign({}, nextProps.page), editing: true}); // Necessary to populate form when existing page is loaded directly through url.
        }
    }

    /**
     * Method to call on every change in the form
     * @param event
     * @returns {*}
     */
    updatePageState(event) {
        const page    = this.state.page;
        if(Array.isArray(event)) { // Redux select component calls onChange with value object, not Event object
            page.references = event;
        } else {

            const field = event.target.name;
            page[field] = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        }
        return this.setState({page});
    }

    /**
     * Method called when submitting the form
     * @param event
     * @param keepEditing Set to true to save page and go to the edit page. Omit, or set to false to redirect to the page after saving
     */
    savePage(event, keepEditing = false) {
        event.preventDefault();
        this.setState({saving: true});
        toastr.clear();
        this.props.actions.savePage(this.state.page) // Dispatch save action
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
    deletePage(event = false) {
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
            const page = this.state.page;
            toastr.clear(); // Clear warning toastr
            this.props.actions.deletePage(page)  // Dispatch delete action
              .then(() => this.redirectAfterDelete(page))
              .catch(error => {
                  console.error(error);
                  toastr.error(error);
                  this.setState({deleting: false});
              });
        }
    }

    /**
     * Redirect after saving
     * @param keepEditing Set to true to save page and go to the edit page. Omit, or set to false to redirect to the page after saving
     */
    redirect(keepEditing = false) {
        this.setState({saving: false});
        toastr.success('Page saved');
        this.context.router.push(keepEditing ? `/pages/${this.state.page.id}/edit` : `/${this.state.page.id}`);
    }

    /**
     * Redirect after deletion
     * @param page Deleted page
     */
    redirectAfterDelete(page) {
        this.setState({deleting: false});
        toastr.success(`Page <strong>${page.title}</strong> deleted`);
        this.context.router.push(`/pages`);
    }

    render() {
        return (
          <div>
              <h1>Manage Page</h1>
              <PageForm
                onChange={this.updatePageState}
                onSave={this.savePage}
                onDelete={this.deletePage}
                page={this.state.page}
                errors={this.state.errors}
                saving={this.state.saving}
                deleteState={this.state.deleteState}
                pageTypes={this.props.pageTypes}
                overviewTypes={this.props.overviewTypes}
                editing={this.state.editing}
              />
          </div>
        );
    }
}

ManagePagePage.propTypes = {
    page: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

ManagePagePage.contextTypes = {
    router: PropTypes.object.isRequired
};

/**
 * Find and return an page by id.
 * @param pages Array with all pages in application state to search through
 * @param id Achievement id to get page object of
 * @returns {object} Return found page or if not found the pageModel
 * @private
 */
function getPageById_(pages, id) {
    const page = pages.find(page => page.id === id);
    if (page) return page; //since filter returns an array, have to grab the first.
    return pageModel;
}

/**
 * Format the props needed by the component.
 * @param state Current application state object
 * @param ownProps Props passed by the parent component
 * @returns {{page: {id: string, title: string, body: string, type: string, overview_type: string, access: boolean, show_nav: boolean}, pageTypes: *[], overviewTypes: *[], editing: (*|boolean)}} Props to use in the component
 */
function mapStateToProps(state, ownProps) {
    let page = pageModel;

    const pageId = ownProps.params.id;

    const editing = pageId && state.pages.length > 0; // Page id is present

    if (editing) {
        page = getPageById_(state.pages, pageId);
    }

    const pageTypes = [
        {
            value: "overview",
            text: "Overview page"
        },
        {
            value: "basic",
            text: "Basic page"
        }
    ];

    const overviewTypes = [
        {
            value: "achievement",
            text: "Achievements"
        },
        {
            value: "log",
            text: "Logs"
        },
        {
            value: "page",
            text: "Pages"
        }
    ];

    return {
        page,
        pageTypes,
        overviewTypes,
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
        actions: bindActionCreators(pageActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePagePage); // Connect component to Redux store and pass the component to the result of the Redux connect function
