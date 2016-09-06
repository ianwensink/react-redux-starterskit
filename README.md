# React-redux starterskit

React-redux starterskit is a starterskit for an isomorphic web-app in ReactJS with the power of Redux behind it.

## Features
- To make it easier to build a simple application, Middleware is added to store your entire state in the browser's localStorage. For production use, you will need a database, but if not, this means your data is not lost when refreshing.
- The project is using the ES6/ES2015 syntax for JavaScript and transpiling the code back to ES5 using BabelJS with Webpack. The project is managed with NPM.
- Server side rendering is built in into the application to serve crawlers such as Google and offer basic support to people browsing without JavaScript enabled. Please note that data you add or edit in the application, is not rendered on the server because of it being in your browser's storage. When using an API/database, data fetching has to be server side, so the data is available on initial load.
- Styling is done through SASS/SCSS.
- Heroku support is already built in to make it as easy as possible to launch your app into the world wide web.

## Usage
1. Clone the repo.
2. `cd` into the repo and `npm install`.
3. For local use, run `npm start` on the repo folder and visit `http://localhost:5000` to see your app.
4. For production use, you can push the repo to a service like Heroku. Heroku support is already built in in this repo.
