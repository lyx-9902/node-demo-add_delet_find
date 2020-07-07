// 0 安装 
// 1 引包
const express = require('express')  // 引包

var bodyParser = require('body-parser')// 先引入包

var router = require('./router')     //路由的模块化
console.log('this -->'+router);

const app = express() //调用
app.engine('html', require('express-art-template'));//模板引擎 方法指的是： 渲染html文件使用模板


var comments = [{
		name: '张四',
		message: '今天是个好日子',
		dataTime: '2020.03.03'
	},
	{
		name: '张三',
		message: '今天是个好日子',
		dataTime: '2020.03.03'
	}
]

app.get('/', function(req, res){
	res.render('index.html',{   //1. 使用render方法 
		comments:comments
	})
})

app.get('/post', function(req, res){
	res.render('post.html')
})

app.get('/pinglun', function(req, res){
	var comment = req.query
	comment.dataTime = '2020-11-02'
	comment.message = (comment.message).trim()
	comments.unshift(comment)
	
	res.redirect('/')  
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/post',function(req,res){
	// req.query 注意： query只能拿到get  通过url传递的数据。 get 不是通过路径传参
var comment = req.body
	comment.dataTime = '2020-11-02'
	comment.message = (comment.message).trim()
	comments.unshift(comment)
	res.redirect('/')  
})



app.use('/public/', express.static('./public/'))

app.use('/node_modules/', express.static('./node_modules/'))


app.use(router)   //把路由容器挂在到app服务中去 


app.listen(3000, function(){
	console.log('running...')
})

// 模块话开发理念
// app.js的定位
// app.js 入门模块 
// 职责： 创建按服务 
// 做一些服务相关的配置
// 模板引擎
// body-parser解析表单 post请求体
// 提供静态资源服务
// 挂载路由，监听端口

