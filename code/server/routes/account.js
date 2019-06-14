var express = require('express');
var router = express.Router();
// 引入数据库连接模块
const connection = require('./js/conn')

/* GET home page. */
router.get('/',(req, res)=> {
  res.send('测试账号路由');
});

module.exports = router;
