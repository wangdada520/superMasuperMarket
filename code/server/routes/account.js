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
});
// 修改 数据回填
router.get('/editaccount',(req,res)=>{
	// 接收数据
	let {id}=req.query;
	// 准备sql
	const sqlStr = `select * from account where id =${id}`
	//执行sql
	connection.query(sqlStr,(err,data) => {
		if (err) throw err;
		console.log(data);
		// res.send(111);
	      res.send(data )//响应数据给前端
	})
	
})

// 修改  确定按钮
router.post('/saveEditaccount',(req,res)=>{
	// 接收数据
	let {account,user_group,EditId} = req.body;
	// 准备sql
	const sqlStr = `update account set account='${account}', user_group='${user_group}' where id=${EditId}`;
		//执行sql
		connection.query(sqlStr,(err,data) => {
			if (err) throw err;
			//判断受影响行数
			if(data.affectedRows > 0){
				res.send({code:0,reason:"修改账户成功"});
			}else{
				res.send({code:1,reason:"修改账户失败"});
			}
		})
})
//批量删除
router.get('/batchdel',(req,res)=>{
	// 接收id
	let {idArr}=req.query;
	console.log(idArr);
	//构造sql
	const sqlStr=`delete from account where id in (${idArr})`
	//执行sql
	connection.query(sqlStr,(err,data) => {
		if (err) throw err;
		//判断受影响行数
		if(data.affectedRows > 0){
			res.send({code:0,reason:"批量删除成功"});
		}else{
			res.send({code:1,reason:"批量删除失败"});
		}
	})
})
// 分页
router.get('/accountpage',(req,res)=>{
	// 接收参数
	let {currentPage,pageSize}=req.query;
	// 构造sql
	let sqlStr=`select * from account order by create date desc`
	// 执行sql
	connection.query(sqlStr,(err,data)=>{
		if(err) throw err;
		// 计算总条数
		let total=data.length;
		// 计算跳过多少条
		let n =(currentPage-1)*pageSize;
		// 拼接分页
		sqlStr+=` limit ${n},${pageSize}`;
		// 执行sql
		connection.query(sqlStr,(err,data)=>{
			if(err) throw err;
			res.send({total,data})
			
		})
	})

})



// wdd添加账户路由
router.post('/accountadd',(req,res)=>{
	// 接收数据
	let {account,password,user_group} = req.body;
	// 准备sql
	const sqlStr = `insert into account(account,password,user_group) values('${account}','${password}','${user_group}')`;
	console.log(sqlStr);
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

