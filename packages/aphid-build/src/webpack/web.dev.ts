import webpack, { Configuration } from 'webpack';
import { join } from 'path';
interface Iopt {
  context: string;
  entry: string;
}

const baseConfig: Configuration = {
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

export default ({ context, entry }: Iopt) => {
  const config: Configuration = Object.assign({}, baseConfig, {
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
