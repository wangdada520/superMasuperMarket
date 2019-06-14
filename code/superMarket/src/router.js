import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 导出路由实例对象
export default new Router({
  routes: [
    {
      //根目录定向到登录 
      path: "/", // 路径
     redirect:'login'
    },
    //登录
    {
      path: "/login", // 路径
      component: () => import("./views/login/Login.vue") //组件
    },
    //后台主界面
    {
      path: "/home", // 路径
      component: () => import("./views/Home/Home.vue"), //组件
      children: [
        // 系统信息组件
        {
          path: "/home/systeminfo", // 路径
          component: () => import("./views/SystemInfo/SystemInfo.vue"), //组件
        },
        // 李杰-系统信息组件
        {
          path: "/home/ljsysteminfo", // 路径
          component: () => import("./views/lj-SystemInfo/SystemInfo.vue"), //组件
        },
      
        // 添加账号管理
        {
          path: "/home/accountadd", // 路径
          component: () => import("./views/AccountAdd/AccountAdd.vue"), //组件
        },
        // 李杰-添加账户
        {
          path: "/home/ljAccountadd", // 路径
          component: () => import("./views/lj-AccountAdd/AccountAdd.vue"), //组件
        },
        // 账号管理
        {
          path: "/home/AccountManage", // 路径
          component: () => import("./views/AccountManage/AccountManage.vue"), //组件
        },
        // 李杰-账号管理
        {
          path: "/home/ljAccountManage", // 路径
          component: () => import("./views/lj-AccountManage/AccountManage.vue"), //组件
        },
        //密码修改
        {
          path: "/home/passwordmodify", // 路径
          component: () => import("./views/passwordModify/passwordModify.vue"), //组件
        },
        // 商品管理
        {
          path: "/home/goodsmanage", // 路径
          component: () => import("./views/GoodsManage/GoodsManage.vue"), //组件
        },
        // 添加商品
        {
          path: "/home/goodsadd", // 路径
          component: () => import("./views/GoodsAdd/GoodsAdd.vue"), //组件
        },
        //销售统计
        {
          path: "/home/salesTotal", // 路径
          component: () => import("./views/salesTotal/salesTotal.vue"), //组件
        },
        //进货统计
        {
          path: "/home/stockTotal", // 路径
          component: () => import("./views/Stocktotal/Stocktotal.vue"), //组件
        },
        //销售列表
        {
          path: "/home/SalesList", // 路径
          component: () => import("./views/SalesList/SalesList.vue"), //组件
        },
        //商品出库
        {
          path: "/home/Outbound", // 路径
          component: () => import("./views/Outbound/Outbound.vue"), //组件
        },
        //商品退货
        {
          path: "/home/GoodsReturn", // 路径
          component: () => import("./views/GoodsReturn/GoodsReturn.vue"), //组件
        },
        //库存管理
        {
          path: "/home/stockControl", // 路径
          component: () => import("./views/stockControl/stockControl.vue"), //组件
        },
        //添加库存
        {
          path: "/home/AddInventory", // 路径
          component: () => import("./views/AddInventory/AddInventory.vue"), //组件
        },
       
      ]
    },

  ]
})