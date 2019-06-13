<template>
  <div class="top">
    <el-row :gutter="20">
      <el-col :span="20">
        <h3>
          <i class="el-icon-menu"></i> 华联超市管理系统
        </h3>
      </el-col>
      <el-col :span="4">
        <el-row>
          <el-col :span="8">
            <!-- 头像 -->
            <div class="imghead">
              <img src="./timg.jpg">
            </div>
          </el-col>
          <el-col :span="16">
            <!-- 登录名 -->
            <el-dropdown>
              <span class="el-dropdown-link">
                王大大
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
@import "top.less";
</style>