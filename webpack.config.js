const path = require('path');

module.exports = {
  context: path.join(__dirname, '/client'),
  entry: './index.jsx',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
    ],
  },
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js',
  },
};
