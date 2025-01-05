import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';

import { BuildOptions } from './types/config';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const { isDev } = options;

    const svgLoader = {
        test: /\.svg$/,
        oneOf: [
            {
                issuer: /\.[jt]sx?$/, // Обработка только в JS/TS файлах
                use: ['@svgr/webpack'],
            },
            {
                type: 'asset/resource', // Генерация файлов для остальных случаев
            },
        ],
    };

    const styleLoader = {
        test: /\.(s[ac]ss|css)$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                        localIdentName: isDev
                            ? '[path][name]__[local]'
                            : '[hash:base64:8]'
                    },
                }
            },
            'sass-loader',
        ],
    };

    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };

    return [
        typescriptLoader,
        svgLoader,
        styleLoader
    ];
}
