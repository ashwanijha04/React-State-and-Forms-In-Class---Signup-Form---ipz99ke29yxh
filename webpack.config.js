const path = require("path");
const HtmlWebpackPlugin= require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',

    node: {
        child_process: "empty",
        fs: "empty", // if unable to resolve "fs"
    },

    output: {
        path: path.join(__dirname,"/dist"),
        filename: "index_bundle.js",
    },
    module:{
        rules: [
            {
                test: /\.js$|\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                ]
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ],
    resolve: {
        modules: [
            path.resolve('./client'),
            'node_modules'
          ],
        extensions: ['.js', '.jsx'],
    }
};
