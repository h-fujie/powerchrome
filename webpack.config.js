const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = [
    {
        entry: "./src/power.js",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "power.js",
            publicPath: "dist/",
            clean: true
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                importLoaders: 1
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
           new CopyPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, "src", "manifest.json"),
                        to: path.resolve(__dirname, "dist")
                    }
                ]
            })
        ]
    }
];
