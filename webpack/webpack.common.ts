const path = require('path');

const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entry: Record<string, string | Array<string>> = {
    main: ['react-hot-loader/patch', './src/index.tsx'],
};

module.exports = {
    entry,
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../build'),
    },
    devServer: {
        hot: true,
        port: 3000,
        host: 'localhost',
        historyApiFallback: true,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,

                            modules: {
                                localIdentName: '[local]__[hash:base64:5]',
                                exportLocalsConvention: 'dashesOnly',
                            },
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: ['postcss-normalize', 'tailwindcss', 'autoprefixer'],
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                fiber: false,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 },
                    },
                    { loader: 'postcss-loader' },
                ],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    mode: 'development',
    plugins: [
        new Dotenv(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', './src/index.html'),
        }),
        new CopyWebpackPlugin({
            patterns: ['public'],
        }),
    ],
};
