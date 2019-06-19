var express = require('express');
var router = express.Router();
// 引入数据库连接模块
const connection = require('./js/conn')

//统一设置响应头
router.all('*',(req,res,next) => {
	//设置跨域
	res.setHeader('Access-Control-Allow-Origin','*');
	next();
})

// 引入
const jwt= require('jsonwebtoken');
// 定义秘钥
const secret = 'itsource';

router.post('/login',(req,res) => {
	let {account,password} = req.body;
	// console.log(account);
	// console.log(password);
	// 准备sql
	const sqlStr = `select * from account where account='${account}' and password='${password}'`;
	// console.log(sqlStr);
	// 执行sql
	connection.query(sqlStr,(err,data) => {
		if(err) throw err;
		if(data.length === 0){
			res.send({code:1,reason:'请检查账户和密码是否正确'});
		}else{
			// 生成token
			const token = jwt.sign(Object.assign({},  data[0]), secret, {
				expiresIn:  60 * 60 * 2 // 过期时间
			});
			res.send({code:0,reason:'登录成功',token});
		}
	})
})

module.exports = router;