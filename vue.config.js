const { defineConfig } = require('@vue/cli-service')

// element-plus 按需自动导入
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const ElementPlus = require('unplugin-element-plus/webpack')

// publicPath: './', // 寻找文件的路径
// TODO: proxy需要学习
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        // 默认webpack配置了@: './src' 所以可以直接用@
        component: '@/component'
      }
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      ElementPlus()
    ],
    devServer: {
      historyApiFallback: true
    }
  }
})
