const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode:"development",
    entry:"./src/index.tsx",
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"index.js"
    },
    devServer:{
        port:8000,
        hot:true
    },
    devtool:"cheap-module-source-map",
    resolve: {
        extensions: ['.js',".tsx",".ts"],
    },
    module:{
        rules:[
            {
                test:/\.tsx?/,
                use:["babel-loader"]
            },
            {
                test:/\.less/,
                use:[MiniCssExtractPlugin.loader,"css-loader","less-loader"],
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            template:"./index.html"
        })
    ]
}