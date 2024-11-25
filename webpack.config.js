const path = require('path');

module.exports = {
  entry: './src/login.jsx', // Your entry point
  output: {
    path: path.resolve(__dirname, 'public'), // Output folder
    filename: 'login.bundle.js', // Output file
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Compile both .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Babel presets for modern JS and React
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Automatically resolve .js and .jsx
  },
  mode: 'development', // Set mode to development
};
