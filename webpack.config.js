const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

const config = {
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  mode: 'development',

  entry: {
    app: resolve('src/app.tsx'),
  },

  output: {
    filename: '[name].[hash].js',
    path: resolve('build'),
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
    ],
  },

  devServer: {
    contentBase: resolve('build'),
    port: 8080,
    historyApiFallback: true,
    inline: true,
    publicPath: "/"
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: resolve('build/index.html'),
      template: resolve('index.ejs'),
      inject: false,
      minify: {
        collapseWhitespace: true,
      },
    }),
  ]
};

module.exports = config;
