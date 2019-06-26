import webpack from 'webpack';
interface Iopt {
    context: string;
    entry: string;
}
declare const _default: ({ context, entry }: Iopt) => webpack.Configuration;
export default _default;
