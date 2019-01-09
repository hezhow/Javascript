var path = require('path');
var {VueLoaderPlugin} = require('vue');

module.exports={
  mode:'development',
  entry:{path.join(__dirname,'./js/src/index.js')},
  output:{path:path.join(__dirname,'./js/dist'),
          filename:'main.js',
          publicPath:'/js/dist'
          },
  module:{
    rules:[
        {test:/\.vue$/,use:['vue-loader']},    //VUE文件编译
        {test:/\.css$/,use:[{'style-loader'},{'css-loader']}},  //CSS编译
        {test:/\.(jpg||png||gif)$/i,use:[{'url-loader'}]}       //图片编译
    ]
  },
  plugin:[
  new VueLoaderPlugin();
  
  ],
  extenals:{
  //外部扩展使用CDN导入，不进行编译
  'vue':'vue',
  'VueRouter':'VueRouter',
  'jquery':'jquery'
  }

}
