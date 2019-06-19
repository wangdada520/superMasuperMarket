/* 
本地存储的封装

*/
export default{
    // c存数据
    save(key,value){
        window.localStorage.setItem(key,JSON.stringify(value))
    },
        // 取数据
        get(key) {
            return JSON.parse(window.localStorage.getItem(key))
        },
        // 删除指定数据
        remove(key){
            window.localStorage.removeItem(key)
        }
    }
