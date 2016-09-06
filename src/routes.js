import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';
import App from './components/App';
import ManageAchievementPage from './components/achievement/ManageAchievementPage'; // Add/edit achievement
import Achievement from './components/achievement/Achievement'; // Achievement detail
import ManageLogPage from './components/log/ManageLogPage'; // Add/edit log
import Log from './components/log/Log'; // Log detail
import ManagePagePage from './components/page/ManagePagePage'; // Add/edit page
import Page from './components/page/Page'; // Page detail

export default (
      <Route path='/' component={App}> /* Root component */
            <Redirect from='home' to='/'/> /* Redict /home to just / */
            <IndexRoute page='home' component={Page}/> /* When on /, show the Page component and send 'home' as param */
            <Route path='achievements/add' component={ManageAchievementPage}/> /* Add new achievement */
            <Route path='achievements/:id/edit' component={ManageAchievementPage}/> /* Edit existing achievement */
            <Route path='achievements/:id' component={Achievement} /> /* See achievement detail page */
            <Route path='logs/add' component={ManageLogPage}/> /* Add new log item */
            <Route path='logs/:id/edit' component={ManageLogPage}/> /* Edit existing log item */
            <Route path='logs/:id' component={Log} /> /* See log item detail page */
            <Route path='pages/add' component={ManagePagePage}/> /* Add new page */
            <Redirect from='pages/:id' to=':id'/> /* Redirect page detail page with leading /pages to just the page id */
            <Route path='pages/:id/edit' component={ManagePagePage}/> /* Edit existing page */
            <Route path=':id' component={Page}/> /* See page detail */
            <Route path='/notfound' page='notfound' component={Page}/> /* When not found, there can be redirected to /notfound to show the notfound page */
      </Route>
);