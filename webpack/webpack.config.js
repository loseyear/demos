module.exports = {
    entry: [
//        'webpack-dev-server/client?http://127.0.0.1:3000',
//        'webpack/hot/only-dev-server',
        './src/entry.js'
    ],
    output: {
        path: __dirname,
        filename: './out/app.js',
        publicPath: './out/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {test: /\.jsx$/, loader: 'react-hot!jsx-loader?harmony'},
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.scss$/, loader: 'style!css!sass'},
            {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
            {test: /\.(jpg|png)$/, loader: 'url?limit=8192'}
        ]
    }
}
