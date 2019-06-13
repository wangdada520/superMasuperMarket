<template>
  <div class="Account-Add">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加管理员账号</span>
      </div>
      <!-- 登录 -->
      <div class="text item">
        <el-form
          style="300px"
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
          <el-form-item label="选择用户组" prop="accountGroup">
            <el-select v-model="accountForm.accountGroup" placeholder="选择用户组">
              <el-option label="高级用户" value="高级用户"></el-option>
              <el-option label="普通用户" value="高级用户"></el-option>
            </el-select>
          </el-form-item>
          <!--登录按钮  -->
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">添加</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //用户
      account: [{}],
      // 密码
      password:[
          {}
      ],
      // 确认密码
      checkPass:[
          {}
      ],
      accountGroup:[
          {}
      ]

    };
  }
};
</script>

<style lang="less">
@import "./AccountAdd.less";
</style>