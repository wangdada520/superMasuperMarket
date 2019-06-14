<template>
    <div class="password-Modify">
   <!-- 密码修改组件面板 -->
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
          <!-- 原密码 -->
          <el-form-item label="原密码:" prop="account">
            <el-input type="text" v-model="accountForm.account" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 新密码 -->
          <el-form-item label="新密码:" prop="password">
            <el-input type="password" v-model="accountForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 确认新密码 -->
          <el-form-item label="确认新密码:" prop="checkPass">
            <el-input type="password" v-model="accountForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
         
          <!--登录按钮  -->
          <el-form-item>
            <el-button type="success" @click="submitForm('accountForm')">修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    </div>

</template>

<script>
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
        callback(new Error("输入你要修改的新密码"));
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
       
      },
      //验证规则
      rules: {
        account: [
            // 原密码
          { required: true, message: "请输入原密码", trigger: "blur" },
        ],
        // 新密码
        password: [
          { required: true, validator: checkPassword, trigger: "blur" }
        ],
        // 确认新密码
        checkPass: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
       
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
          alert("添加成功！");
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
@import './passwordModify.less';
</style>