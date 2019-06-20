/* 
会员模块所有请求

*/
// 引入封装好的request.js
import request from '../utils/request.js';

/* 添加会员 */
export function memberadd(params) {
    return request.post('/member/memberadd',params)
}

/* 分页 */
export function getmemberPage(params) {
    return request.get('/member/getmemberPage',params)
}

/* 批量删除 */
export function batchdel(params) {
    return request.get('/member/batchdel',params)
}

/* 删除一个 */
export function delOnedata(params) {
    return request.get('/member/delOnedata',params)
}

/* 修改 数据回填 */
export function editmember(params) {
    return request.get('/member/editmember',params)
}

/* 修改 保存修改 */
export function saveEditmember(params) {
    return request.post('/member/saveEditmember',params)
}