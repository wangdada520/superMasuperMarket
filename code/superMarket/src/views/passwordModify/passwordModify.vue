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
          :model="passwordModify"
          status-icon
          :rules="rules"
          ref="passwordModify"
          label-width="100px"
          class="demo-ruleForm"
        >
          <!-- 原密码 -->
          <el-form-item label="原密码:" prop="oldPassword">
            <el-input type="text" v-model="passwordModify.oldPassword" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 新密码 -->
          <el-form-item label="新密码:" prop="newPassword">
            <el-input type="password" v-model="passwordModify.newPassword" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 确认新密码 -->
          <el-form-item label="确认新密码:" prop="checkNewPassword">
            <el-input type="password" v-model="passwordModify.checkNewPassword" autocomplete="off"></el-input>
          </el-form-item>

          <!--登录按钮  -->
          <el-form-item>
            <el-button type="success" @click="submitForm('passwordModify')">修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { passwordReg } from "@/utils/validator.js";
import local from '@/utils/local'
export default {
  data() {
    // 旧密码
    const validatorOldPassword = (rule, value, callback) => {
      // 发送axios给后端
      this.request
        .post("/account/passwordmodify", { oldPassword: value })
        .then(res => {
          // 接收后端响应的数据
          let { code, reason } = res;
          // 判断
          if (code === 0) {
            callback(); // 成功
          } else {
            callback(new Error(reason)); // 失败
          }
        })
        .catch(err => {
          console.log(err);
        });
    };
    // 新密码
    const NewPassword=(rule, value, callback) =>{
        if(value===''){
          callback(new Error('输入您的新密码！'))

        }else if(!passwordReg(value)){
          callback(new Error ('密码必须是数字和字母组合'))
        } else {
        if (this.passwordModify.newPassword !== "") {
          this.$refs.passwordModify.validateField("newPassword");
        }
        callback();
      }


    }
    // 密码自定义验证
    var checkPassword = (rule, value, callback) => {
      if (value === "") {
        //非空
        callback(new Error("输入你要修改的新密码"));
      } else if (value !==this.passwordModify.newPassword) {
        callback(new Error("密码不一致"));
      }  else {
        callback();
      }
    };
    return {
      //表单数据
      passwordModify: {
        oldPassword: "",
        newPassword: "",
        checkNewPassword: ""
      },
      //验证规则
      rules: {
        oldPassword: [
          // 原密码
          { required: true, validator: validatorOldPassword, trigger: "blur" }
        ],
        // 新密码
        newPassword: [
          { required: true, validator: NewPassword, trigger: "blur" }
        ],
        // 确认新密码
        checkNewPassword: [
          {
            required: true,
            validator: checkPassword,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.passwordModify.validate(valid => {
        if (valid) {
          // 收集所有的新密码
          let params = {
            newPassword: this.passwordModify.newPassword
          };
          //发送请求给后端
          this.request
            .post("/account/savepassword", params)
            .then(res => {
              // 接收数据
              let { code, reason } = res;
              // 判断
              if (code === 0) {
                this.$message({
                  type: "success",
                  message: reason
                });
                // 删除token
                local.remove("wdd_token");
                // 跳转到登录页面
                this.$router.push("/login");
              } else if (code === 1) {
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return;
        }
      });
    }
  }
};
</script>

<style lang="less">
@import "./passwordModify.less";
</style>