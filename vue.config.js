/**
 * 自定义 webpack 配置
 */
const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
const path = require('path')
const optimize_css = require('@intervolga/optimize-cssnano-plugin')
function resolve(dir){
  return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}

module.exports = {
  // 部署在非根目录配置
  publicPath:'/ss_internetHospital/', //测试部署打包
  // publicPath:'./', // 本地打包
  // publicPath:'/', // 开发
  // 关闭 Eslint 检查
  lintOnSave: false,
  chainWebpack:(config)=>{
    // 路径别名配置
    config.resolve.alias
    .set('@',resolve('./src'))
    .set('components',resolve('./src/components'))
    .set('views',resolve('./src/views'))
    .set('assets',resolve('./src/assets'))
    // 打包分析
    if (process.env.use_build) { 
      config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
    // 打包进度条
    config.plugin('progress-bar-webpack-plugin').use(require('progress-bar-webpack-plugin'))
  },
  css: {
    loaderOptions: {
      // 修改 vant 主题
    //   less: {
    //     lessOptions: {
    //       modifyVars: {
    //         // 直接覆盖 less 变量
    //         'hack': `true; @import "${resolve('./src/utils/public.less')}";`
    //       },
    //     },
    //   },
      // px to rem
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            // 页面的一份也就是 1rem 的占比 之所以设置为 37.5 是为了兼容 vant 
            // amfe-flexible 是把页面按照 10 份分的 所以如果设计稿为 750 就需要把测量到的数值 / 2
            // 尽量不要在行内写 px 之类的绝对单位，以为在行内编译不到，转不了 rem
            rootValue: 37.5,
            propList: ['*'],
          })
        ]
      }
    }
  }
}