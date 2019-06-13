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
        <el-form-item label="账号" prop="account">
          <el-input type="text" v-model="loginForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="loginForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>       
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
    data(){
         var validatePass = (rule, value, callback) => {
              if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.loginForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {2
          callback();//成功
        }

         }
        return {
            //表单数据
            loginForm:{
                account:'',
                password:'',
                checkPass:'',

            },
            //验证规则
            rules:{
                account:[
                    {required:true,message:'请输入账号',trigger:'blur'},
                    {min:3,max:6,message:"账号长度3-6位",trigger:'blur'}

                ],
                password:[
                     {required:true,message:'请输入密码',trigger:'blur'},
                    {min:2,max:9,message:"密码长度2-9位",trigger:'blur'}


                ],
                checkPass:[
                     {required:true,validator:validatePass,},
                ],

            }

        }
    },
    methods:{
         submitForm() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
           //提交数据给后端
          let params={
           account: this.loginForm.account,
           password: this.loginForm.password
          }
          alert('登录成功！')
          //路由跳转
          this .$router.push('/home');
          } else {
            console.log('验证不通过');
            return 
          }
        })
      },
      //重置
      resetForm(formName) {
          //重置表单
        this.$refs[formName].resetFields();
      }
    }
};
</script>
<style lang="less">
//样式引入
@import "./login.less";
</style>

