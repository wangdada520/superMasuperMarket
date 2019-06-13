// 正则验证密码
export function passwordReg(val){
    let reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
    return reg.test(val)
} 