// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/music-vue-element/'
    : '/',
  configureWebpack: {
    devtool: 'source-map'
  }
}
