const path = require("path");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");


module.exports = {
    entry: "./js/phoneBookApp.js",
    devtool: "source-map",
    target: ["web", "es5"],
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.esm.js"
        }
    },

    output: {
        filename: "script.js",
        path: path.resolve(__dirname, "..", "public")
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({filename: "styles.css"}),
        new VueLoaderPlugin()
    ],

    module: {
        rules: [
            {
                test: /\.vue$/,
                use: "vue-loader"
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {presets: ["@babel/preset-env"]}
                }
            },

            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },

            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },

            {
                test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)$/,
                type: "asset/resource"
            }
        ]
    }
};