const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const isProduction = mode === 'production';

module.exports = {
  mode,
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            '@babel/preset-react',
            [
              '@babel/preset-env', {
                targets: { browsers: ['last 2 versions'] },
              },
            ],
          ],
        },
      },
      {
        test: /\.css$/,
        use: [
          'extracted-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader',
        options: {
          name: '[name].jpg',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isProduction ? 'style.[contenthash].[name].css' : '[name].css',
    }),
  ],
};
