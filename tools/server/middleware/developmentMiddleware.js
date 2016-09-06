import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

export default function addDevMiddleware(config) {
  const app = express();

  const compiler = webpack(config);
  const middleware = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true,
    stats: {
      colors: true
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  return app;
}
