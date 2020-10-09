/* eslint-disable import/no-extraneous-dependencies */
import merge from 'webpack-merge'
import common from './webpack.common.babel'

export const prod = {
  optimization: {
    usedExports: true,
  },
}
const config = merge(common, prod)

export default config
