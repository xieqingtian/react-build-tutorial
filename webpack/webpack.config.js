const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const AutoDllPlugin = require('autodll-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: [
        'react-hot-loader/patch', // 开启 React 代码的模块热替换(HMR)
        'webpack-hot-middleware/client', // 连接服务器，以便重新构建时更新bundle包
        path.join(__dirname, '../src/index.js'), // 入口文件
    ],
    output: {
        filename: 'bundle.js', // 打包后的文件名
        chunkFilename: '[name].[chunkhash:5].js', // 非入口文件名
        path: path.join(__dirname, '/'), // 打包后的文件存储位置
        publicPath: '/',
    },
    target: 'web',
    resolve: {
        modules: [path.join(__dirname, '../node_modules')], // 优化webpack文件搜索范围
        extensions: ['.web.js', '.jsx', '.js', '.tsx', '.ts', '.json'], // 声明导入模块时能省略后缀的文件类型
    },

    devtool: 'cheap-module-eval-source-map', // 开启生成source-map文件功能便于代码调试

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader?cacheDirectory'], // 开启编译缓存
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader?modules&localIdentName=[local]-[hash:base64:5]', // 编译css文件的loader并开启css-modules功能
                    {
                        loader: 'postcss-loader',
                        options: { plugins: [autoprefixer] },
                    }, // 处理css厂商前缀
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(jpe?g|png|gif|mp4|webm|otf|webp)$/,
                use: ['url-loader?limit=10240'],
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000',
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'file-loader',
            },
        ],
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(), // 报错时不退出webpack进程
        new webpack.HotModuleReplacementPlugin(), // 代码热替换
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'), // 用于区分开发和生产环境
        }),
        new AutoDllPlugin({
            inject: false,
            debug: false,
            filename: '[name].bundle.js',
            context: path.join(__dirname, '..'),
            entry: {
                vender: ['react', 'react-dom'],
            },
        }),
    ],
}
