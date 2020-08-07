const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const dotenv = require('dotenv')

const alias = require('./alias.config')

const PATHS = { env: (process.env.NODE_ENV && `./.env.${process.env.NODE_ENV}`) || './.env' }

module.exports = () => {
  const env = dotenv.config({ path: PATHS.env }).parsed || {}

  const envKeys = Object.keys(env).reduce((acc, next) => {
    acc[`process.env.${next}`] = JSON.stringify(env[next])
    return acc
  }, {})

  return {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [ 'babel-loader' ]
        },
        {
          test: /\.css$/i,
          exclude: /node_modules/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            }
          ]
        }
      ]
    },
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
      filename: 'bundle.js'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: 'dist/index.html'
      }),
      new webpack.DefinePlugin(envKeys)
    ],
    resolve: {
      extensions: [ '*', '.js', '.jsx' ],
      alias: {
        ...alias
      }
    },
    devServer: {
      contentBase: './dist',
      hot: true,
      historyApiFallback: true
    }
  }
}
