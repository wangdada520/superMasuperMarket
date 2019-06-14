
// 引入request
import request from '../utils/request.js';


// 封装函数
export function addAccount(url,params){
    return new Promise((resolve,reject) => {
        request.post(url,params)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
    
}