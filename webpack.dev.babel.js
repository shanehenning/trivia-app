/* eslint-disable import/no-extraneous-dependencies */

import merge from 'webpack-merge'
import common from './webpack.common.babel'

export const dev = {
  devServer: {
    clientLogLevel: 'silent',
    disableHostCheck: true,
    historyApiFallback: true,
    port: 4000,
  },
  devtool: 'source-map',
}

export default merge(common, dev)
