const vars = {
  stateStorage: {
    use: true,
    key: JSON.stringify('react_redux_starterskit'),
    paths: undefined // Change this to an array with keys to store if you want to specify them. Use undefined when you want to store the entire state
  }
};

const webpackDefine = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  'process.stateStorage.use': vars.stateStorage.use,
  'process.stateStorage.key': vars.stateStorage.key,
  'process.stateStorage.paths': vars.stateStorage.paths
};

module.exports = {
  vars,
  webpackDefine
};
