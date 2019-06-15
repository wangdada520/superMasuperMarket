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

/* 添加账户路由 */
router.post('/ljAccountadd',(req, res)=> {
	//接受数据
	let {account,password,region} = req.body;
	
	//准备sql
	const sqlStr = `insert into account(account,password,user_group) values('${account}','${password}','${region}')`;
	//console.log(sqlStr)
	//执行sql
	connection.query(sqlStr,(err,data) => {
		if (err) throw err;
		//判断受影响行数
		if(data.affectedRows > 0){
			res.send({code:0,reason:"添加账户成功"});
		}else{
			res.send({code:1,reason:"添加账户失败"});
		}
	})
});

//请求账户列表路由
router.get('/accountlist',(req,res) => {
	//准备sql
	const sqlStr = `select * from account order by create_date desc`;
	//console.log(sqlStr)
	//执行sql
	connection.query(sqlStr,(err,data) => {
		if (err) throw err;
		res.send(data);
	})
})

//删除账户列表路由
router.get('/delaccount',(req,res) => {
	//接受数据
	let { id } = req.query;
	//准备sql
	const sqlStr = `delete from account where id=${id}`;
	console.log(sqlStr)
	//执行sql
	connection.query(sqlStr,(err,data) => {
		if (err) throw err;
		//判断受影响行数
		if(data.affectedRows > 0){
			res.send({code:0,reason:"删除账户成功"});
		}else{
			res.send({code:1,reason:"删除账户失败"});
		}
	})
})



// wdd添加账户路由
router.post('/accountadd',(req,res)=>{
	// 接收数据
	let {account,password,region} = req.body;
	// 准备sql
	const sqlStr = `insert into account(account,password,user_group) values('${account}','${password}','${userGroup}')`;
	// 执行sql
	connection.query(sqlStr,(err,data) => {
		if (err) throw err;
		//判断受影响行数
		if(data.affectedRows > 0){
			// 如果受影响行数大于0  代表成功
			res.send({code:0,reason:"添加账户成功"});//0代表成功
		}else{
			// 如果受影响行等于0  代表失败
			res.send({code:1,reason:"添加账户失败"});//1代表失败
		}
	})
})

// 请求所有账号列表数据
 
module.exports = router;

