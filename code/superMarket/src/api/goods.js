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
// 修改
export function editaGoods(params){
    return request.get('/goodsadd/editagoods',params)
}
// 保存修改
export function saveEditGoods(params){
    return request.post('/goodsadd/saveEditgoods',params)
}

// 批量删除
export function batchdel(params){
    return request.get('/goodsadd/batchdelgoods',params)
}

// 删除
export function delagooda(params){
    return request.get('/goodsadd/delagoods',params)
}
// 查询
export function goodssearch(params){
    return request.get('/goodsadd/search',params)
}