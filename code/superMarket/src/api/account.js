
// 引入request
import request from '../utils/request.js';


// 添加账户
export function accountadd(params){
    return request.post('/account/accountadd',params)
}

// 按照分页请求数据
export function accountpage(params){
    return request.get('/account/accountpage',params)
}

// 修改
export function editaccount(params){
    return request.get('/account/editaccount',params)
}

// 删除
export function delaccount(params){
    return request.get('/account/delaccount',params)
}

// 保存修改
export function saveEditaccount(params){
    return request.post('/account/saveEditaccount',params)
}

// 批量删除
export function batchdel(params){
    return request.get('/account/batchdel',params)
}