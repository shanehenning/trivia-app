/* eslint-disable */
const HOST_DOMAIN = process.env.HOST_DOMAIN

const config_env = {
  default: {},
  localApp: {},
}

config_env.test = config_env.default

const environment = process.env.BUILD_TYPE || 'test'
let env = config_env[environment]
env.environment = environment

export default env
