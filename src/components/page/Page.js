import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as pageActions from '../../actions/pageActions';
import {Link} from 'react-router';
import PageList from './PageList';
import AchievementList from '../achievement/AchievementList';
import LogList from '../log/LogList';
import pageModel from '../../models/pageModel';

/**
 * Page detail component
 * @param page Page that is viewed
 * @returns {*} React Component
 * @constructor
 */
const Page = ({page, data, loggedIn}) => {
    let OverviewPage;
    switch (page.overview_type) { // Generically switch on overview type to allow a view mode per overview type
        case 'achievement':
            OverviewPage = AchievementList;
            break;
        case 'log':
            OverviewPage = LogList;
            break;
        case 'page':
        default:
            OverviewPage = PageList;
    }
    return (
      <div className='overview-page'>
          {loggedIn && page.type === 'overview' &&
          <Link to={`/${page.overview_type}s/add`} className="btn btn-primary btn-lg">Add
              new {page.overview_type}</Link>}
          {loggedIn && <Link to={`/pages/${page.id}/edit`}
                className={`btn btn-lg ${page.type !== 'overview' ? ' btn-primary' : ''}`}>Edit page</Link>}
          <h1>{page.title}</h1>
          <p>{page.body}</p>
          {page.type === 'overview' && <OverviewPage data={data}/>}
      </div>
    );
}

Page.propTypes = {
    actions: PropTypes.object.isRequired
};

Page.contextTypes = {
    router: PropTypes.object.isRequired
};

/**
 * Find and return an page by id.
 * @param pages Array with all pages in application state to search through
 * @param id Page id to get page object of
 * @returns {object} Return found page or if not found the pageModel
 * @private
 */
function getPageById_(pages, id) {
    const page = pages.find(page => page.id === id);
    if (page) return page;
    return pageModel;
}

/**
 * Format the props needed by the component.
 * @param state Current application state object
 * @param ownProps Props passed by the parent component
 * @returns {{page: {id: string, title: string, body: string, type: string, overview_type: string, access: boolean, show_nav: boolean}, data: (*|Array)}} Props to use in the component
 */
function mapStateToProps(state, ownProps) {
    let page = pageModel;

    const pageId = ownProps.params.id || ownProps.route.page;  // Page ID can be passed through params or the router itself

    if (pageId && state.pages.length > 0) { // Get page when there is an ID and there are pages
        page = getPageById_(state.pages, pageId) || page;
    }

    const data = state[(page.overview_type || '') + 's'] || []; // Get all items of current page overview type (achievements, pages, or logs)

    return {
        page,
        data,
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
        actions: bindActionCreators(pageActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Page); // Connect component to Redux store and pass the component to the result of the Redux connect function
