"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
const path_1 = require("path");
const baseConfig = {
    mode: 'development',
    resolveLoader: {
        modules: ['node_modules', path_1.join(__dirname, 'loaders')],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [require.resolve('ts-loader'), 'aphid-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: require.resolve('babel-loader'),
                        options: {
                            presets: [
                                require.resolve('@babel/preset-env'),
                                require.resolve('@babel/preset-react'),
                            ],
                        },
                    },
                    'aphid-loader',
                ],
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new webpack_1.default.DefinePlugin({
            'process.env': {
                NODE_ENV: process.env.NODE_ENV,
            },
        }),
        new webpack_1.default.HotModuleReplacementPlugin(),
    ],
};
exports.default = ({ context, entry }) => {
    const config = Object.assign({}, baseConfig, {
        context,
        entry: {
            app: [
                require.resolve('webpack-hot-middleware/client') +
                    '?name=aphid&path=/__aphid_hmr&timeout=2000',
                path_1.join(context, entry),
            ],
        },
        output: {
            path: path_1.join(context, './dist'),
            publicPath: '/',
            filename: '[name].js',
        },
    });
    return config;
};
