const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const glob = require('glob');
const purify = require ('purifycss-webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const ABSOLUTE_PATH = path.join(__dirname, 'dist');

let PROD;

if(process.env.NODE_ENV === 'development'){
    PROD = false;
} else {
    PROD = true;
}

const VENDOR_LIBS=[
    "react",
    "react-dom",
    "react-redux",
    "react-router-dom",
    "redux"
];

module.exports=(env)=>{
    return {
        entry: {
            bundle:"./src/app.js",
            vendor: VENDOR_LIBS
        },
        output: {
            path: ABSOLUTE_PATH,
            filename: PROD? '[name].[chunkhash].js' : '[name].js'
        },

        module:{
            rules:[
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        use: [{
                            loader:'css-loader',
                            options:{
                                sourceMap:true
                            }
                        }],
                        fallback: 'style-loader',
                        publicPath: './dist',
                    })
                },
                {
                    loader: 'babel-loader',
                    test: /\.js$/,
                    exclude : /node_modules/
                }
            ]
        },

        devtool: 'cheap-module-eval-source-map',

        devServer:{
            contentBase: ABSOLUTE_PATH
        },
        
        plugins: [
            new UglifyJsPlugin({
                test: /\.js$/,
                uglifyOptions:{
                    mangle:PROD
                }
            }),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'src', 'template.html'),
                filename: 'home.html',
                title: 'TEST APP',
                hash:PROD,
                minify:{
                    collapseWhitespace:PROD,
                    minifyJS:PROD,
                }
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: ['vendor', 'manifest']
            }),
            new ExtractTextPlugin({
                filename: PROD? 'styles.[chunkhash]css': 'styles.css',
                allChunks:true
            }),
            new purify({
                // Give paths to parse for rules. These should be absolute!
                paths:glob.sync(path.join(__dirname, 'src', '*.js')),
                purifyOptions:{
                    minify:PROD,
                    log:true
                }
            })
        ]
    }
}
