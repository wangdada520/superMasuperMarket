var express = require('express');
var router = express.Router();
// 引入数据库连接模块
const connection = require('./js/conn')

/*--- 验证token --- 开始 */ 
const expressJwt = require('express-jwt');
const secret = 'itsource';
router.use(expressJwt ({
    secret 
}).unless({
    path: ['/login/checklogin']  //除了这些地址，其他的URL都需要验证
}));
router.use(function (err, req, res, next) {
    //当token验证失败时会抛出如下错误
    if (err.name === 'UnauthorizedError') {   
        //这个需要根据自己的业务逻辑来处理（ 具体的err值 请看下面）
        res.status(401).send('invalid token...');
    }
})
/*--- 验证token -- 结束 ---*/ 

//统一设置响应头
router.all('*',(req,res,next) => {
	//设置跨域
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader("Access-Control-Allow-Headers", "authorization"); // 允许通过头部信息authorization 携带token
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
	let sqlStr=`select * from account order by create_date desc`
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
// 获取旧密码
router.post('/passwordmodify',(req,res)=>{
	// 接收新密码
	let {oldPassword}=req.body;
	console.log(oldPassword)
	console.log(req.user)
	// 获取当前登录用户密码
	let {password}=req.user;
	// 判断
	if(password===oldPassword){
		res.send({code: 0, reason: '原密码输入正确'})
    } else {
		res.send({code: 1, reason: '原密码输入错误'})
	}
})
// 密码修改
router.post('/savepassword',(req,res)=>{
	// 接收新密码
	let {newPassword}=req.body;
	// 获取当前用户的id
	let {id}=req.user;
	// 构造sql
	const sqlStr=`update account set password ='${newPassword}' where id=${id}`
	// 执行sql
	connection.query(sqlStr,(err,data) => {
		if (err) throw err;
		//判断受影响行数
		if(data.affectedRows > 0){
			res.send({code:0,reason:"密码修改成功"});
		}else{
			res.send({code:1,reason:"密码修改失败"});
		}
	})
})



// wdd添加账户路由
router.post('/accountadd',(req,res)=>{
	// 接收数据
	let {account,password,user_group} = req.body;
	//默认头像
	let avatarUrl = `/upload/avatar.jpg`;
	// 准备sql
	const sqlStr = `insert into account(account,password,user_group,avatarUrl) values('${account}','${password}','${user_group}','${avatarUrl}')`;
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

// 个人中心-获取用户数据
router.get('/getaccountObj',(req,res) => {
	let id = req.user.id;
	//构造sql
	const sqlStr = `select * from account where id=${id}`;
	console.log(sqlStr);
	// res.send('1');
	//执行sql
	connection.query(sqlStr,(err,data) => {
		if (err) throw err;
		res.send(data)
	})
})

//顶部-获取账户名
router.get('/getaccount',(req,res) => {
	// 获取id
	let id = req.user.id;

	// 构造sql
	const sqlStr = `select * from account where id=${id}`;
	// console.log(sqlStr);
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		res.send( data );
	})
})

/* -----上传开始---- */ 
// 引入node上传模块
var multer = require('multer');

// 配置存储路径 和 重命名
var storage = multer.diskStorage({
    // 图片上传到服务器以后 要放置的路径
    destination: 'public/upload',

    // 图片重命名
    filename: function (req, file, cb) {
        var fileFormat =(file.originalname).split(".");
        // 获取时间戳
        var filename = new Date().getTime();  
        // 124354654 + "." + jpg
        cb(null, filename + "." + fileFormat[fileFormat.length - 1]);
    }
});

// 上传对象
var upload = multer({
    storage,
});

// 接收上传请求
router.post('/uploadavatar', upload.single('file'), (req, res) => {
    // 接收到的文件信息
	var file = req.file;
	console.log(file)

	// 文件名
	let fileName = file.filename;
	// 拼接文件路径
	let avatarUrl = '/upload/' + fileName

	// 构造sql
	const sqlStr = `update account set avatarUrl = '${avatarUrl}' where id=${req.user.id}`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		if (data.affectedRows > 0) {
			res.send({code: 0, reason: "上传成功", avatarUrl})
		} else {
			res.send({code: 1, reason: "上传失败"})
		}
	})
})

/* ----上传结束----- */ 


// 获取用户角色
router.get('/getrole',(req,res) => {
	res.send({role: req.user.user_group});
})
 
module.exports = router;

