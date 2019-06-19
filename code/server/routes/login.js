/* 
登录界面
*/
var express = require('express');
var router = express.Router();

// 引入jwt
const jwt = require('jsonwebtoken');



// 引入数据库连接模块
const connection = require('./js/conn')

//统一设置响应头
router.all('*', (req, res, next) => {
    //设置跨域
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Headers", "authorization"); // 允许通过头部信息authorization 携带token
    next();
})
// / 准备一个签名（秘钥）
const secretKey = 'itsource';
/* 验证token的合法性 */
const expressJwt = require('express-jwt');

// 验证token的合法性
router.use(expressJwt ({
    secret: secretKey
}).unless({
    path: ['/login/checklogin']  // 除了这个地址，其他的URL都需要验证（其他的所有请求 都要带上token 才能获取数据 否则不能获取到数据）
})); 
// 路由拦截器
router.use(function (err, req, res, next) {
    // 如果前端没有token或者是错误的token 就会抛出如下错误
    if (err.name === 'UnauthorizedError') { 
        // 响应给前端token无效的信息
        res.status(401).send('token不合法...');
    }
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
            // console.log(Object.assign({},  data[0]))
            const token = jwt.sign(Object.assign({},  data[0]), secretKey, {
                expiresIn:  60 * 60 * 2 // 过期时间
            });
            res.send({code:0,reason:" 登录成功",token});
        }else{
            res.send({code:1,reason:" 请验证你的用户名或密码是否正确~"});
        }
    })

})


/* 获取当前登录用户名 */ 
router.get('/currentaccount', (req, res) => {
	// 响应当前登录的账号名给前端 （使用express-jwt验证token合法后 会把token的值 存入 req.user 其实就是当前登录账号数据对象）
	res.send(req.user.account)
})








module.exports = router;