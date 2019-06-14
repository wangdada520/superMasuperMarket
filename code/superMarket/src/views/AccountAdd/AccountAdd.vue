<template>
  <div class="Account-Add">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加管理员账号</span>
      </div>
      <!-- 登录 -->
      <div class="text item">
        <el-form
          style="width:300px"
          size="small"
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
            <el-input type="password" v-model="accountForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 确认密码 -->
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="accountForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 选择用户组 -->
          <el-form-item label="选择用户组" prop="userGroup">
            <el-select v-model="accountForm.userGroup" placeholder="选择用户组">
              <el-option label="高级用户" value="高级用户"></el-option>
              <el-option label="普通用户" value="高级用户"></el-option>
            </el-select>
          </el-form-item>
          <!--登录按钮  -->
          <el-form-item>
            <el-button type="primary" @click="submitForm('accountForm')">添加</el-button>
            <el-button @click="resetForm('accountForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入密码正则验证
import { passwordReg } from "@/utils/validator.js";
import qs from 'qs';

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
        //非空
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
        userGroup:''
      },
      //验证规则
      rules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 6, message: "账号长度3-6位", trigger: "blur" }
        ],
        // 密码
        password: [
          { required: true, validator: checkPassword, trigger: "blur" }
        ],
        // 确认密码
        checkPass: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        userGroup: [
          { required: true, message: '请选择用户组', trigger: "change" }
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
            userGroup: this.accountForm.userGroup,
          };
          
          //发送ajax请求，把数据发送给后端
          this.ljreq.get('/uel',{
            params
          })
          .then(Response=>{
            console.log(Response.data);
            
          })
          .catch(err=>{
            console.log(err);
            
          })
            //路由跳转
          this.$router.push("/home/AccountManage");
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