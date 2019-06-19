// 引入axios
import axios from "axios";
// 引入qs
import Qs from 'qs';

import local from '@/utils/local'
// 统一设置响应头
axios.defaults.baseURL ='http://127.0.0.1:999';

// // axios请求拦截器
axios.interceptors.request.use(config => {
    // 获取token
    const token = local.get('wdd_token');
    console.log(token);
    
    config.headers.authorization = `Bearer ${token}` 
    return config;
})
// 导出请求对象
export default {
    get(url, params={}){
        return new Promise((resolve,reject) => {
            axios.get(url,{params})
                .then(response => {
                    resolve(response.data);//成功使用resolve处理
                })
                .catch(err => {
                    reject(err);//成功使用reject处理
                })
        })
    },
    post(url, params={}){
        return new Promise((resolve,reject) => {
            axios.post(url,Qs.stringify(params))
                .then(response => {
                    resolve(response.data);//成功使用resolve处理
                })
                .catch(err => {
                    reject(err);//成功使用reject处理
                })
        })
    }
}

