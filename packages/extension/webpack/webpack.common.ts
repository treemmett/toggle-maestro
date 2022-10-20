import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import { Configuration } from 'webpack';

const browser = process.env.BROWSER;
const BUILD_DIR_NAME = 'dist';
const SRC_DIR_NAME = 'src';

const config: Configuration = {
  entry: {
    background: path.join(__dirname, `../${SRC_DIR_NAME}/background/${browser}/background.ts`),
    popup: path.join(__dirname, `../${SRC_DIR_NAME}/popup.ts`),
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'initial',
      name: 'vendor',
    },
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, `../${BUILD_DIR_NAME}`),
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        { context: 'public', from: './images', to: `../${BUILD_DIR_NAME}/images` },
        { context: 'public', from: './popup.html', to: `../${BUILD_DIR_NAME}/popup.html` },
        {
          context: 'public',
          from: `${browser}_manifest.json`,
          to: `../${BUILD_DIR_NAME}/manifest.json`,
        },
        { from: '../../node_modules/webextension-polyfill/dist/browser-polyfill.js' },
      ],
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
};

export default config;
