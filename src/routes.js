import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/Home';

export default (
    <Route path="/" component={App} /* Root component */ >
        <IndexRoute component={Home} /* Default home component */ />
    </Route>
);
