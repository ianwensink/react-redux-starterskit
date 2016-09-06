const server = require('./webpack.config.server.js');
const client = require('./webpack.config.client.js');

/**
 * Because of server side rendering there is a webpack config to create a server.bundle.js to be run by NodeJS and one to create the 'normal' bundle.js that is used on the page itself.
 */
module.exports = [server, client];
