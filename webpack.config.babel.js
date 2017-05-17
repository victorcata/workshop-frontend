const path = require("path"),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

var extractStyles = new ExtractTextPlugin("[name].css"),
    extractHtml = new ExtractTextPlugin("[name].html")

module.exports = {
    context: path.resolve(__dirname, "./app"),
    devServer: {
        contentBase: "dist"
    },
    devtool: "source-map",
    entry: {
        index: ["./views/index.pug"],
        styles: ["./styles/app.scss"]
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].js"
    },
    module: {
        rules: [{
                test: /\.pug$/,
                loader: extractHtml.extract({
                    use: ["html-loader", "pug-html-loader"]
                })
            },
            {
                test: /\.scss$/,
                loader: extractStyles.extract({
                    use: ["css-loader", "sass-loader"]
                })
            }
        ]
    },
    plugins: [
        extractHtml,
        extractStyles
    ]
}