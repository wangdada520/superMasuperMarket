// 引入axios
import axios from "axios";
// 引入qs
import Qs from 'qs';

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