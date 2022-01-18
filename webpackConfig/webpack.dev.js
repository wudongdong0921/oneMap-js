'use strict'
const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const portfinder = require('portfinder')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const readPackName = require('./readPackName');


function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

const interfaces = require('os').networkInterfaces();
let IPAdress = 'localhost';
for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
        var alias = iface[i];
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
            if (alias.address.split('.')[2] == 0){
                IPAdress = alias.address;
            }
        }
    }
};

var _entry = {};
var _$entry = readPackName();
if (!_$entry.error) {
    _entry = {
        app: './src/layout/main.js',
        ..._$entry.obj
    };
};

const devWebpackConfig = {
    context: path.resolve(__dirname, '../'),
    entry: {
        ..._entry
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',

            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',

            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
            }, {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        // attrs: false
                    }
                }
            }
        ]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: {
            rewrites: [
                { from: /.*/, to: path.posix.join('../public/', 'index.html') },
            ],
        },
        hot: true,
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        host: IPAdress,
        port: 8089,
        open: false,
        publicPath: '/',
        proxy: {},
        quiet: true, // necessary for FriendlyErrorsPlugin
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': '"development"'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html',
            inject: true
        }),
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../public/static'),
                to: './static',
                ignore: ['.*']
            }, {
                from: path.resolve(__dirname, '../public/config.js'),
                to: './',
                ignore: ['.*']
            }
        ])
    ]
};

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || devWebpackConfig.devServer.port
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port
            // add port to devServer config
            devWebpackConfig.devServer.port = port

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`    App running at :`, `       - http://${devWebpackConfig.devServer.host}:${port}`],
                },
            }))
            resolve(devWebpackConfig)
        }
    })
})
