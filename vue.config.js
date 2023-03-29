const webpack = require('webpack')
const path = require('path')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const { resolve } = require('core-js/fn/promise')

module.exports = {
    publicPath: '/', // 基本路径 publicPath: './', 
    outputDir: 'dist', // 输出文件目录
    lintOnSave: false, // eslint-loader 是否在保存的时候检查
    // webpack配置
    chainWebpack: (config) => {

    },
    configureWebpack: (config) => {
        require('vux-loader').merge(config, {
            options: {},
            plugins: ['vux-ui']
        })
    },
    runtimeCompiler: true,
    productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
    // css相关配置
    css: {
        extract: true, // 是否使用css分离插件 ExtractTextPlugin
        sourceMap: false, // 开启 CSS source maps?
        loaderOptions: {
            css: {}, // 这里的选项会传递给 css-loader
            postcss: {} // 这里的选项会传递给 postcss-loader
        }, // css预设器配置项
        modules: false // 启用 CSS modules for all css / pre-processor files.
    },
    parallel: require('os').cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
    pwa: {}, // PWA 插件相关配置 see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    // webpack-dev-server 相关配置
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0', // 允许外部ip访问
        port: 8022, // 端口
        //https: true, // 启用https
        overlay: {
            // warnings: true,
            errors: true
        }, // 错误、警告在页面弹出
        proxy: {
            '/api':{
                 target: 'http://154.94.8.124:8080/api',//生产 1203 ip
                //  target:'https://k188.bet/api/',//生产2022 0103 域名 yn
                // target: 'http://156.238.14.72:18305/api',//测试2021.1.4 yn
                // target:'http://54.255.11.229:18313/api',//英文站 2022 4.12 租赁的英文站 测试
                changeOrigin: true, // 允许websockets跨域
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
           
            '/nodeapi':{
                // target: 'http://154.92.15.136:8088/nodeapi',//生产 1203 ip
              target: ' http://192.168.1.29:8088/nodeapi',// 测试
               changeOrigin: true, // 允许websockets跨域
               ws: true,
               pathRewrite: {
                   '^/nodeapi': ''
               }
           },
         
            '/getapi':{
                // target: 'https://ilgzbadmin.com/getapi',//线上的
                target: 'https://ilgzbadmin.com/getNewapi',//线上的
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/getapi': ''
                }
            },
            '/getvnLine':{
                target: ' https://www.lgiosadmin.com/getvnLine',//线上的
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/getvnLine': ''
                }
            },
            // '/wss_notice':{
            //     target: 'ws://52.220.233.230/wss_notice',
            //     changeOrigin: true,
            //     ws: true,
            //     secure: false,
            //     pathRewrite: {
            //         '^/wss_notice': ''
            //     }
            // },
            // '/wss':{
            //     target: 'ws://54.255.11.229:18305/wss',
            //     changeOrigin: true,
            //     ws: true,
            //     secure: false,
            //     pathRewrite: {
            //         '^/wss': ''
            //     }
            // },

        }, // 代理转发配置，用于调试环境 
        //history模式配置
        historyApiFallback:{
            index:'/index.html'
        },
        https: false
       
    },
    // 第三方插件配置
    pluginOptions: {},
    // configureWebpack:{
    //     optimization:{
    //         minimizer:[
    //             new UglifyPlugin({
    //                 uglifyOptions: {
    //                     output: {
    //                         comments: false
    //                     },
    //                     compress: {
    //                         warnings: false,
    //                         drop_debugger: true,
    //                         drop_console: true
    //                     }
    //                 }
    //             })
    //         ]
    //     }
    // },
    
   
    
}