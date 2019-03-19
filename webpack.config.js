const path = require('path');

module.exports = () => {
  return {
    target: 'web',
    mode: 'development',
    entry: {
      app: path.join(__dirname, 'example', 'app.js')
    },
    devServer: {
      host: '0.0.0.0',
      port: 8001,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Max-Age': '3000',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET'
      }
    },
    resolve: {
      extensions: ['.js']
    },
    output: {
      path: path.join(__dirname, 'example'),
      publicPath: '/',
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              query: {
                presets: [
                  [
                    'es2015', {}
                  ],
                  [
                    'react'
                  ]
                ]
              }
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        }
      ]
    }
  };
};
