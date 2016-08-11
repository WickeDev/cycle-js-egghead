module.exports = {
    entry: './app/App.js',
    output: {
        filename: './bundle.js'
    },
    devServer: {
        inline: true,
        contentBase: './assets',
        port: 8080
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: [
                        'es2015',
                    ],
                    "plugins": [
                        "syntax-jsx",
                        ["transform-react-jsx", {"pragma": "html"}]
                    ]
                }
            }
        ]
    }
};