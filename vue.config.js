const path = require('path');
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/bus-appointment/dist' : './',
  outputDir: "dist", // build输出目录
  assetsDir: "assets", // 静态资源目录（js, css, img）
  lintOnSave: false, // 是否开启eslint
  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
  },
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    },

    open: true, // 是否自动弹出浏览器页面
    host: "0.0.0.0",
    port: "8080",
    https: false, // 是否使用https协议
    hotOnly: false, // 是否开启热更新
    proxy: 'http://localhost:8086'
  }
};

// alias
function resolve (dir) {
  return path.join(__dirname, dir)
}
// 全局引入
function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/_Variables.scss'),
        path.resolve(__dirname, './src/global.scss'),
      ],
    })}
