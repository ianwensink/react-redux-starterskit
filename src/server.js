import express from 'express';
import React from 'react';
import {match, RouterContext} from 'react-router';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import routes from './routes';
import configureServer from '../tools/server/configureServer';
import initialState from './reducers/initialState';
import {loadAchievements} from './actions/achievementActions';
import {loadPages} from './actions/pageActions';
import {loadLogs} from './actions/logActions';

const app = express();

app.use(configureServer()); // Get Express app based on environment

app.set('view engine', 'pug'); // Use pug to render index and 404 pages
app.set('views', `${__dirname}/views`);
app.set('port', (process.env.PORT || 5000)); // Port is set by Heroku (so it is dynamic) and if local, just use 5000

app.get('*', (req, res) => { // Map every request to React
    match({routes, location: req.url}, (err, redirect, props) => {
        if (err) {
            res.status(500).send(err.message); // Something went wrong
        } else if (redirect) {
            res.redirect(302, redirect.pathname + redirect.search)
        } else if (!props) {
            res.status(404).render('404'); // Not found
        } else {
            // Set initialState here if needed.
            const store = configureStore(initialState);

            const promises = [
                store.dispatch(loadAchievements()), // Load achievements from API
                store.dispatch(loadPages()), // Load pages from API
                store.dispatch(loadLogs()) // Load log items from API
            ]; // Array with promises returned by the API

            Promise.all(promises).then(() => { // When all API requests are done, render React provider component and send all data in the store through the {store} prop
                const react = (
                  <Provider store={store}>
                      <RouterContext {...props} />
                  </Provider>
                );

                const reactString = renderToString(react); // Convert react response to string

                const finalState  = store.getState(); // Get current state from store
                res.render('index', {reactString, finalState}); // Send the converted react string and the initial state to the index.pug file
            })
        }
    });
});

app.listen(app.get('port'), error => { // Start application and listen to above set port
    if (error) {
        console.log(error);  // eslint-disable-line no-console
    } else {
        console.log(`Listening at port ${app.get('port')}`);
    }
});
