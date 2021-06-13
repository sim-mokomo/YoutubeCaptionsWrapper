module.exports = {
    mode: 'development',
    devtool: "eval-source-map",
    entry: {
        content: './src/content.js',
        popup: './src/popup-main.js'
    },
    output: {
        filename: '[name]-bundle.js',
        path: `${__dirname}/src/bundles`
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                exclude: /node_modules/,
            },
        ],
    },
};
