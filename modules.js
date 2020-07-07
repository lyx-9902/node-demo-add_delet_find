	var fs = require('fs')
	// 咱们使用的所有文件操作API都是一部的.  就像Ajax请求一样  
	//文件操作中的路径可以省略  ./
	
//    如果单独的去掉 点  '/data/a.txt'   ，就会默认是从当前项目的根目录中找。
// 例如: 项目在c:盘下,   open 'C:\data\a.txt'   \就代表磁盘的跟目录
	fs.readFile('./data/a.txt', function(err, data){
		if(err){
			console.log(err);
			return console.log('读取失败');
		}
		console.log(data.toString());
	})
	
// 总结: 文件操作的路径:
//  ./data/a.txt 相当于当前目录
//  data/a.txt   相当于当前目录
//   /data/a.txt   绝对路径,当前文件模块所在磁盘的根目录
//   c:/xx/xx..  绝对路径
	 
	
	// 在模块加载中,性对路径中 ./不能省略
	
	// 去掉 点. 报错   Error: Cannot find module '/data/a.js'

	require('./data/a.js')     //这个较快
	
	// 总结: 在模块加载中的路径:
	// 1.  \就代表磁盘的跟目录
	                     // 相对路径 
	//  2.  require('./data/a.js')    
	