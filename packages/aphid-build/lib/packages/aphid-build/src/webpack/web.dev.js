import webpack from 'webpack';
import { join } from 'path';
const baseConfig = {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [require.resolve('ts-loader')],
            },
            {
                test: /\.jsx?$/,
                use: [require.resolve('babel-loader')],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: process.env.NODE_ENV,
            },
        }),
    ],
};
export default ({ context, entry }) => {
    const config = Object.assign({}, baseConfig, {
        context,
        entry: {
            app: [
                'webpack-hot-middleware/client?name=aphid&path=/aphid_hmr&timeout=2000',
                join(context, entry),
            ],
        },
        output: {
            path: join(context, './dist'),
            publicPath: '/',
            filename: '[name].[hash:8].js',
        },
    });
    return config;
};
