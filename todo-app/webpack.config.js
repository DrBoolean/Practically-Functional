var webpack = require('webpack');
var glob = require('glob');

var config = {
  entry: {
    build: './src/main.js'
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules'].concat(glob.sync('./src/**/*'))
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js', Infinity),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jquery': 'jquery'
    }),

    new webpack.ProvidePlugin({
      d3: 'd3',
      'window.d3': 'd3'
    }),

    new webpack.NoErrorsPlugin()
  ],


  output: {
    path: __dirname,
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      { test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'react-hot'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel?presets[]=react,presets[]=es2015'
      }
    ],

    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ]
  },

  eslint: {
    configFile: './.eslintrc'
  }
};

module.exports = config;

