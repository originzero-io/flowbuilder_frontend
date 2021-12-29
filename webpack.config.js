module: {
    rules: [
        {
            test: /\.js$/,
            enforce: 'pre',
            use: ['source-map-loader'],
        },
    ]
}