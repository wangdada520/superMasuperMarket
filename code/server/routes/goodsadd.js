/* 
添加商品界面
*/
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
router.all('*', (req, res, next) => {
    //设置跨域
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Headers", "authorization"); // 允许通过头部信息authorization 携带token
    next();
})


router.post('/goodssaveadd', (req, res) => {
    // 接收所有数据
    let {
        name,
        code,
        cate_id,
        costprice,
        price,
        seleprice,
        num,
        weight,
        saled,
        intro
    } = req.body;
    //准备sql
    let sqlStr = `insert into goods(name,code,cate_id,costprice,price,seleprice,num,weight,saled,intro) values('${name}','${code}','${cate_id}','${costprice}','${price}','${seleprice}','${num}','${weight}','${saled}','${intro}')`;
    console.log(sqlStr);
    //    执行sql
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        //判断受影响行数
        if (data.affectedRows > 0) {
            res.send({
                code: 0,
                reason: "添加商品成功"
            });
        } else {
            res.send({
                code: 1,
                reason: "添加商品失败"
            });
        }
    })

})

// 修改 数据回填
router.get('/editagoods', (req, res) => {
    // 接收数据
    let {
        id
    } = req.query;
    // 准备sql
    const sqlStr = `select * from goods where id =${id}`
    //执行sql
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        console.log(data);
        // res.send(111);
        res.send(data) //响应数据给前端
    })

})

// 修改  确定按钮
router.post('/saveEditgoods', (req, res) => {
    // 接收数据
    let {
        name,
        cate_id,
        EditId
    } = req.body;
    // 准备sql
    const sqlStr = `update goods set name='${name}', cate_id='${cate_id}' where id=${EditId}`;
    //执行sql
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        //判断受影响行数
        if (data.affectedRows > 0) {
            res.send({
                code: 0,
                reason: "修改账户成功"
            });
        } else {
            res.send({
                code: 1,
                reason: "修改账户失败"
            });
        }
    })
})
// 分页
router.get('/goodspage', (req, res) => {
    // 接收参数
    let {
        currentPage,
        pageSize,
        cate_id,
        keyword
    } = req.query;
    // 准备sql
    let sqlStr = `select * from goods where 1=1`
    // console.log(sqlStr);
    // 定义变量 保存数总条数
    // 如果cate_id为空 就查询所有
    if (cate_id !== '全部' && cate_id !== '') {
        sqlStr += ` and cate_id='${cate_id}'`
    }
    // 如果keyword为空 就查询所有名称和条形码
    if (keyword !== '') {
        sqlStr += ` and(name like '%${keyword}%' or code like '%${keyword}%')`
    }
    // 拼接排序
    sqlStr += ` order by id desc`;

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

//批量删除
router.get('/batchdelgoods', (req, res) => {
    // 接收id
    let {
        idArr
    } = req.query;
    console.log(idArr);
    //构造sql
    const sqlStr = `delete from goods where id in (${idArr})`
    //执行sql
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        //判断受影响行数
        if (data.affectedRows > 0) {
            res.send({
                code: 0,
                reason: "批量删除成功"
            });
        } else {
            res.send({
                code: 1,
                reason: "批量删除失败"
            });
        }
    })
})

//删除账户列表路由
router.get('/delagoods', (req, res) => {
    //接受数据
    let {
        id
    } = req.query;
    //准备sql
    const sqlStr = `delete from goods where id=${id}`;
    // console.log(sqlStr)
    //执行sql
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        //判断受影响行数
        if (data.affectedRows > 0) {
            res.send({
                code: 0,
                reason: "删除商品成功"
            });
        } else {
            res.send({
                code: 1,
                reason: "删除商品失败"
            });
        }
    })
});


// // 查询
// router.get('/search', (req, res) => {
//     // 接收数据
//     let {
//         cate_id,
//         keyword
//     } = req.query;
//     // 准备sql
//     let sqlStr = `select * from goods where 1=1`
//     // 如果catename为空 就查询所有
//     if (catename !== '全部' && catename !== '') {
//         sqlStr += ` and catename='${catename}'`
//     }
//     // 如果keyword为空 就查询所有名称和条形码
//     if (keyword !== '') {
//         sqlStr += ` and(name like '%${keyword}%' or code like '%${keyword}%')`
//     }
//     //执行sql
//     connection.query(sqlStr, (err, data) => {
//         if (err) throw err;
//         // console.log(data);
//         res.send(data) //响应数据给前端
//     })

// })

router.get('/selldata', (req, res) => {
	res.send({
		category: ["7月","8月","9月","10月","11月","12月"],
		value:  [500, 200, 400, 100, 100, 200]
	})
})


module.exports = router;