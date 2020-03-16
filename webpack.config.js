const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const argv = require('minimist')(process.argv.slice(2))
const DEBUG = !argv.release
const dist = "acpublic"

module.exports = {
  mode: 'development',
  entry: {
    main: [path.resolve(__dirname, 'app/js/app.js'), path.resolve(__dirname, 'app/css/sass/main.scss')]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, dist)
  },
  cache: DEBUG,
  devtool: DEBUG ? '#inline-source-map' : false,

  stats: {
    colors: true,
    reasons: DEBUG
  },

  devServer: {
    port: 9000,
    host: 'localhost',
    overlay: {
      errors: true
    },
    open: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: [
          path.resolve(__dirname, './node_modules')
        ]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.s[ac]ss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader
        },
          'css-loader', 'sass-loader']
      }, {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        loader: 'file-loader?limit=8192&name=font/[name].[ext]'
      }
    ]
  },
  optimization: {
    minimizer: DEBUG
      ? []
      : [
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: {
              compress: true,
              output: {
                comments: false
              },
              ecma: 6,
              mangle: true
            },
            extractComments: false,
            sourceMap: false
          })
        ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(DEBUG ? 'development' : 'production'),
        isLocal: DEBUG
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
}