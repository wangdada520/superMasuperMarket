var express = require('express');
var router = express.Router();
// 引入数据库连接模块
const connection = require('./js/conn')

/* GET home page. */
router.post('/ljAccountadd',(req, res)=> {
	//设置跨域
	res.setHeader('Access-Control-Allow-Origin','*');
  res.send('测试账号路由');
});

module.exports = router;
