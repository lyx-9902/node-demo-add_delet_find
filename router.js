// 职责： 根据 请求方法和参数，执行不同的方法


const fs = require('fs')
// --------------------line-------------
//Exprss 提供了一种更好的方式
//专门用来包装路由的
var express = require('express') //引入express
// 1. 创建一个路由容器
var router = express.Router()
// 2.把路由都挂载到router 路由容器中
var students = require('./student')




router.get('/', function (req, res) {

    students.find(function (err, data) {

        if (err) {
            return res.status(500).send("server err未获取json")
        }
     
        console.log(data);
        
        //    var studens = JSON.parse(data).students 
        //注意：读取出来的是字符串。解析后才能正常键值对   或者就是在读取的加上 utf8
        res.render('index.html', {
            studens: data
        })


    })
})


// 添加操作页面
router.get('/students', function (req, res) {
    console.log('get me');

    students.find(function (err, data) {
        if (err) {
            return res.status(500).send("server err未获取json")
        }

        res.render('new.html', {

            studens: data
        })
    })
})


router.post('/students/new', function (req, res) {

    students.add(req.body, function (err) {
        console.log('添加错误' + err);
    })
    res.redirect('/')
})

// 跳转修改页面
router.get('/students/idet', function (req, res) {
//    1.在编辑页面列表处理链接问题，并传参id
//    2.获取要编辑的学生id
//    3.渲染编辑页面
//        根据id渲染该学生信息
//        模板引擎渲染
students.findByid(parseInt(req.query.id),function(err , student){  //parseint（数组） 出来就是nan
    if (err) {
        return res.status(500).send('server error')
    }

res.render('edit.html', {


    studens: student
})

})
})

// 提交修改

    router.post('/students/idet', function (req, res) {
    //1.获取表单数据  req.body
    //2. 更新
    // staudet,updatabyid
    // 3. 发送响应
    // console.log('get post action');

    students.updatByid(req.body,function(err){  //parseint（数组） 出来就是nan
        if (err) {
            return res.status(500).send('this is post students/idet  error')
        }
    })

    students.findByid(parseInt( req.body.id ), function(err ,data){
  

    })
    res.redirect('/')
    })


    router.get('/students/delete', function (req, res) {

    students.deliteByid(parseInt(req.query.id),function(err){  //parseint（数组） 出来就是nan
        if (err) {
            return res.status(500).send('this is post students/idet  error')
        }
    })

    res.redirect('/')
    
  
    
    })





// 第三步：单独导出router
module.exports = router






