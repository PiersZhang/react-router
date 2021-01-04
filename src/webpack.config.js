/*
 * @Author: Piers.Zhang
 * @Date: 2021-01-03 12:37:10
 * @LastEditTime: 2021-01-03 15:19:00
 * @LastEditors: Do not edit
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry:path.resolve(__dirname,'./index.js'),
    output:{
        filename:'[name].[hash:6].js',
        path:path.resolve(__dirname,'../dist')
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_module/,
                use:[
                    {
                        loader:'babel-loader',
                        options:{
                            presets:['@babel/preset-react', '@babel/preset-env']
                        }
                    }
                ]
            }
        ]

    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'./public/index.html'),
            filename:'index.html'
        })
    ],
}
