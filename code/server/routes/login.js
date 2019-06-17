/* 
登录界面
*/
var express = require('express');
var router = express.Router();

// 引入jwt
const jwt = require('jsonwebtoken');

// 2. 定义秘钥
const secret = 'itsource';

// 引入数据库连接模块
const connection = require('./js/conn')

//统一设置响应头
router.all('*', (req, res, next) => {
    //设置跨域
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})

// 检查账号密码是否正确
router.post('/checklogin',(req,res)=>{
    // 接收参数
    let {account,password}=req.body;
    // 准备sql
    const sqlStr=`select * from account where account='${account}' and password='${password}'`
    // 执行sql
    connection.query(sqlStr,(err,data)=>{
        if (err) throw err;
		if(data.length){
            // 生成token
            console.log(Object.assign({},  data[0]))
            const token = jwt.sign(Object.assign({},  data[0]), secret, {
                expiresIn:  60 * 60 * 2 // 过期时间
            });
            res.send({code:0,reason:" 登录成功",token});
        }else{
            res.send({code:1,reason:" 登录失败~"});
        }
    })

})










module.exports = router;