const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: 'none',
    entry: {
       'guide': './src/Guide.js',
       'guide.min': './src/Guide.js',
    },
    module: {
        rules: [
            {
                test: /\.js/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: "[name]__[local]--[hash:base64:5]",
                        }
                    },
                    'less-loader'
                ]
            }
        ]
    },
    output: {
        filename: '[name].js',
        libraryExport: 'default',
        library: 'guide',
        libraryTarget: 'umd'
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                include: /\.min\.js$/
            })
        ]
    }
}