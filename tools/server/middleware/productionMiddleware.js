import express from 'express';
import compression from 'compression';

export default function addProdMiddleware(config) {
  const app = express();

  app.use(compression());
  app.use(config.output.publicPath, express.static(__dirname + config.output.publicPath));

  return app;
}
