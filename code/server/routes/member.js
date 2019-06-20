/* 
添加商品界面
*/
var express = require('express');
var router = express.Router();
// 引入数据库连接模块
const connection = require('./js/conn')

//统一设置响应头
router.all('*', (req, res, next) => {
    //设置跨域
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Headers", "authorization"); // 允许通过头部信息authorization 携带token
    next();
})
router.post('/memberadd', (req, res) => {
    // 接收所有数据
    let {name,card,user_group,identity,state,phone,email,region,adress} = req.body;
    //准备sql
    let sqlStr = `insert into member(name,card,user_group,identity,state,phone,email,region,adress) values(?,?,?,?,?,?,?,?,?)`;
    let params = [name,card,user_group,identity,state,phone,email,region,adress];
	// console.log(sqlStr);
    //    执行sql
    connection.query(sqlStr,params, (err, data) => {
        if (err) throw err;
        //判断受影响行数
        if (data.affectedRows > 0) {
            res.send({
                code: 0,
                reason: "添加会员成功"
            });
        } else {
            res.send({
                code: 1,
                reason: "添加会员失败"
            });
        }
    })

})


// 分页
router.get('/getmemberPage', (req, res) => {
    // 接收参数
    let {pageSize,currentPage} = req.query;
    // 构造sql
    let sqlStr = `select * from member order by id desc`;
    // console.log(sqlStr);
    // 定义变量 保存数总条数
    let total;

    // 执行sql
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        // 计算总条数
        let total = data.length;
        // 计算跳过多少条
        let n = (currentPage - 1) * pageSize;
        // 拼接分页
        sqlStr += ` limit ${n},${pageSize}`;
        // 执行sql
        connection.query(sqlStr, (err, data) => {
            if (err) throw err;
            res.send({
                total,
                data
            })

        })
    })

})


// 删除
router.get('/delOnedata', (req, res) => {
    // 接收参数
    let {id} = req.query;
    // 构造sql
    let sqlStr = `delete from member where id=${id}`;
    // console.log(sqlStr);
    // 执行sql
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        //判断受影响行数
		if(data.affectedRows > 0){
			res.send({code:0,reason:"删除账户成功"});
		}else{
			res.send({code:1,reason:"删除账户失败"});
		}
    })

})


// 修改 数据回填
router.get('/editmember',(req,res)=>{
	// 接收数据
	let {id}=req.query;
	// 准备sql
	const sqlStr = `select * from member where id =${id}`
	//执行sql
	connection.query(sqlStr,(err,data) => {
		if (err) throw err;
		
	      res.send(data )//响应数据给前端
	})
	
})

// 修改  确定按钮
router.post('/saveEditmember',(req,res)=>{
	// 接收数据
	let {name,user_group,EditId} = req.body;
	// 准备sql
	const sqlStr = `update member set name='${name}', user_group='${user_group}' where id=${EditId}`;
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
	const sqlStr=`delete from member where id in (${idArr})`;
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

module.exports = router;