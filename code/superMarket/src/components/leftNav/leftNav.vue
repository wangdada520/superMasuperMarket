<template>
  <div class="leftNav">
    <el-menu
      default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="rgb(48, 65, 86)"
      text-color="#fff"
      active-text-color="rgb(64, 158, 255)"
      unique-opened
      router
    >
     <!-- 导航 -->
      <el-submenu :index="index+1" v-for="(menu,index) in menus" :key="index">
        <template slot="title">
          <i :class="menu.iconclass"></i>
          <span>{{ menu.title }}</span>
        </template>
        <el-menu-item
          v-for="(submenu,index) in menu.childer"
          :key="index"
          :index="submenu.path"
        >{{submenu.subtitle}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menus: [
     
        // 商品管理
        {
          iconclass: "el-icon-s-goods",
          title: "商品管理",
          childer: [
            { path: "/home/GoodsManage", subtitle: "商品管理" },
            { path: "/home/GoodsAdd", subtitle: "添加商品" }
            ]
        },
        // 进货管理
        {
          iconclass: "el-icon-truck",
          title: "进货管理",
          childer: [
            { path: "/home/stockControl", subtitle: "库存管理" },
            { path: "/home/AddInventory", subtitle: "添加库存" }
            ]
        },
        // 出货管理
        {
          iconclass: "el-icon-sold-out",
          title: "出货管理",
          childer: [
            { path: "/home/SalesList", subtitle: "销售列表" },
            { path: "/home/Outbound", subtitle: "商品出库" },
            { path: "/home/GoodsReturn", subtitle: "商品退货" },
            ]
        },
         //  统计管理
        {
          iconclass: "el-icon-s-marketing",
          title: "统计管理",
          childer: [
            { path: "/home/salesTotal", subtitle: "销售统计" },
            { path: "/home/Stocktotal", subtitle: "进货统计" }
          ]
        },
        // 账号管理
        {
          iconclass: "el-icon-s-custom",
          title: "账号管理",
          childer: [
            { path: "/home/AccountManage", subtitle: "账号管理" },
            { path: "/home/AccountAdd", subtitle: "添加账号" },
            { path: "/home/passwordModify", subtitle: "密码修改" }
          ]
        },
        // 会员管理
        {
          iconclass: "el-icon-user-solid",
          title: "会员管理",
          childer: [
            { path: "/home/AccountManage", subtitle: "账号管理" },
            { path: "/home/AccountAdd", subtitle: "添加账号" },
            ]
        },
        // 系统管理
        {
          iconclass: "el-icon-s-management",
          title: "系统管理",
          childer: [
            { path: "/home/SystemInfo", subtitle: "系统信息" },
          
            ]
        },
        
        
       
      ]
    };
  }
};
</script>
<style lang='less'>
/* //引入 */
@import "./lestnav.less";
</style>


