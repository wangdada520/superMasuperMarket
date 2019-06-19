/* 
商品模块所有请求

*/
// 引入封装好的request.js
import request from '../utils/request.js';

/* 商品添加 */
export function goodssaveAdd(params) {
    return request.post('/goodsadd/goodssaveadd',  params)
}

/* 商品表格数据 */ 
export function goodsPage(params) {
    return request.get('/goodsadd/goodspage', params)
}