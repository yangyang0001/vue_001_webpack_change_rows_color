const path = require('path');

// html-webpack-plugin 的使用
const HtmlPlugin = require('html-webpack-plugin');
const htmlPlugin = new HtmlPlugin({
    template: 'src/index.html',     // 指定原文件的存放路径
    filename: './index.html'        // 指定生成文件的存放路径
})

// clean-webpack-plugin 的使用 默认将 dist 文件夹下的文件自动删除!
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const cleanWebpackPlugin = new CleanWebpackPlugin();

// 使用 Node.js 中语法 导出一个 webpack 的配置对象
module.exports = {

    // 取消掉 asset size limit: The following asset(s) exceed the recommended size limit (244 KiB) 的警告
    performance: {
        hints: false
    },

    // 两种可选模式: development 和 production; 开发阶段使用 development, 上线时使用 production, 这个会对 dist 下的 main.js 进行压缩!
    mode: 'development',

    // 在 development 模式下使用 SourceMap 能够将 生成的js文件中的错误行号 翻译成 源码中错误的行号, 使用 eval-source-map
    // 在 production  模式下使用 devtool 使用 nosources-source-map 既可以定位错误行数, 又不暴漏源码!
    // devtool: 'eval-source-map',
    devtool: 'nosources-source-map',

    // 自定义打包入口文件
    entry: path.join(__dirname, './src/index.js'),

    // 自定义打包输入文件
    output: {
        path: path.join(__dirname, './dist'),    // 输出文件目录
        filename: 'js/main.js'                   // 文件名称
    },

    // 下面的 devServer 是解决 http://localhost:8080 Can not GET 的问题
    devServer: {
        // contentBase: __dirname, -- 注意，这种写法已弃用
        open: true,             // 打包成功后, 自动打开浏览器
        host: '127.0.0.1',      // 实时打包所使用的主机地址
        port: 8081,             // 实时打包所使用的端口号
        static: {
            directory: path.join(__dirname, "/"),
        }
    },

    // 使用 webpack 时会加载和使用的插件
    plugins: [htmlPlugin, cleanWebpackPlugin],

    // 使用 webpack loader 加载器
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.jpg|png|gif$/, use: ['url-loader?limit=10000&outputPath=images'] },    // 当图片的大小 <= limit(单位字节) 时才会转成 base64 的形式
            { test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/ }
        ]
    },

    // 配置 src 目录为 @ 目录, 这种 从 src 往下找的过程就非常 舒服了
    resolve: {
        alias: {
            '@': path.join(__dirname, './src')
        }
    }

}