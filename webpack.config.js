const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SPSaveWebpackPlugin = require('spsave-webpack-plugin');

module.exports = {
    entry: {
        baseScript: path.join(__dirname, '/app.ts')
    },
    output: {
        publicPath: 'https://harddomain.sharepoint.com/sites/Wall/Style Library/webparts',
        filename: 'app.js',
        path: __dirname
    },
    plugins: [
        new HtmlWebpackPlugin({  // 
          filename: 'index.html', // name of the output file
          chunks:['baseScript'], // name of the entry point defined above
          template: './src/index.html' // path to the html for the webpart
        }),
        new SPSaveWebpackPlugin({
            "coreOptions": {
                "checkin": true,
                "checkinType": 1,
                "siteUrl": "https://harddomain.sharepoint.com/sites/Wall/"
            },
            "credentialOptions": null,
            "fileOptions": {
                "folder": "Style Library/webparts"
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
};