const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const glob = require('glob');
const purify = require ('purifycss-webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const ABSOLUTE_PATH = path.join(__dirname, 'dist');



let PROD;

if(process.env.NODE_ENV === 'prod'){
    PROD = true;

} else {
    PROD = false;
}


const CSSExtract = new ExtractTextPlugin({
    filename: PROD ? 'styles.[chunkhash].css': 'styles.css',
    allChunks:true
});


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
                    rules: [{
                        test:/\.s?css$/,
                        use: CSSExtract.extract({
                            use: [
                              {
                                loader: 'css-loader',
                                options: {
                                  sourceMap: true
                                }
                              },
                              {
                                loader: 'sass-loader',
                                options: {
                                  sourceMap: true
                                }
                              }
                            ]
                          })
                    }]
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
            CSSExtract,
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
            new UglifyJsPlugin({
                test: /\.js$/,
                uglifyOptions:{
                    mangle:PROD
                }
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: ['vendor', 'manifest']
            }),
            new purify({
                // Give paths to parse for rules. These should be absolute!
                paths:glob.sync(path.join(__dirname, 'src', '*.js')),
                purifyOptions:{
                    minify:PROD,
                }
            })
        ]
    }
}