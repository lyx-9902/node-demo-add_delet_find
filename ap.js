const express = require('express') // 引包

var router = require('./router')

var bodyParser = require('body-parser')

const app = express() //调用



// var bodyParser = require('body-parser')// 先引入包
// var router = require('./router')     //路由的模块化
// console.log('this -->'+router);

app.use('/node_modules', express.static('./node_modules')) //开放静态文件


app.engine('html', require('express-art-template')); //模板引擎 方法指的是： 渲染html文件使用模板

                  
// --------------------post配置-------------
                   app.use(bodyParser.urlencoded({ extended: false }))
                   app.use(bodyParser.json())



// 把路由容器挂载到app服务中
app.use(router)

app.listen(3000, function () {
    console.log('running...')
})




 