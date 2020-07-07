var fs = require('fs')

var dbPath = './json/db.json'
// 获取所有学生列表
exports.find = function (callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        return callback(null, JSON.parse(data).students)
    })

}

// 保存
exports.add = function (student, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }

        var students = JSON.parse(data).students

        var timestamp = (new Date()).valueOf();

        // student.id = students[students.length - 1].id + 1
        student.id = timestamp


        students.push(student)


        var fileData = JSON.stringify({
            students: students
        })

        fs.writeFile(dbPath, fileData, function (err) {

            if (err) {
                return callback(err)
            }

        })

    })
}

// 更新
exports.updatByid = function (item, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }

        var students = JSON.parse(data).students

        //  思路是： 需要就该谁，就从数据库中读出来，
        //  解析，修改，stringify, 重新写入数据


        //es6的find方法： 接受一个回调函数，把自己的每一项执行一次回调， return true的时候，停止，并把当前项返回
        var stu = students.find(function (i) { //从源数据中找到需要修改的那一项
            return item.id == parseInt(i.id)
        })

        for (var key in item) { //遍历拷贝对象
            stu[key] = item[key]
        }
        var fileData = JSON.stringify({
            students: students
        })

        fs.writeFile(dbPath, fileData, function (err) {

            if (err) {
                return callback(err)
            }

        })
    })
}

// 根据id获取学生信息对象
// 参数  id    callback

exports.findByid = function (index, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students



        var stu = students.find(function (item) {
            return parseInt(index) == item.id
        })

        callback(null, stu)
    })
}
// 根据id splice 删除


exports.deliteByid = function (index, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students

        // findIndex 方法专门用来根据条件查询元素的下标
        var deleteId = students.findIndex(function (item) {
            return item.id === parseInt(index)
        })
console.log(deleteId );

        students.splice(deleteId , 1)    //splice(2,1)  从下表2开始删除，删除数量一个。返回删除项  
        
        console.log(students );
        var fileData = JSON.stringify({
            students: students
        })

        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                return callback(err)
            }

        })



    })
}