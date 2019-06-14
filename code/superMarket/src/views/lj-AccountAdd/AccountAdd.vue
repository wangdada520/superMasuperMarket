<template>
    <div class="account-add">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>添加管理员账户</span>
            </div>
            <el-form
                style="width:400px"
                :model="accountForm"
                status-icon
                :rules="rules"
                ref="accountForm"
                label-width="100px"
                class="demo-ruleForm"
                >
                <!-- 账号 -->
                <el-form-item label="账号" prop="account">
                <el-input type="text" v-model="accountForm.account" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item label="密码" prop="password">
                <el-input type="text" v-model="accountForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 确认密码 -->
                <el-form-item label="确认密码" prop="checkPass">
                <el-input type="text" v-model="accountForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 选择用户组 -->
                <el-form-item label="选择用户组" prop="region">
                    <el-select v-model="accountForm.region" placeholder="请选择用户组">
                    <el-option label="管理员" value="guanliyuan"></el-option>
                    <el-option label="员工" value="yuangong"></el-option>
                    </el-select>
                </el-form-item>
                <!-- 登录按钮 -->
                <el-form-item>
                <el-button type="primary" @click="submitForm('accountForm')">添加</el-button>
                <el-button @click="resetForm('accountForm')">重置</el-button>
                </el-form-item>       
            </el-form>
        </el-card>
    </div>
</template>

<script>
// 引入密码正则验证
import { passwordReg } from "@/utils/validator.js";
import qs from 'qs';

import { addAccount } from '@/api/account.js';

export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.accountForm.password) {
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
                if (this.accountForm.checkPass !== "") {
                this.$refs.accountForm.validateField("checkPass");
                }
                callback();
            }
        };
        return {
            //表单数据
            accountForm: {
                account: "",
                password: "",
                checkPass: "",
                region:''
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
                ],
                region:[
                    { required: true, message: "请选择用户组", trigger: "change" }
                ]
            }
        
    };
  },
  methods: {
    submitForm() {
      this.$refs.accountForm.validate(valid => {
        if (valid) {
          //提交数据给后端
          let params = {
            account: this.accountForm.account,
            password: this.accountForm.password,
            region: this.accountForm.region
          };
        //   alert("添加成功！");
            addAccount('/account/ljAccountadd',params)
                .then(res => {
                    console.log('成功：'+res);
                })
                .catch(err => {
                    console.log('失败：'+err)
                })
          //路由跳转
        //   this.$router.push("/home/ljAccountManage");
        } else {
          console.log("验证不通过");
          return;
        }
      });
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
    @import "./AccountAdd.less";
</style>
