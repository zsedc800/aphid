import webpack, { Configuration } from 'webpack';
import { join } from 'path';
interface Iopt {
  context: string;
  entry: string;
}

const baseConfig: Configuration = {
  mode: 'development',
  resolveLoader: {
    modules: ['node_modules', join(__dirname, 'loaders')],
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: process.env.NODE_ENV,
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

export default ({ context, entry }: Iopt) => {
  const config: Configuration = Object.assign({}, baseConfig, {
    context,
    entry: {
      app: [
        require.resolve('webpack-hot-middleware/client') +
          '?name=aphid&path=/__aphid_hmr&timeout=2000',
        join(context, entry),
      ],
    },
    output: {
      path: join(context, './dist'),
      publicPath: '/',
      filename: '[name].js',
    },
  });
  return config;
};
