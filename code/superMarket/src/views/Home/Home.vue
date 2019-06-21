<template>
  <div class="home">
    <el-container>
      <!-- 左侧 -->
      <el-aside width="200px">
        <!-- 导航 -->
        <leftNav></leftNav>
      </el-aside>

      <!-- 右侧 -->
      <el-container>
        <!-- 右侧头部 -->
        <el-header>
          <top ref="top"></top>
        </el-header>

        <!-- 右侧中间 -->
        <el-main>
          <!-- 路由出口 -->
          <router-view @sc="fn"></router-view>
        </el-main>
        <!-- 右侧页脚 -->
        <el-footer>
          <bottom></bottom>
        </el-footer>
      </el-container>
    </el-container>

    <div>  
    </div>
  </div>
</template>

<script>
// 引入组件
//注册组件
import leftNav from "@/components/leftNav/leftNav.vue";
import top from "@/components/top/top.vue";
import bottom from "@/components/bottom/bottom.vue";
export default {
  components: {
    //注册组件
    leftNav,
    bottom,
    top
  },
  methods:{
    fn(){
      this.$refs.top.getaccount();
    }
  }
};
</script>
<style lang="less">
// 引入样式
@import "./home.less";
</style>

