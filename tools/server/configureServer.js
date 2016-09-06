import express from 'express';
import config from '../webpack/webpack.config.client.js';
import developmentMiddleware from './middleware/developmentMiddleware.js';
import productionMiddleware from './middleware/productionMiddleware.js';

const IS_DEV = process.env.NODE_ENV !== 'production';

/**
 * Express server based on environment
 *
 * @returns Express app
 */
export default function configureServer() {
  const app = express();

  if (IS_DEV) {
    app.use(developmentMiddleware(config));
  } else {
    app.use(productionMiddleware(config));
  }

  return app;
}
