<template>
    <div class="login">
        <div class="login-wrap">
            <h1><span class="el-icon-menu"></span> 华联超市管理系统</h1>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="账户" prop="account">
                    <el-input type="text" v-model="ruleForm.account" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
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
import { passwordReg } from '@/utils/validator.js'

export default {
  data() {
    // 确认密码自定义验证
    var confirmPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("不能为空"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
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
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      // 表单数据
      ruleForm: {
        account: "",
        password: "",
        checkPass: ""
      },
      // 验证规则
      rules: {
        // 账户
        account: [
          { required: true, message: "请输入账户", trigger: "blur" },
          { min: 3, max: 6, message: "账户长度3-6", trigger: "blur" }
        ],
        // 密码
        password: [{ required: true, validator: checkPassword, trigger: "blur" }],
        // 确认密码
        checkPass: [
          { required: true, validator: confirmPassword, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 登录
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = {
            account: this.ruleForm.account,
            password: this.ruleForm.password
          };
          // console.log(params)
          // 发送请求
          this.request.post('/login/login',params)
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err)
            })
          // this.$router.push("/home");
        } else {
          console.log("前段验证不通过，不允许提交");
          return false;
        }
      });
    },
    //   重置
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>
<style lang="less">
@import "./lj-login.less";
</style>


