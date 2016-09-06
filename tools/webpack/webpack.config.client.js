const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const IS_DEV = process.env.NODE_ENV !== 'production';

const clientConfig = {
  entry: ['babel-polyfill', './src/app.js'],
  output: {
    path: path.resolve(__dirname, '../../dist/static/'),
    publicPath: '/static/',
    filename: 'bundle.js',
  },
  target: 'web',
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin('style.css')
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      },
      {
        test: [/\.css$/, /\.scss$/],
        loader: ExtractTextPlugin.extract('style-loader',
          'css-loader?sourceMap!sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true')
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?\S*)?$/,
        loader: 'file-loader',
      }
    ]
  }
};

if (IS_DEV) {
  clientConfig.entry.unshift('webpack-hot-middleware/client?reload=true');
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );
} else {
  clientConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  );
}

module.exports = clientConfig;
