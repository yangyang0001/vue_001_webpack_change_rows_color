module.exports = {
    // webpack 使用高级 js 语法时, 会使用到 babel-loader 插件, 当前插件就会使用到 plugins 中的插件!
    plugins: [
        ["@babel/plugin-proposal-decorators", { "legacy": true }]
    ]
}