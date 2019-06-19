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
router.post('/goodssaveadd',(req,res)=>{
    // 接收所有数据
   let {name,code,cate_id,costprice,price,seleprice,num,weight,saled,intro}=req.body;
   //准备sql
   let sqlStr=`insert into goods(name,code,cate_id,costprice,price,seleprice,num,weight,saled,intro) values('${name}','${code}','${cate_id}','${costprice}','${price}','${seleprice}','${num}','${weight}','${saled}','${intro}')`;
   console.log(sqlStr);
   //    执行sql
   connection.query(sqlStr,(err,data)=>{
    if (err) throw err;
    //判断受影响行数
    if(data.affectedRows > 0){
        res.send({code:0,reason:"添加商品成功"});
    }else{
        res.send({code:1,reason:"添加商品失败"});
    }
   })
       
})


// 分页
router.get('/goodspage',(req,res)=>{
	// 接收参数
	let {currentPage,pageSize}=req.query;
	// 构造sql
    let sqlStr=`select * from goods order by id desc`
    // console.log(sqlStr);
    
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




module.exports = router;