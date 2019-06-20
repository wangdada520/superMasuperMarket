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
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                王大大
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
              
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    handleCommand(command){
      if(command==='loginout'){
        // 清除token
        local.remove('wdd_token')
        // 弹出提示信息
        this.$message({
          type:'success',
          message:'退出系统成功！！'
        })
        setTimeout(()=>{
          //跳转到登录页面
          this.$router.push('/login')
        },500)
      }else if(command==='personal'){
        
      }

    }
  },
};
</script>

<style lang="less">
@import "top.less";
</style>