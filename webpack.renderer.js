const path = require('path')
const merge = require('webpack-merge')

module.exports = function(config) {
  config = merge.smart(config, {
    resolve: {
      alias: {
        // for accessing static folder from inside stylesheets
        static: path.resolve(__dirname, 'static')
      }
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: /node_modules/,
          use: ['react-hot-loader/webpack']
        }
      ]
    }
  })
  return config
}
