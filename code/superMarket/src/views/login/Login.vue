<template>
  <div class="login">
      
    <div class="login-wrap">
      <div class="title">
            <span class="el-icon-menu"></span>
      华联超市管理系统
      </div>
   <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-ruleForm"
      >
      <!-- 账号 -->
        <el-form-item label="账号" prop="account">
          <el-input type="text" v-model="loginForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="loginForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm()">登录</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>       
      </el-form>
    </div>
  </div>
</template>

<script>
// 引入密码正则验证
import { passwordReg } from "@/utils/validator.js";
// 引入 local 文件
import local from '@/utils/local'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.loginForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback(); //成功
      }
    };
    // 密码自定义验证
    var checkPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("不能为空"));
      } else if (value.length < 3 || value.length > 6) {
        callback(new Error("密码在 3~6 位之间"));
      } else if (!passwordReg(value)) {
        callback(new Error("密码必须是数字和字母组合"));
      } else {
        if (this.loginForm.checkPass !== "") {
          this.$refs.loginForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      //表单数据
      loginForm: {
        account: "",
        password: "",
        checkPass: ""
      },
      //验证规则
      rules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 6, message: "账号长度3-6位", trigger: "blur" }
        ],
        password: [
          { required: true, validator: checkPassword, trigger: "blur" }
        ],
        checkPass: [
          { required: true, validator: validatePass, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          //提交数据给后端
          let params = {
            account: this.loginForm.account,
            password: this.loginForm.password
          };
          // console.log(params)
        // 把参数发送给后端
        this.request.post('/login/checklogin',params)
        .then(res=>{
          // 接收后端响应的数据
          let {code,reason,token}=res
          console.log(token)
          // 判断
          if(code===0){
            // 把token存入本地存贮
             local.save('wdd_token', token)

            // 弹出成功提示
              this.$message({
                type:"success",
                message:reason
              })
            //  跳转到后台页面
              this.$router.push('/home')//跳转到后端的首页
            }else if(code===1){
              // 弹出失败信息
              this.$message.error(reason)
            }  
        })
        .catch(err=>{
          console.log(err);
        }) 
        } else {
          console.log("验证不通过");
          return;
        }
      });
    },
    //重置
    resetForm() {
      //重置表单
      this.$refs.loginForm.resetFields();
    }
  }
};
</script>
<style lang="less">
//样式引入
@import "./login.less";
</style>

